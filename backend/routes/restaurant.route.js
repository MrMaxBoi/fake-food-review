// backend/routes/restaurant.route.js
import express from "express";
import { getRestaurantWithAnalysis, getAllRestaurants } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getAllRestaurants);
router.get("/:name", getRestaurantWithAnalysis);

export default router;