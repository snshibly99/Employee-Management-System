// controllers/documentController.js
import Document from '../models/Document.js';

const uploadDocuments = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error('Please upload files.');
    }

    const uploadedFiles = req.files;

    const savedFiles = [];

    for (const key in uploadedFiles) {
      const files = uploadedFiles[key];
      for (const file of files) {
        const newDocument = new Document({
          fieldname: file.fieldname,
          originalname: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          destination: file.destination,
          filename: file.filename,
          path: file.path,
          size: file.size,
        });
        const savedDocument = await newDocument.save();
        savedFiles.push(savedDocument);
      }
    }

    res.status(200).json({
      message: 'Files uploaded and saved successfully!',
      files: savedFiles,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getFile = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch the document by ID
      const document = await Document.findById(id);
      if (!document) {
        return res.status(404).json({ success: false, message: "File not found" });
      }
  
      // Return only the file path
      return res.status(200).json({ success: true, path: document.path });
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  
export { uploadDocuments, getFile };