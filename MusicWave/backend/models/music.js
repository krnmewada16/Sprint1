import db from "./db.js"; // Import the MySQL connection pool

// Function to add a new music entry
export const addMusic = async (id,title, artist, filePath, uploadedBy) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO music (id,title, artist, file_path, uploaded_by) VALUES (?, ?, ?, ?, ?)",
      [id,title, artist, filePath, uploadedBy] // Parameters prevent SQL injection
    );
    return result; // Returns result with insertId, affectedRows, etc.
  } catch (error) {
    throw error; // Propagate error to controller
  }
};

// Function to get all music entries
export const getAllMusic = async () => {
  try {
  const [rows] = await db.execute(
    `SELECT 
       m.id, 
       m.title, 
       m.artist, 
       m.file_path, 
       u.username AS uploaded_by, 
       m.created_at
     FROM music m
     JOIN users u ON m.uploaded_by = u.id
     ORDER BY m.created_at DESC`
  );
  return rows;
}catch (error) {
    throw error; // Propagate error to controller
  }
};  

// Function to search music by title or artist
export const searchMusic = async (query) => {
  try {
    const likeQuery = `%${query}%`; // SQL LIKE pattern
    const [rows] = await db.execute(
      "SELECT m.id, m.title, m.artist, m.file_path, u.username AS m.created_at " +
      "FROM music m " +
      "JOIN users u ON m.uploaded_by = u.id " +
      "WHERE m.title LIKE ? OR m.artist LIKE ? " +
      "ORDER BY m.created_at DESC",
      [likeQuery, likeQuery]
    );
    return rows; // Returns array of matching music
  } catch (error) {
    throw error;
  }
};

// Function to get a single music by ID
export const getMusicById = async (id) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM music WHERE id = ?",
      [id]
    );
    return rows[0]; // Returns single music object or undefined
  } catch (error) {
    throw error;
  }
};

// Function to delete a music entry by ID
export const deleteMusic = async (id) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM music WHERE id = ?",
      [id]
    );
    return result; // Returns result with affectedRows
  } catch (error) {
    throw error;
  }
};
