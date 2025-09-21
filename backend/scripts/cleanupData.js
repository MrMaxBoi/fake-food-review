// backend/scripts/cleanupData.js
import dotenv from "dotenv";
import { saveRestaurant } from "../utils/dynamo.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

dotenv.config();

const client = new DynamoDBClient({ region: "ap-southeast-5" });
const docClient = DynamoDBDocumentClient.from(client);

const cleanRestaurants = [
  {
    name: "Super Kitchen Chilli Pan Mee Sri Petaling",
    address: "No. 2, Jalan Radin Bagus 7, Bandar Baru Sri Petaling, 57000 Kuala Lumpur",
    reviews: [
      {
        stars: 5,
        text: "Best chilli pan mee in KL! The noodles have perfect texture and the chilli sauce is addictive. Been coming here for 3 years and quality never drops."
      },
      {
        stars: 5,
        text: "This establishment provides exceptional culinary experiences with consistently high-quality ingredients and professional service standards. The menu offerings demonstrate remarkable attention to detail and sophisticated flavor profiles that exceed industry benchmarks."
      },
      {
        stars: 5,
        text: "Authentic taste that reminds me of my childhood. The minced pork and anchovies add great flavor depth."
      }
    ],
    images: [
      "/images/demo-food-1.jpg",
      "/images/demo-food-1.jpg",
      "/images/demo-food-1.jpg"
    ]
  },
  {
    name: "Burger King Sri Petaling",
    address: "Lot G-01, Ground Floor, Endah Parade, Sri Petaling, 57000 Kuala Lumpur",
    reviews: [
      {
        stars: 3,
        text: "Standard BK quality. The Whopper is consistently good but service can be slow during peak hours."
      },
      {
        stars: 4,
        text: "The restaurant maintains excellent operational efficiency with streamlined service protocols and comprehensive menu selections that cater to diverse consumer preferences while ensuring optimal satisfaction metrics."
      },
      {
        stars: 2,
        text: "Fries were cold when served. Burger was okay but nothing special. Expected better from a chain restaurant."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
    ]
  },
  {
    name: "Sushi King Pavilion",
    address: "Pavilion Kuala Lumpur, 168 Jalan Bukit Bintang, 55100 Kuala Lumpur",
    reviews: [
      {
        stars: 4,
        text: "Fresh sushi and good variety. The salmon was particularly good today. Service was quick despite the crowd."
      },
      {
        stars: 5,
        text: "This dining establishment demonstrates exceptional commitment to culinary excellence through meticulously prepared Japanese cuisine featuring premium ingredients sourced through established supply chain partnerships to deliver consistently superior gastronomic experiences."
      },
      {
        stars: 3,
        text: "Decent sushi for the price point. The conveyor belt system is fun but some items sit too long."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500",
      "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=500"
    ]
  }
];

async function cleanupData() {
  console.log("🧹 Cleaning up DynamoDB data...");
  
  // Delete problematic Sushi King entries
  const problematicEntries = [
    { restaurantId: "Sushi King Pavilion", analysisTimestamp: "2025-09-21T07:12:20.105Z" },
    { restaurantId: "Sushi King Pavilion", analysisTimestamp: "2025-09-21T07:12:48.844Z" },
    { restaurantId: "Sushi King Pavilion", analysisTimestamp: "2025-09-21T07:15:50.904Z" }
  ];
  
  for (const entry of problematicEntries) {
    try {
      await docClient.send(new DeleteCommand({
        TableName: "fake-food-detector",
        Key: entry
      }));
      console.log(`🗑️ Deleted: ${entry.restaurantId} - ${entry.analysisTimestamp}`);
    } catch (err) {
      console.log(`❌ Failed to delete: ${entry.restaurantId}`);
    }
  }
  
  // Add clean restaurant data
  for (const restaurant of cleanRestaurants) {
    try {
      const result = await saveRestaurant(restaurant.name, restaurant);
      if (result.ok) {
        console.log(`✅ Updated: ${restaurant.name}`);
      } else {
        console.log(`❌ Failed: ${restaurant.name}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${restaurant.name}`, error.message);
    }
  }
  
  console.log("🎉 Cleanup complete!");
  process.exit(0);
}

cleanupData();