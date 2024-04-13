const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const employeeLeaveRoute = require("./routes/employeeLeaveRoute");
// const financialRoutes = require('./routes/financialRoutes');
// const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
// const transportRoutes = require('./routes/transportRoutes');
const vehicle = require("./routes/vehicleRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads/files", express.static("files"));

// Connect to MongoDB Atlas
const uri = "mongodb+srv://hweranmadhuka:Atw9Aa10zRiwQm2d@printpressdb.tcp6uzx.mongodb.net/?retryWrites=true&w=majority&appName=PrintPressDB";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "PrintPressDB"
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Files upload with multer
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

            // Save the file names to the database or handle them as needed

            res.status(200).json({ message: "Files uploaded successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error uploading files" });
        }
    }
);

// Routes
app.use('/customers', customerRoutes);
app.use('/employees', employeeRoutes);
app.use("/employeeLeave", employeeLeaveRoute);
// app.use('/financial', financialRoutes);
// app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes);
// app.use('/product', productRoutes);
app.use('/supplier', supplierRoutes);
// app.use('/transport', transportRoutes);
app.use("/", vehicle);
app.use("/api/deliveries", deliveryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
