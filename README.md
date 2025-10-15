# 🍔 Fake Food Review AI Detector

> **AWS-powered solution to combat the $152B fake review crisis**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![AWS](https://img.shields.io/badge/AWS-DynamoDB%20%7C%20S3%20%7C%20Lambda-orange.svg)](https://aws.amazon.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Problem Statement

**40% of online restaurant reviews are fake, manipulated, or AI-generated**, costing consumers billions in poor dining decisions and undermining legitimate businesses. Traditional detection methods can't keep up with sophisticated AI-generated content.

## 🚀 Solution

An intelligent AI detection system that analyzes restaurant reviews in real-time to identify fake or AI-generated content using advanced pattern recognition and linguistic analysis.

## ✨ Features

- **🔍 Real-time Analysis** - Instant AI detection with confidence scoring
- **🎨 Visual Indicators** - Color-coded reviews (Green = Authentic, Red = Suspicious)
- **📊 AI Content Index** - Percentage-based fake content measurement
- **🏪 Restaurant Search** - Comprehensive analysis dashboard
- **☁️ Cloud-Native** - Scalable AWS architecture
- **📱 Responsive Design** - Works on desktop and mobile

## 🏗️ Architecture

```
Frontend (React) → API Gateway → Lambda Functions → DynamoDB
                                      ↓
                               S3 (Image Storage)
```

### Tech Stack

**Frontend:**
- React 18 + Chakra UI
- React Router for navigation
- Vite for fast development

**Backend:**
- Node.js + Express.js
- AWS SDK v3 integration
- RESTful API design

**AWS Services:**
- **DynamoDB** - NoSQL database for restaurant data
- **S3** - Object storage for restaurant images
- **Lambda** - Serverless AI processing
- **IAM** - Security and access management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- AWS Account with configured credentials
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MrMaxBoi/fake-food-review.git
cd fake-food-review
```

2. **Install dependencies**
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd frontend && npm install && cd ..
```

3. **Environment Setup**
Create `.env` file in root directory:
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-southeast-5
PORT=5050
```

4. **AWS Setup**
- Create DynamoDB table: `fake-food-detector`
- Primary key: `restaurantId` (String)
- Sort key: `analysisTimestamp` (String)
- Create S3 bucket for image storage

5. **Start the application**
```bash
# Start backend (Terminal 1)
npm run dev

# Start frontend (Terminal 2)
cd frontend && npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5050

## 📖 Usage

### Demo Flow
1. **Landing Page** - View real vs fake food comparison
2. **Search Restaurant** - Enter restaurant name
3. **AI Analysis** - View color-coded review analysis
4. **Results Dashboard** - See AI confidence scores and verdict

### API Endpoints

```bash
# Get all restaurants
GET /api/restaurant/

# Get specific restaurant with AI analysis
GET /api/restaurant/:name

# Upload restaurant image
POST /api/upload

# Test S3 connection
GET /api/s3-test
```

## 🤖 AI Detection Features

Our AI analyzes multiple factors to detect fake reviews:

- **Language Patterns** - Formal vs casual tone detection
- **Text Length** - Unusually long or short reviews
- **Repetitive Content** - Similar phrasing across reviews
- **Corporate Language** - Marketing-speak indicators
- **Sentiment Analysis** - Unnatural positivity/negativity

## 📊 Sample Results

```json
{
  "restaurantId": "Super Kitchen Chilli Pan Mee",
  "aiContentIndex": 42,
  "verdict": "Mixed/watchlist",
  "reviews": [
    {
      "text": "Great food, loved it!",
      "isAI": false,
      "aiScore": 15
    },
    {
      "text": "This establishment provides exceptional culinary experiences...",
      "isAI": true,
      "aiScore": 85
    }
  ]
}
```

## 🔧 Development

### Project Structure
```
fake-food-review/
├── backend/
│   ├── controllers/     # API route handlers
│   ├── routes/         # Express routes
│   ├── services/       # Business logic
│   ├── utils/          # AWS utilities
│   └── scripts/        # Database scripts
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   └── pages/      # Page components
│   └── public/         # Static assets
└── lambda/             # AWS Lambda functions
```

### Available Scripts

```bash
# Backend
npm run dev          # Start development server
npm run populate     # Populate database with sample data
npm run cleanup      # Clean database

# Frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🌟 Future Roadmap

### Enhanced AI/ML
- **Amazon SageMaker** integration for custom model training
- **Amazon Bedrock** for advanced language processing
- **Amazon Comprehend** for sentiment analysis
- **Ensemble learning** with multiple detection algorithms

### Scalability Features
- **API Gateway** for rate limiting and caching
- **CloudFront** CDN for global image delivery
- **ElastiCache** for high-performance caching
- **Auto Scaling Groups** for traffic management

### Enterprise Features
- **Multi-region deployment**
- **Real-time analytics dashboard**
- **White-label solution** for platforms
- **API monetization** capabilities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Achievement

**Built for AWS Hackathon 2024**
- ✅ Real AWS integration (DynamoDB, S3, Lambda)
- ✅ Production-ready architecture
- ✅ Solves real-world $152B problem
- ✅ Scalable cloud-native solution

## 📞 Contact

**Project Maintainer:** [Your Name]
- GitHub: [@MrMaxBoi](https://github.com/MrMaxBoi)
- Project Link: [https://github.com/MrMaxBoi/fake-food-review](https://github.com/MrMaxBoi/fake-food-review)

---

⭐ **Star this repository if it helped you detect fake reviews!**