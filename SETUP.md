# Fake Food Review AI Detector - Setup Instructions

## Quick Start
```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..
cd lambda/ai-detector && npm install && cd ../..

# Start development
npm run dev
cd frontend && npm run dev
```

## AWS Setup Required
1. **DynamoDB**: Table name `fake-food-detector` with key `restaurantId` + `analysisTimestamp`
2. **S3**: Bucket for image storage (update bucket name in routes)
3. **Lambda**: Deploy `lambda/ai-detector/` for serverless processing

## Environment Variables (.env)
```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=ap-southeast-5
PORT=5050
```

## Demo Endpoints
- `GET /api/restaurant/` - All restaurants
- `GET /api/restaurant/:name` - Restaurant with AI analysis
- `POST /api/upload` - Image upload to S3
- `GET /api/s3-test` - Test S3 connection

## Architecture
- **Frontend**: React + Chakra UI
- **Backend**: Node.js + Express
- **Database**: AWS DynamoDB
- **Storage**: AWS S3
- **Processing**: AWS Lambda (with local fallback)