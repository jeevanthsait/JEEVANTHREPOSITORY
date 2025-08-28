import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../models/Role";
import User, { IUser } from "../models/User";

const MONGO_URI = "mongodb://127.0.0.1:27017/admin"; 

const seedData = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    const roles = ["admin", "user", "manager"];
    const roleDocs: (typeof Role.prototype)[] = [];

    for (const roleName of roles) {
      let role = await Role.findOne({ name: roleName });
      if (!role) {
        role = await Role.create({ name: roleName });
        console.log(`Role created: ${roleName}`);
      }
      roleDocs.push(role);
    }

    const adminRole = roleDocs.find((r) => r.name === "admin");
    if (!adminRole) throw new Error("Admin role not found");

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: adminRole._id,
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    process.exit(0);
  } catch (error: unknown) {
    console.error("Seeding error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

seedData();
