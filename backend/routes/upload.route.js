// backend/routes/upload.route.js
import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const s3Client = new S3Client({ region: "ap-southeast-5" }); // Jakarta region

// POST /api/upload - Upload image to S3
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const key = `restaurants/${Date.now()}-${req.file.originalname}`;
    
    const command = new PutObjectCommand({
      Bucket: "fake-food-detector-images-js-2024",
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3Client.send(command);
    
    const imageUrl = `https://fake-food-detector-images-js-2024.s3.ap-southeast-5.amazonaws.com/${key}`;
    
    res.json({
      message: "Image uploaded successfully!",
      imageUrl,
      key
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;