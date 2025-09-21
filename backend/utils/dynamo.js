// backend/utils/dynamo.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-southeast-5" });
const docClient = DynamoDBDocumentClient.from(client);

export async function listAnalyses() {
  try {
    const result = await docClient.send(new ScanCommand({
      TableName: "fake-food-detector",
    }));
    return result.Items;
  } catch (err) {
    console.error("❌ DynamoDB scan failed:", err);
    return [];
  }
}

export async function saveAnalysis(restaurantId, data) {
  const params = {
    TableName: "fake-food-detector",
    Item: {
      restaurantId: restaurantId,
      createdAt: new Date().toISOString(),
      ...data,
    },
  };

  try {
    const result = await docClient.send(new PutCommand(params));
    console.log("✅ DynamoDB put succeeded:", params.Item);
    return { ok: true, result };
  } catch (err) {
    console.error("❌ DynamoDB put failed:", err);
    return { ok: false, error: err.message };
  }
}

export async function getAnalysis(restaurantId) {
  const params = {
    TableName: "fake-food-detector",
    Key: { 
      restaurantId: restaurantId
    },
  };
  try {
    const res = await docClient.send(new GetCommand(params));
    return res.Item;
  } catch (err) {
    console.error("❌ Error fetching analysis:", err);
    return null;
  }
}

export async function getRestaurant(restaurantName) {
  const params = {
    TableName: "fake-food-detector",
    Key: { 
      restaurantId: restaurantName,
      analysisTimestamp: "latest"
    },
  };
  try {
    const res = await docClient.send(new GetCommand(params));
    return res.Item;
  } catch (err) {
    console.error("❌ Error fetching restaurant:", err);
    return null;
  }
}

export async function saveRestaurant(restaurantName, data) {
  const params = {
    TableName: "fake-food-detector",
    Item: {
      restaurantId: restaurantName,
      analysisTimestamp: "latest",
      ...data,
    },
  };

  try {
    const result = await docClient.send(new PutCommand(params));
    console.log("✅ Restaurant saved:", restaurantName);
    return { ok: true, result };
  } catch (err) {
    console.error("❌ Failed to save restaurant:", err);
    return { ok: false, error: err.message };
  }
}