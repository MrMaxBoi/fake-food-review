// backend/routes/s3-test.route.js
import express from "express";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const router = express.Router();
const s3Client = new S3Client({ region: "ap-southeast-5" }); // Jakarta region

// GET /api/s3-test - Test S3 connection
router.get("/", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: "fake-food-detector-images-js-2024",
      MaxKeys: 10
    });
    
    const response = await s3Client.send(command);
    res.json({
      message: "S3 connection successful!",
      bucket: "fake-food-detector-images",
      objects: response.Contents || []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;