// backend/controllers/analysis.controller.js
import { fakeReviewAnalyzer } from "../services/analysisService.js"; 
import { saveAnalysis, getAnalysis as getDynamoAnalysis } from "../utils/dynamo.js";

// POST /api/analysis/:restaurantId
export const runAnalysis = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = req.body.reviews || [];

    const result = fakeReviewAnalyzer(restaurantId, reviews);
    const saved = await saveAnalysis(restaurantId, result);

    if (!saved.ok) {
      return res.status(500).json({ error: "Failed to save analysis" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error running analysis:", err);
    res.status(500).json({ error: "Failed to analyze reviews" });
  }
};

// GET /api/analysis/:restaurantId
export const getAnalysis = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const analysis = await getDynamoAnalysis(restaurantId);

    if (!analysis) {
      return res.status(404).json({ error: "No analysis found" });
    }

    res.json(analysis);
  } catch (err) {
    console.error("❌ Error fetching analysis:", err);
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
};