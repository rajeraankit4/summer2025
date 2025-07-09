import mongoose from "mongoose";
import personaldetailModel from "./models/personaldetail.model.js";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Create admin user
async function createAdminUser() {
  try {
    console.log("👤 Creating admin user...");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@mess.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("pass", 10);

    // Create admin user
    const adminUser = new User({
      email: "admin@mess.com",
      password: hashedPassword,
      role: "superadmin",
      isVerified: true,
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@mess.com");
    console.log("🔑 Password: pass");
    console.log("👑 Role: superadmin");
  } catch (error) {
    console.error("❌ Failed to create admin user:", error);
    console.error("Error details:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed");
  }
}

// Test database connection and operations
async function testDatabase() {
  try {
    console.log("🔄 Testing database connection...");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // Test inserting a document
    console.log("🔄 Testing document insertion...");

    const testStudent = new personaldetailModel({
      firstname: "Test",
      lastname: "Student",
      phone: "1234567890",
      email: "test@example.com",
      DOB: "2000-01-01",
      address: "123 Test Street",
      city: "Test City",
      state: "Test State",
      zipcode: "12345",
      studentid: "TEST123",
      hostelblock: "A",
      roomno: "101",
    });

    await testStudent.save();
    console.log("✅ Test document saved successfully");

    // Test fetching documents
    console.log("🔄 Testing document retrieval...");
    const allStudents = await personaldetailModel.find();
    console.log(`✅ Found ${allStudents.length} students in database`);

    // Clean up test data
    await personaldetailModel.deleteOne({ studentid: "TEST123" });
    console.log("🧹 Test data cleaned up");

    console.log("🎉 All database tests passed!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
    console.error("Error details:", error.message);

    if (error.code === 11000) {
      console.error("🔍 Duplicate key error - student already exists");
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed");
  }
}

// Choose what to run
const action = process.argv[2];

if (action === "admin") {
  createAdminUser();
} else if (action === "test") {
  testDatabase();
} else {
  console.log("📋 Available commands:");
  console.log("  node testDb.js admin - Create admin user");
  console.log("  node testDb.js test  - Test database operations");
}
