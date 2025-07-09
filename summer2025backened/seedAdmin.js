import mongoose from "mongoose";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Create admin users
async function seedAdminUsers() {
  try {
    console.log("🌱 Seeding admin users...");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // Admin users to create
    const adminUsers = [
      {
        email: "admin@mess.com",
        password: "pass",
        role: "superadmin",
        isVerified: true,
        name: "Super Admin",
      },
      {
        email: "mess.admin@mess.com",
        password: "messpass",
        role: "messadmin",
        isVerified: true,
        name: "Mess Admin",
      },
      {
        email: "canteen.admin@mess.com",
        password: "canteenpass",
        role: "canteenadmin",
        isVerified: true,
        name: "Canteen Admin",
      },
    ];

    for (const adminData of adminUsers) {
      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: adminData.email });
      if (existingAdmin) {
        console.log(`⚠️ Admin user ${adminData.email} already exists`);
        continue;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      // Create admin user
      const adminUser = new User({
        email: adminData.email,
        password: hashedPassword,
        role: adminData.role,
        isVerified: adminData.isVerified,
      });

      await adminUser.save();
      console.log(`✅ ${adminData.name} created successfully!`);
      console.log(`   📧 Email: ${adminData.email}`);
      console.log(`   🔑 Password: ${adminData.password}`);
      console.log(`   👑 Role: ${adminData.role}`);
      console.log("   ---");
    }

    console.log("🎉 Admin seeding completed!");
  } catch (error) {
    console.error("❌ Failed to seed admin users:", error);
    console.error("Error details:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed");
  }
}

seedAdminUsers();
