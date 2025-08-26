import express from "express";
import cors from "cors";
import { connectToDB } from "./db";
import productRoutes from "./routes/productRoutes";
import mailRoutes from "./routes/mailRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
// import authroutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200", credentials: true })); 

app.use("/auth", authRoutes);  
app.use("/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/mail", mailRoutes);

const PORT = 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
