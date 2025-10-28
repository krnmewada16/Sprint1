import db from "../models/db.js";
import bcrypt from "bcryptjs";

// Signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (existing.length) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')",
      [username, email, hashed]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ message: "Invalid email or password" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    res.json({ user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all music
export const getMusic = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM music");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search music
export const searchMusic = async (req, res) => {
  const { query } = req.query;
  try {
    const [rows] = await db.query(
      "SELECT * FROM music WHERE title LIKE ? OR artist LIKE ?",
      [`%${query}%`, `%${query}%`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user profile by id
export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT id, username, email FROM users WHERE id=?", [id]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change user password
export const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    const [rows] = await db.query("SELECT password FROM users WHERE id=?", [userId]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(oldPassword, rows[0].password);
    if (!match) return res.status(400).json({ message: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password=? WHERE id=?", [hashed, userId]);

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
