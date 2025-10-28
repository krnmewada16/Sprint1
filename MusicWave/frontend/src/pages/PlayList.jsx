import React, { useState, useEffect } from "react";
import axios from "axios";
import MusicPlayer from "../components/MusicPlayer";
import "../styles.css";

const Playlist = ({ user }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    if (user?.id) fetchPlaylists();
  }, [user]);

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/playlist/${user.id}`);
      setPlaylists(res.data);
    } catch (err) {
      console.error("Error fetching playlists:", err);
    }
  };

  const fetchPlaylistSongs = async (playlistId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/playlist/songs/${playlistId}`);
      setPlaylistSongs(res.data);
    } catch (err) {
      console.error("Error fetching playlist songs:", err);
    }
  };

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylist(playlistId);
    fetchPlaylistSongs(playlistId);
  };

  const handleRemoveSong = async (musicId) => {
    try {
      await axios.post("http://localhost:5000/api/playlist/remove-song", {
        playlistId: selectedPlaylist,
        musicId,
      });
      alert("Song removed from playlist!");
      fetchPlaylistSongs(selectedPlaylist);
    } catch (err) {
      console.error("Error removing song:", err);
      alert("Error removing song");
    }
  };

  if (!user) return <div className="form-container">Please login to view your playlists</div>;

  return (
    <div className="music-list">
      <h2 className="gradient-text" style={{ marginBottom: "20px" }}>Your Playlists</h2>

      {playlists.length === 0 ? (
        <p>No playlists found. Create one from the Music List page.</p>
      ) : (
        <div className="playlist-manager">
          <select
            value={selectedPlaylist}
            onChange={(e) => handleSelectPlaylist(e.target.value)}
          >
            <option value="">-- Select Playlist --</option>
            {playlists.map((pl) => (
              <option key={pl.id} value={pl.id}>
                {pl.name}
              </option>
            ))}
          </select>

          {playlistSongs.length > 0 ? (
            <div style={{ marginTop: "15px" }}>
              {playlistSongs.map((song) => (
                <div key={song.id} className="music-card">
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                  <MusicPlayer music={song} />
                  <button
                    style={{ marginTop: "8px" }}
                    onClick={() => handleRemoveSong(song.id)}
                  >
                    Remove from Playlist
                  </button>
                </div>
              ))}
            </div>
          ) : selectedPlaylist ? (
            <p style={{ marginTop: "10px" }}>No songs in this playlist.</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Playlist;
