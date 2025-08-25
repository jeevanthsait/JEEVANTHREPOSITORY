import express from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, listProducts } from "../controllers/productController";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/", upload.array("images", 5), createProduct); 
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", listProducts);



export default router;
        