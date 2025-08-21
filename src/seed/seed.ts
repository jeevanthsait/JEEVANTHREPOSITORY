import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../models/Role";
import User, { IUser } from "../models/User";

const MONGO_URI = "mongodb://127.0.0.1:27017/admin"; 

const seedData = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" MongoDB Connected");
    const roles:any[] = ["admin", "user", "manager"];
    const roleDocs: any[] = [];

    for (const r of roles) {
      let role = await Role.findOne({ name: r });
      if (!role) {
        role = await Role.create({ name: r });
        console.log(` Role created: ${r}`);
      }
      roleDocs.push(role);
    }
    

    const adminRole = roleDocs.find((r) => r.name === "admin");
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: adminRole._id,
      });
      console.log(" Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    process.exit();
  } catch (err) {
    console.error(" Seeding error:", err);
    process.exit(1);
  }
};

seedData();
