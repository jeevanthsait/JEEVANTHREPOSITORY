import express from "express";
import { connectToDB } from "./db";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import mailRoutes from "./routes/mailRoutes";
// import employeeRoutes from "./routes/employees.routes";
import authRoutes from "./routes/authRoutes";
const app = express();
app.use(express.json());

// app.use("/employees", employeeRoutes); 
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/uploads", express.static("uploads")); // serve images
app.use("/api/products", productRoutes);
app.use("/api/mail", mailRoutes);
const PORT = 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
