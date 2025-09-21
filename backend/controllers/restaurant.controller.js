// backend/controllers/restaurant.controller.js
import { getRestaurant, saveRestaurant, listAnalyses } from "../utils/dynamo.js";
import { invokeLambdaAnalysis } from "../utils/lambda.js";
import { fakeReviewAnalyzer } from "../services/analysisService.js";

// GET /api/restaurant - Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await listAnalyses();
    res.json(restaurants);
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// GET /api/restaurant/:name - Get restaurant data and run analysis
export const getRestaurantWithAnalysis = async (req, res) => {
  try {
    const { name } = req.params;
    
    let restaurant = await getRestaurant(name);
    
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    
    // Run AI analysis via Lambda (fallback to local if Lambda fails)
    let analysis;
    try {
      analysis = await invokeLambdaAnalysis(name, restaurant.reviews);
      console.log("✅ Used Lambda for AI analysis");
    } catch (error) {
      console.log("⚠️ Lambda failed, using local analysis:", error.message);
      analysis = fakeReviewAnalyzer(name, restaurant.reviews);
    }
    
    // Combine restaurant data with analysis
    const result = {
      ...restaurant,
      ...analysis
    };
    
    res.json(result);
  } catch (err) {
    console.error("Error fetching restaurant:", err);
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
};