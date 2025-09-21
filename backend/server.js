// backend/server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import analysisRoutes from "./routes/analysis.route.js";
import restaurantRoutes from "./routes/restaurant.route.js";
import s3TestRoutes from "./routes/s3-test.route.js";
import uploadRoutes from "./routes/upload.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analysis", analysisRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/s3-test", s3TestRoutes);
app.use("/api/upload", uploadRoutes);

// Static assets (for production build of frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Using DynamoDB for data storage`);
});