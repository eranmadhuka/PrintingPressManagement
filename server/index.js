const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const multer = require("multer");
app.use("/files", express.static("files"));

// Import routes
// const customerRoutes = require('./routes/customerRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// const financialRoutes = require('./routes/financialRoutes');
// const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require("./routes/orderRoutes");
// const productRoutes = require('./routes/productRoutes');
// const supplierRoutes = require('./routes/supplierRoutes');
const vehicle = require("./routes/vehicleRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

// Connect to MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/press", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/upload-files",
  upload.fields([
    { name: "proofOfInsurance", maxCount: 1 },
    { name: "registrationDocument", maxCount: 1 }, // Updated for the additional file
  ]),
  async (req, res) => {
    try {
      const proofOfInsuranceFile = req.files["proofOfInsurance"][0];
      const registrationDocument = req.files["registrationDocument"][0]; // Updated for the additional file

      console.log("Proof of Insurance:", proofOfInsuranceFile.filename);
      console.log("Registration Document:", registrationDocument.filename); // Updated for the additional file

      // Save the file names to the database or handle them as needed

      res.status(200).json({ message: "Files uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading files" });
    }
  }
);

// mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

// Routes
// app.use('/customers', customerRoutes);
// app.use('/employees', employeeRoutes);
// app.use('/financial', financialRoutes);
// app.use('/inventory', inventoryRoutes);
app.use("/order", orderRoutes);
// app.use('/product', productRoutes);
// app.use('/supplier', supplierRoutes);
app.use("/", vehicle);
app.use("/api/deliveries", deliveryRoutes);

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});
