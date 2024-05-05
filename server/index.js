const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const http = require("http");

const { userrouter } = require("./routes/customerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const employeeLeaveRoute = require("./routes/employeeLeaveRoute");
const orderRoutes = require("./routes/orderRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const vehicle = require("./routes/vehicleRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/files", express.static("files"));
app.use(cookieParser());

// Use Routes
app.use("/auth", userrouter);
app.use("/employees", employeeRoutes);
app.use("/employeeLeave", employeeLeaveRoute);
app.use("/orders", orderRoutes);
app.use("/supplier", supplierRoutes);
app.use("/", vehicle);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api", messageRoutes); // Use the message routes under /api prefix

const uri =
  "mongodb+srv://hweranmadhuka:Atw9Aa10zRiwQm2d@printpressdb.tcp6uzx.mongodb.net/?retryWrites=true&w=majority&appName=PrintPressDB";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "PrintPressDB",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/files");
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
    { name: "registrationDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const proofOfInsuranceFile = req.files["proofOfInsurance"][0];
      const registrationDocument = req.files["registrationDocument"][0];

      console.log("Proof of Insurance:", proofOfInsuranceFile.filename);
      console.log("Registration Document:", registrationDocument.filename);

      res.status(200).json({ message: "Files uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading files" });
    }
  }
);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
