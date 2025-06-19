import multer from "multer";
const storage = multer.memoryStorage();

export const upload = multer({ storage });
// This configuration uses memory storage, which stores the file in memory as a Buffer.
// You can also use disk storage or cloud storage depending on your requirements.
// For example, to use disk storage, you can do the following:
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the directory to save files
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use original file name
//   },
// });
// export const upload = multer({ storage });
