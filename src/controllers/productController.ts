import { Request, Response } from "express";
import Product from "../models/product";

// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body; 
    const imagePaths = (req.files as Express.Multer.File[] || []).map(file => file.filename);
    const product = await Product.create({
      name,
      description,
      price,
      images: imagePaths
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
    const { name, description, price, existingImages } = req.body;

    const files = req.files as Express.Multer.File[];
    const newImages = files?.map(file => file.filename) || [];

    const finalImages = [
      ...(existingImages ? JSON.parse(existingImages) : []),
      ...newImages
    ];

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        description, 
        price: Number(price), // convert string → number
        images: finalImages 
      },
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

//check changes in the github new change

//filtering the data
export const listProducts = async (req: Request, res: Response) => {
  try {
    const {
      name,
      fromDate,
      toDate,
      inStock,
      minStock,
      page = "1",
      limit = "10",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query as Record<string, string>;
    const filter: Record<string, any> = {};
    // 1) Filter by name (case-insensitive contains)
    if (name) {
      filter.name = { $regex: new RegExp(name, "i") };
      // Tip: For "starts with" search, use: new RegExp(`^${name}`, "i")
    } 
    // 2) Filter by created date range
    if (fromDate || toDate) {
      const createdAt: Record<string, Date> = {};
      if (fromDate) {
        const d = new Date(fromDate);
        if (!isNaN(d.getTime())) createdAt.$gte = d;
      }
      if (toDate) {
        const d = new Date(toDate);
        if (!isNaN(d.getTime())) {
          // include the whole end day
          d.setHours(23, 59, 59, 999);
          createdAt.$lte = d;
        }
      }
      if (Object.keys(createdAt).length > 0) {
        filter.createdAt = createdAt;
      }
    }

    // 3) Filter by stock available
    if (typeof inStock !== "undefined") {
      const isInStock = inStock.toLowerCase() === "true";
      filter.stock = isInStock ? { $gt: 0 } : { $lte: 0 };
    } else if (typeof minStock !== "undefined") {
      const ms = Number(minStock);
      if (!Number.isNaN(ms)) {
        filter.stock = { $gte: ms };
      }
    }

    // Pagination + sorting
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Math.min(100, Number(limit)));
    const skip = (pageNum - 1) * limitNum;
    const sort: Record<string, 1 | -1> = {
      [String(sortBy)]: sortOrder.toLowerCase() === "asc" ? 1 : -1,
    };
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
    ]);

    return res.json({
      message: "Products fetched",
      data: items,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
        sortBy,
        sortOrder,
        filterApplied: filter,
      },
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message || error,
    });
  }
};