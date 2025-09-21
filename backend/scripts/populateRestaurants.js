// backend/scripts/populateRestaurants.js
import dotenv from "dotenv";
import { saveRestaurant } from "../utils/dynamo.js";

dotenv.config();

const restaurants = [
  {
    name: "Super Kitchen Chilli Pan Mee Sri Petaling",
    address: "No. 2, Jalan Radin Bagus 7, Bandar Baru Sri Petaling, 57000 Kuala Lumpur",
    reviews: [
      {
        stars: 5,
        text: "Best chilli pan mee in KL! The noodles have perfect texture and the chilli sauce is addictive. Been coming here for 3 years and quality never drops."
      },
      {
        stars: 4,
        text: "Good portion size and reasonable price. The soup version is also excellent. Can get crowded during lunch hours."
      },
      {
        stars: 5,
        text: "Authentic taste that reminds me of my childhood. The minced pork and anchovies add great flavor depth."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500",
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500"
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
        text: "Clean outlet with friendly staff. The chicken royale is my go-to. Good value for money with their promotions."
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
    name: "Burgerstack",
    address: "Various locations in Kuala Lumpur",
    reviews: [
      {
        stars: 5,
        text: "Amazing gourmet burgers! The beef patty is juicy and cooked to perfection. Love their truffle fries too."
      },
      {
        stars: 4,
        text: "Great atmosphere and quality ingredients. A bit pricey but worth it for special occasions."
      },
      {
        stars: 5,
        text: "Best burger joint in KL hands down. The mushroom swiss burger is incredible. Staff is super friendly."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500"
    ]
  },
  {
    name: "McDonald's Bukit Jalil",
    address: "Axiata Arena, Bukit Jalil National Sports Complex, 57000 Kuala Lumpur",
    reviews: [
      {
        stars: 3,
        text: "Typical McDonald's experience. Fast service and consistent taste. The self-service kiosks are convenient."
      },
      {
        stars: 4,
        text: "Good location near the stadium. Gets very busy during events but staff handle the crowd well."
      },
      {
        stars: 2,
        text: "Order was wrong twice. Fries were soggy. Not the best McDonald's outlet I've been to."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
    ]
  },
  {
    name: "Burger Guy Petaling Jaya",
    address: "SS2, Petaling Jaya, Selangor",
    reviews: [
      {
        stars: 4,
        text: "Solid local burger joint. Good value and generous portions. The chicken burger is surprisingly good."
      },
      {
        stars: 3,
        text: "Decent burgers at affordable prices. Nothing fancy but gets the job done when you're craving a burger."
      },
      {
        stars: 4,
        text: "Local gem! Been around for years and still maintains quality. Their special sauce is what makes it unique."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500"
    ]
  }
];

async function populateRestaurants() {
  console.log("🚀 Starting restaurant population...");
  
  for (const restaurant of restaurants) {
    try {
      const result = await saveRestaurant(restaurant.name, restaurant);
      if (result.ok) {
        console.log(`✅ Added: ${restaurant.name}`);
      } else {
        console.log(`❌ Failed: ${restaurant.name} - ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ Error adding ${restaurant.name}:`, error.message);
    }
  }
  
  console.log("🎉 Restaurant population complete!");
  process.exit(0);
}

populateRestaurants();