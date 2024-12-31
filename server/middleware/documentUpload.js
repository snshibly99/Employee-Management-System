import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define directories for each document type
const directories = {
    nid: path.resolve(__dirname, "../public/nid"),
    cv: path.resolve(__dirname, "../public/cv"),
    certificate: path.resolve(__dirname, "../public/certificate"),
};

// Create the storage engine
const documentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = directories[file.fieldname]; // Use fieldname to determine folder
        if (folder) {
            cb(null, folder);
        } else {
            cb(new Error("Invalid document field. Allowed fields are nid, cv, and certificate."));
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

// File filter to validate file types
const documentFileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PDF and Word documents are allowed."));
    }
};

// Multer configuration for multiple files
const documentUpload = multer({
    storage: documentStorage,
    fileFilter: documentFileFilter,
});

export default documentUpload;