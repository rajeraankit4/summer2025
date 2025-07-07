import mongoose from "mongoose";
import dotenv from "dotenv";
import Menu from "./models/menu.model.js";

dotenv.config();

const seedMenuData = [
  {
    day: "Monday",
    date: new Date("2025-07-07"),
    meals: [
      {
        type: "breakfast",
        items: ["Paratha", "Tea", "Eggs", "Butter"],
        description: "Traditional breakfast",
        calories: 450,
        price: 45,
      },
      {
        type: "lunch",
        items: ["Rice", "Dal", "Mixed Vegetables", "Raita", "Roti"],
        description: "Complete meal with proteins and carbs",
        calories: 650,
        price: 85,
      },
      {
        type: "dinner",
        items: ["Roti", "Chicken Curry", "Rice", "Salad"],
        description: "Protein-rich dinner",
        calories: 700,
        price: 95,
      },
    ],
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(), // You'll need to replace with actual admin ID
  },
  {
    day: "Tuesday",
    date: new Date("2025-07-08"),
    meals: [
      {
        type: "breakfast",
        items: ["Poha", "Tea", "Banana"],
        description: "Light and healthy breakfast",
        calories: 380,
        price: 40,
      },
      {
        type: "lunch",
        items: ["Rice", "Rajma", "Aloo Gobi", "Yogurt", "Chapati"],
        description: "North Indian style lunch",
        calories: 620,
        price: 80,
      },
      {
        type: "dinner",
        items: ["Chapati", "Paneer Masala", "Rice", "Dal", "Pickle"],
        description: "Vegetarian dinner special",
        calories: 680,
        price: 90,
      },
    ],
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    day: "Wednesday",
    date: new Date("2025-07-09"),
    meals: [
      {
        type: "breakfast",
        items: ["Upma", "Coffee", "Coconut Chutney"],
        description: "South Indian breakfast",
        calories: 400,
        price: 42,
      },
      {
        type: "lunch",
        items: ["Rice", "Sambar", "Vegetable Curry", "Papad", "Curd"],
        description: "South Indian thali",
        calories: 580,
        price: 75,
      },
      {
        type: "dinner",
        items: ["Roti", "Fish Curry", "Rice", "Green Vegetables"],
        description: "Coastal style dinner",
        calories: 720,
        price: 100,
      },
    ],
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    day: "Thursday",
    date: new Date("2025-07-10"),
    meals: [
      {
        type: "breakfast",
        items: ["Aloo Paratha", "Curd", "Tea", "Pickle"],
        description: "Punjabi style breakfast",
        calories: 480,
        price: 48,
      },
      {
        type: "lunch",
        items: ["Rice", "Chana Dal", "Bhindi", "Roti", "Buttermilk"],
        description: "Traditional Indian lunch",
        calories: 640,
        price: 82,
      },
      {
        type: "dinner",
        items: ["Chapati", "Mutton Curry", "Rice", "Onion Salad"],
        description: "Non-vegetarian special",
        calories: 750,
        price: 110,
      },
    ],
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    day: "Friday",
    date: new Date("2025-07-11"),
    meals: [
      {
        type: "breakfast",
        items: ["Dosa", "Sambar", "Coconut Chutney", "Coffee"],
        description: "Crispy dosa breakfast",
        calories: 420,
        price: 45,
      },
      {
        type: "lunch",
        items: ["Pulao", "Raita", "Papad", "Pickle", "Sweet"],
        description: "Special Friday lunch",
        calories: 600,
        price: 88,
      },
      {
        type: "dinner",
        items: ["Roti", "Dal Makhani", "Jeera Rice", "Mixed Vegetables"],
        description: "Rich and creamy dinner",
        calories: 690,
        price: 92,
      },
    ],
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    day: "Saturday",
    date: new Date("2025-07-12"),
    meals: [
      {
        type: "breakfast",
        items: ["Chole Bhature", "Tea", "Onion"],
        description: "Weekend special breakfast",
        calories: 550,
        price: 55,
      },
      {
        type: "lunch",
        items: ["Rice", "Chicken Curry", "Roti", "Salad", "Raita"],
        description: "Saturday special lunch",
        calories: 720,
        price: 95,
      },
      {
        type: "dinner",
        items: ["Chapati", "Paneer Butter Masala", "Rice", "Dal"],
        description: "Weekend dinner treat",
        calories: 700,
        price: 98,
      },
    ],
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(),
  },
  {
    day: "Sunday",
    date: new Date("2025-07-13"),
    meals: [
      {
        type: "breakfast",
        items: ["Puri Sabzi", "Tea", "Halwa"],
        description: "Sunday special breakfast",
        calories: 520,
        price: 52,
      },
      {
        type: "lunch",
        items: ["Special Thali", "Rice", "Dal", "Vegetables", "Sweet", "Papad"],
        description: "Complete Sunday thali",
        calories: 800,
        price: 120,
      },
      {
        type: "dinner",
        items: ["Roti", "Mixed Vegetable", "Rice", "Curd", "Pickle"],
        description: "Light Sunday dinner",
        calories: 580,
        price: 75,
      },
    ],
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(),
  },
];

async function seedMenu() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing menu data
    await Menu.deleteMany({});
    console.log("Cleared existing menu data");

    // Insert seed data
    const insertedMenus = await Menu.insertMany(seedMenuData);
    console.log(`Inserted ${insertedMenus.length} menu items`);

    console.log("Menu seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding menu data:", error);
    process.exit(1);
  }
}

seedMenu();
