// lambda/ai-detector/index.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const { restaurantId, reviews } = JSON.parse(event.body || event);
    
    // Enhanced AI detection logic
    const processedReviews = reviews.map(review => {
      const text = review.text;
      let aiScore = 0;
      let reasons = [];
      
      // Check for AI patterns
      if (text.length > 200) {
        aiScore += 30;
        reasons.push("Unusually long review");
      }
      
      if (text.includes("establishment") || text.includes("exceptional") || text.includes("consistently")) {
        aiScore += 25;
        reasons.push("Formal language patterns");
      }
      
      if (text.split(" ").length > 50) {
        aiScore += 20;
        reasons.push("High word count");
      }
      
      // Check for repetitive patterns
      const words = text.toLowerCase().split(" ");
      const uniqueWords = new Set(words);
      if (words.length / uniqueWords.size > 1.5) {
        aiScore += 15;
        reasons.push("Repetitive language");
      }
      
      return {
        ...review,
        isAI: aiScore > 40,
        aiScore: Math.min(aiScore, 95),
        reasons
      };
    });
    
    const aiCount = processedReviews.filter(r => r.isAI).length;
    const aiContentIndex = Math.round((aiCount / reviews.length) * 100);
    
    const result = {
      restaurantId,
      analyzedAt: new Date().toISOString(),
      fakeScore: aiContentIndex,
      verdict: aiContentIndex > 50 ? "High AI content detected" : "Mostly authentic reviews",
      reviews: processedReviews,
      aiContentIndex,
      processedBy: "AWS Lambda",
      version: "v1.0-lambda"
    };
    
    // Save to DynamoDB
    await docClient.send(new PutCommand({
      TableName: "fake-food-detector",
      Item: {
        restaurantId,
        analysisTimestamp: new Date().toISOString(),
        ...result
      }
    }));
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result)
    };
    
  } catch (error) {
    console.error("Lambda error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Analysis failed" })
    };
  }
};