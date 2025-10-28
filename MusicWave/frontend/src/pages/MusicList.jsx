import React, { useEffect, useState } from "react";
import axios from "axios";
import MusicPlayer from "../components/MusicPlayer";
import "../styles.css";

const MusicList = ({ user }) => {
  const [musicList, setMusicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlayingId, setCurrentPlayingId] = useState(null);

  // 🎵 Playlist states
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  // Fetch all music
  const fetchMusic = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/music");
      setMusicList(res.data);
    } catch (err) {
      console.error("Error fetching music:", err);
    }
  };

  // Fetch user playlists
  const fetchPlaylists = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/playlist/${user.id}`);
      setPlaylists(res.data);
    } catch (err) {
      console.error("Error fetching playlists:", err);
    }
  };

  // Add song to selected playlist
  const handleAddToPlaylist = async (musicId) => {
    if (!selectedPlaylist) return alert("Select a playlist first");
    try {
      await axios.post("http://localhost:5000/api/playlist/add-song", {
        playlistId: selectedPlaylist,
        musicId,
      });
      alert("🎶 Song added to playlist!");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding song");
    }
  };

  // Search songs
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchMusic();
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/music/search?query=${encodeURIComponent(searchQuery)}`
      );
      setMusicList(res.data);
    } catch (err) {
      console.error("Error searching music:", err);
    }
  };

  useEffect(() => {
    fetchMusic();
    fetchPlaylists();
  }, [user]);

  const handlePlay = (id) => {
    setCurrentPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="music-list">
      <h2 style={{ color: "#ff6f61", marginBottom: "20px" }}>Music Collection</h2>

      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search music by title or artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* 🎧 Select Playlist (existing playlists only) */}
      {user && playlists.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#ff6f61", marginRight: "10px" }}>Add to Playlist:</label>
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            <option value="">-- Select Playlist --</option>
            {playlists.map((pl) => (
              <option key={pl.id} value={pl.id}>{pl.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* 🎵 Music Cards */}
      {musicList.length === 0 ? (
        <p style={{ color: "#bbb", textAlign: "center", marginTop: "20px" }}>No music found</p>
      ) : (
        musicList.map((music) => (
          <div key={music.id} className="music-card">
            <h3>{music.title}</h3>
            <p>{music.artist}</p>
            <MusicPlayer
              music={music}
              isPlaying={currentPlayingId === music.id}
              onPlay={() => handlePlay(music.id)}
            />

            {/* ➕ Add to existing Playlist button */}
            {user && playlists.length > 0 && (
              <button
                style={{ marginTop: "10px" }}
                onClick={() => handleAddToPlaylist(music.id)}
              >
                Add to Playlist
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MusicList;
