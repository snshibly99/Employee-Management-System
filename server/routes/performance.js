import express from "express";
import authMiddleware from '../middleware/authMiddlware.js'
import {
  getPerformances,
  createPerformance,
  deletePerformance,
} from "../controllers/performanceController.js";


const router = express.Router();


router.get("/", authMiddleware , getPerformances);

router.post("/", authMiddleware , createPerformance);

router.delete("/:id", authMiddleware , deletePerformance);

export default router;
