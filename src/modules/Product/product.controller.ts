import { Request, Response, NextFunction } from "express";
import ProductModel from "./product.model";
import { uploadToCloudinary } from "../../utils/cloudinary";
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", limit = "10", sort = "name" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const products = await ProductModel.find()
      .sort(sort as string)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Fetching product with ID:", id);
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Query using _id
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      brand,
      description,
      category,
      tags,
      price,
      discount,
      quantity,
      sold,
      netWeight,
      type,
      flavor,
      reviews,
      rating,
      user,
    } = req.body;
    console.log("Request body:", req.body);
    const image_small: string[] = [];
    const image_big: string[] = [];

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Handle image_small[]
    if (files.image_small) {
      for (const file of files.image_small) {
        const result = await uploadToCloudinary(
          file.buffer,
          Date.now().toString()
        );
        image_small.push((result as any).secure_url);
      }
    }

    // Handle image_big[]
    if (files.image_big) {
      for (const file of files.image_big) {
        const result = await uploadToCloudinary(
          file.buffer,
          Date.now().toString()
        );
        image_big.push((result as any).secure_url);
      }
    }

    const product = await ProductModel.create({
      name,
      brand,
      description,
      category,
      tags,
      price,
      discount,
      quantity,
      sold,
      netWeight,
      type,
      flavor,
      image_small,
      image_big,
      reviews,
      rating,
      user,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("Error creating product:", error);
    next(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  // Logic to update product by id
  res.status(200).json({ message: `Product ${req.params.id} updated` });
};

const deleteProduct = async (req: Request, res: Response) => {
  // Logic to delete product by id
  res.status(200).json({ message: `Product ${req.params.id} deleted` });
};

const applyDiscount = async (req: Request, res: Response) => {
  // Logic to apply/update discount for product
  res
    .status(200)
    .json({ message: `Discount applied to product ${req.params.id}` });
};

const addReview = async (req: Request, res: Response) => {
  // Logic to add a review to product
  res.status(201).json({ message: `Review added to product ${req.params.id}` });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  applyDiscount,
  addReview,
};
