import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import Certificate from "../models/Certificate.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route for uploading Excel file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (let row of data) {
      await Certificate.create({
        certificateId: row.certificateId,
        studentName: row.studentName,
        internshipDomain: row.internshipDomain,
        startDate: new Date(row.startDate),
        endDate: new Date(row.endDate),
      });
    }

    res.status(200).json({ message: "Data uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading data", error: error.message });
  }
});

// Route for retrieving certificate by ID
router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.id,
    });
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.json(certificate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving certificate", error: error.message });
  }
});

export default router;
