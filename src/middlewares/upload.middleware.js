const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directory exists
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Check File Type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './uploads';
    ensureDirExists(uploadPath); // Ensure the directory exists before saving
    cb(null, uploadPath); // Directory to save villa images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with the storage engine and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 10); // Accept up to 10 images with the field name 'images'


module.exports = upload;
