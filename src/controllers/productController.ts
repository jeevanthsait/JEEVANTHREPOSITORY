import { Request, Response } from "express";
import Product from "../models/product";

// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    const imagePaths = (req.files as Express.Multer.File[]).map(file => file.path);

    const product = await Product.create({
      name,
      description,
      price,
      images: imagePaths,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }                                                                                                                                                                     
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    const imagePaths = req.files 
      ? (req.files as Express.Multer.File[]).map(file => file.path)
      : [];

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, ...(imagePaths.length && { images: imagePaths }) },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated", product });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
