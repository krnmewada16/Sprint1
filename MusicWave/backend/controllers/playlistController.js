import {
  createPlaylist,
  getUserPlaylists,
  addSongToPlaylist,
  getPlaylistSongs,
  removeSongFromPlaylist,
} from "../models/playlistModel.js";

// Create new playlistA
export const createUserPlaylist = async (req, res) => {
  try {
    const { userId, name } = req.body;
    await createPlaylist(userId, name);
    res.json({ message: "Playlist created successfully" });
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ message: "Error creating playlist", error: err });
  }
};

// Get all playlists for a user
export const getPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await getUserPlaylists(userId);
    res.json(playlists);
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res.status(500).json({ message: "Error fetching playlists" });
  }
};

// Add song to playlist
export const addSong = async (req, res) => {
  try {
    const { playlistId, musicId } = req.body;
    await addSongToPlaylist(playlistId, musicId);
    res.json({ message: "Song added to playlist" });
  } catch (err) {
    console.error("Error adding song:", err);
    res.status(500).json({ message: "Error adding song", error: err });
  }
};

// Get songs in a playlist
export const getSongs = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const songs = await getPlaylistSongs(playlistId);
    res.json(songs);
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ message: "Error fetching songs" });
  }
};

// Remove song from playlist
export const removeSong = async (req, res) => {
  try {
    const { playlistId, musicId } = req.body;
    await removeSongFromPlaylist(playlistId, musicId);
    res.json({ message: "Song removed from playlist" });
  } catch (err) {
    console.error("Error removing song:", err);
    res.status(500).json({ message: "Error removing song", error: err });
  }
};
