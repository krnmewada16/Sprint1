import db from "./db.js"; // Import the MySQL connection pool from db.js

// Function to create a new user
export const createUser = async (username, email, password, role = "user") => {
  try {
    // SQL query to insert a new user into the users table
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, password, role] // Parameters prevent SQL injection
    );
    return result; // Returns the result object with insertId, etc.
  } catch (error) {
    throw error; // Throws error to be handled in controller
  }
};

// Function to find a user by email
export const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0]; // Returns first user if found, undefined if not
  } catch (error) {
    throw error;
  }
};

// Function to get all users (for admin view)
export const getAllUsers = async () => {
  try {
    const [rows] = await db.execute("SELECT id, username, email, role, created_at FROM users");
    return rows; // Returns array of all users
  } catch (error) {
    throw error;
  }
};


