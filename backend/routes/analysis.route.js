// backend/routes/analysis.route.js
import express from "express";
import { saveAnalysis, getAnalysis, listAnalyses } from "../utils/dynamo.js"; // <-- add listAnalyses

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const items = await listAnalyses();
    res.json(items);
  } catch (err) {
    console.error("❌ Error listing analyses:", err);
    res.status(500).json({ error: "Failed to list analyses" });
  }
});

router.post("/", async (req, res) => {
  const { restaurant } = req.body;
  try {
    await saveAnalysis(restaurant, { fakeScore: 42, verdict: "Mixed/watchlist" });
    res.json({ message: "Saved analysis!", restaurant });
  } catch (err) {
    console.error("❌ Error saving analysis:", err);
    res.status(500).json({ error: "Failed to save analysis" });
  }
});

router.get("/:restaurantId", async (req, res) => {
  try {
    const item = await getAnalysis(req.params.restaurantId);
    res.json(item || { message: "Not found" });
  } catch (err) {
    console.error("❌ Error fetching analysis:", err);
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
});

export default router;