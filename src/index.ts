import express from "express";
import { connectToDB } from "./db";
import employeeRoutes from "./routes/employees.routes";

const app = express();
app.use(express.json());

app.use("/employees", employeeRoutes); 

const PORT = 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
