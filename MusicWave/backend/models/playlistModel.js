import db from "../models/db.js";

// Create new playlist
export const createPlaylist = async (userId, name) => {
  try {
    await db.query("INSERT INTO playlists (user_id, name) VALUES (?, ?)", [userId, name]);
  } catch (err) {
    console.error("Error creating playlist:", err);
    throw err;
  }
};

// Get all playlists for a user
export const getUserPlaylists = async (userId) => {
  try {
    const [rows] = await db.query("SELECT * FROM playlists WHERE user_id = ?", [userId]);
    return rows;
  } catch (err) {
    console.error("Error fetching playlists:", err);
    throw err;
  }
};

// Add song to playlist
export const addSongToPlaylist = async (playlistId, musicId) => {
  try {
    await db.query(
      "INSERT INTO playlist_songs (playlist_id, music_id) VALUES (?, ?)",
      [playlistId, musicId]
    );
  } catch (err) {
    console.error("Error adding song to playlist:", err);
    throw err;
  }
};

// Remove song from playlist
export const removeSongFromPlaylist = async (playlistId, musicId) => {
  try {
    await db.query(
      "DELETE FROM playlist_songs WHERE playlist_id = ? AND music_id = ?",
      [playlistId, musicId]
    );
  } catch (err) {
    console.error("Error removing song from playlist:", err);
    throw err;
  }
};

// Get songs in playlist
export const getPlaylistSongs = async (playlistId) => {
  try {
    const [rows] = await db.query(
      `SELECT m.id, m.title, m.artist, m.file_path 
       FROM playlist_songs ps 
       JOIN music m ON ps.music_id = m.id 
       WHERE ps.playlist_id = ?`,
      [playlistId]
    );
    return rows;
  } catch (err) {
    console.error("Error fetching playlist songs:", err);
    throw err;
  }
};
