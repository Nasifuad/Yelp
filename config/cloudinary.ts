// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import config from "./config";
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } =
  config;
cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  cloud_name: CLOUDINARY_CLOUD_NAME,
  secure: true, // Use HTTPS for secure uploads
});

export default cloudinary;
