const multer = require("multer");
const path = require("path");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/images"); // Set destination folder for uploads
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // Set filename
  },
});

// Initialize Multer with defined storage
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = { upload };
