// backend/services/analysisService.js

// temporary simple detector (replace with your full one later)
export function fakeReviewAnalyzer(restaurantId, reviews) {
  const processedReviews = reviews.map(r => ({
    ...r,
    isAI: r.text.includes("% off") || r.text.includes("CALL") || r.text.length > 200,
    aiScore: r.text.length > 200 ? 75 : 25
  }));
  
  const aiCount = processedReviews.filter(r => r.isAI).length;
  const aiContentIndex = Math.round((aiCount / reviews.length) * 100);
  
  return {
    restaurantId,
    analyzedAt: new Date().toISOString(),
    fakeScore: aiContentIndex,
    verdict: aiContentIndex > 50 ? "This text is mainly written by an AI" : "Generally authentic",
    reviews: processedReviews,
    images: [
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      "https://www.shutterstock.com/image-photo/hyderabadi-chicken-biryani-aromatic-flavorful-600nw-2497040151.jpg",
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
    ],
    aiContentIndex,
    signalsSummary: {
      promoCount: aiCount,
      dupClusters: 0,
      burstWindows: 0,
      ratingAnomaly: false,
    },
    version: "v0.1-hack"
  };
}