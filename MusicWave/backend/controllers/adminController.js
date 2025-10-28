import db from "../models/db.js";
import bcrypt from "bcryptjs";

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email=? AND role='admin'", [email]);
    if (!rows.length) return res.status(400).json({ message: "Invalid email or password" });

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    res.json({ admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all registered users (excluding admins)
export const getUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, username, email FROM users WHERE role='user'");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user by id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id=?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload new music
export const uploadMusic = async (req, res) => {
  const { title, artist, uploadedBy } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const filePath = `backend/uploads/${file.filename}`;
    await db.query("INSERT INTO music (title, artist, file_path, uploadedBy) VALUES (?, ?, ?, ?)", [
      title,
      artist,
      filePath,
      uploadedBy,
    ]);
    res.json({ message: "Music uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete music by id
export const deleteMusic = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM music WHERE id=?", [id]);
    res.json({ message: "Music deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
