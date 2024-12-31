// routes/document.js
import express from "express";
import documentUpload from "../middleware/documentUpload.js";
import { uploadDocuments, getFile} from "../controllers/documentController.js";
import verifyUser from "../middleware/authMiddlware.js";

const router = express.Router();

// Route for uploading multiple documents in a single request
router.post(
  "/upload",
  documentUpload.fields([
    { name: "nid", maxCount: 1 }, // Field for NID
    { name: "cv", maxCount: 1 }, // Field for CV
    { name: "certificate", maxCount: 1 }, // Field for Certificate
  ]),
  uploadDocuments
);

// Route for retrieving all uploaded documents (admin only)
router.get("/view/:id",  getFile);


export default router
