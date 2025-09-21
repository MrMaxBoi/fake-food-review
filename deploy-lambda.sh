#!/bin/bash

# Deploy Lambda function
echo "📦 Packaging Lambda function..."

cd lambda/ai-detector
npm install
zip -r ../../lambda-deployment.zip .
cd ../..

echo "🚀 Deploying to AWS Lambda..."

# Create/Update Lambda function
aws lambda create-function \
  --function-name fake-food-ai-detector \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://lambda-deployment.zip \
  --timeout 30 \
  --memory-size 256 \
  --region $AWS_REGION || \
aws lambda update-function-code \
  --function-name fake-food-ai-detector \
  --zip-file fileb://lambda-deployment.zip \
  --region $AWS_REGION

echo "✅ Lambda deployed successfully!"

# Create S3 bucket
echo "🪣 Creating S3 bucket..."
aws s3 mb s3://fake-food-detector-images --region $AWS_REGION || echo "Bucket already exists"

echo "🎉 Deployment complete!"