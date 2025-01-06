import express from "express";
import authMiddleware from '../middleware/authMiddlware.js'
import {
  getPerformance,
  createPerformance,
  deletePerformance
} from "../controllers/performanceController.js";


const router = express.Router();

router.get("/", authMiddleware , getPerformance);

router.post("/", authMiddleware , createPerformance);

router.delete("/:id", authMiddleware , deletePerformance);



export default router;
