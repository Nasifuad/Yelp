import { Router } from "express";
import { checkAuth } from "../../utility/checkAuth";
import asyncHandler from "../../utility/asyncHandler";
import { upload } from "../../utils/multer";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";
const router = Router();

router.get("/getProducts", asyncHandler(getAllProducts));
router.get("/:id", asyncHandler(getProductById));
router.post(
  "/addProduct",

  upload.fields([
    { name: "image_small", maxCount: 5 },
    { name: "image_big", maxCount: 5 },
  ]),
  asyncHandler(createProduct)
);
router.put("/:id", checkAuth, asyncHandler(updateProduct));
router.delete("/:id", checkAuth, asyncHandler(deleteProduct));

export const productRoute = router;
