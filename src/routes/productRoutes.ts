import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  listProducts
} from "../controllers/productController";
import { upload } from "../middleware/upload";

const router = express.Router();

// 1. Create product with images
router.post("/", upload.array("images", 5), createProduct);

// 2. Get ALL products (no pagination/filter)
router.get("/", getProducts);

// 3. Get products with filters & pagination
router.get("/list", listProducts);

// 4. Get single product by ID
router.get("/:id", getProduct);

// 5. Update product with optional images
router.put("/:id", upload.array("images", 5), updateProduct);

// 6. Delete product
router.delete("/:id", deleteProduct);

export default router;
