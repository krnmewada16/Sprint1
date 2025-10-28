import db from "../models/db.js";

// Middleware to check if the request is made by an admin
export const adminAuth = async (req, res, next) => {
  const adminEmail = req.headers["x-admin-email"];
  if (!adminEmail) {
    return res.status(401).json({ message: "Admin credentials missing" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND role = 'admin' LIMIT 1", [adminEmail]);
    if (rows.length === 0) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    req.admin = rows[0]; // store admin info in request
    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
