// backend/utils/lambda.js
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({ region: process.env.AWS_REGION });

export async function invokeLambdaAnalysis(restaurantId, reviews) {
  const payload = {
    restaurantId,
    reviews
  };

  const command = new InvokeCommand({
    FunctionName: "fake-food-ai-detector",
    Payload: JSON.stringify(payload),
  });

  try {
    const response = await lambdaClient.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.Payload));
    return JSON.parse(result.body);
  } catch (error) {
    console.error("Lambda invocation failed:", error);
    throw error;
  }
}