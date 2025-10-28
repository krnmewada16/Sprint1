import express from "express";
import {
  createUserPlaylist,
  getPlaylists,
  addSong,
  getSongs,
  removeSong,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/create", createUserPlaylist);
router.get("/:userId", getPlaylists);
router.post("/add-song", addSong);
router.post("/remove-song", removeSong);
router.get("/songs/:playlistId", getSongs);

export default router;
