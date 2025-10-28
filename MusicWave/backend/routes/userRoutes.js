
import express from "express";
import {
  signup,
  login,
  getMusic,
  searchMusic,
  getUserProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/music", getMusic);
router.get("/music/search", searchMusic);

// Profile & password
router.get("/profile/:id", getUserProfile);
router.put("/change-password", changePassword);

export default router;
