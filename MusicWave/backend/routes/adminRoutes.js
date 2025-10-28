
import express from "express";
import multer from "multer";
import {
  adminLogin,
  getUsers,
  deleteUser,
  uploadMusic,
  deleteMusic,
} from "../controllers/adminController.js";

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/login", adminLogin);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

router.post("/music", upload.single("file"), uploadMusic);
router.delete("/music/:id", deleteMusic);

export default router;
