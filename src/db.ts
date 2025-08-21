import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/admin"); 
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
    process.exit(1);
  }
};
