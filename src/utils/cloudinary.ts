import cloudinary from "../../config/cloudinary";

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  filename: string
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", public_id: filename },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
      .end(fileBuffer);
  });
};
