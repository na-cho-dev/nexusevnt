import multer from 'multer';

// Store the file in memory as a buffer
const storage = multer.memoryStorage();

// Define file filter (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject the file
  }
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Set a file size limit (10MB in this case)
});

// Middleware to save file buffer and MIME type
export const eventImgUpload = upload.single('event_image'); // This will handle a single file upload with field name 'event_image'
export const profileImgUpload = upload.single('profile_img');
