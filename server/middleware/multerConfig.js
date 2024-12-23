import multer from 'multer';
import path from 'path';

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the folder where files will be saved
    cb(null, 'uploads/'); // Ensure this folder exists in your project directory
  },
  filename: (req, file, cb) => {
    // Customize the filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only PDF and DOC/DOCX are allowed.')); // Reject file
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter,
});

// Export the upload instance for use in routes
export default upload;
