import express from "express";
import authMiddleware from '../middleware/authMiddlware.js'
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";


const router = express.Router();

// Get all announcements
router.get("/", authMiddleware , getAnnouncements);

// Create a new announcement
router.post("/", authMiddleware , createAnnouncement);

// Delete an announcement by ID
router.delete("/:id", authMiddleware , deleteAnnouncement);

export default router;
