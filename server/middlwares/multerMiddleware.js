import multer from 'multer';

// Configure storage options
const storage = multer.memoryStorage(); // Stores the file in memory as a buffer

// Define file filter (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject the file
  }
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a file size limit (5MB in this case)
});

export default upload;
