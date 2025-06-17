import { Request, Response, NextFunction } from "express";
import ProductModel from "./product.model";

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

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    console.log(`Fetching product with ID: ${id}`);

    const product = await ProductModel.findById({
      _id: id,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      data: product,
      message: `Product with ID ${id} fetched successfully`,
    });
  } catch (error) {
    next(error);
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
      image_small,
      image_big,
      reviews,
      rating,
      user,
    } = req.body;
    console.log(req.body);
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
    console.log("Product created successfully:", product);
  } catch (error) {
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
