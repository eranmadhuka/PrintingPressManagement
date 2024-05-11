const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userrouter = require("./routes/customerRoutes");
const multer = require("multer");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use("/auth", userrouter);

// Import routes
const customerRoutes = require("./routes/customerRoutes");

const employeeRoutes = require("./routes/employeeRoutes");
const employeeLeaveRoute = require("./routes/employeeLeaveRoute");

const lostOrProfitRoutes = require("./routes/lostOrProfitRoutes");
const employeeFinacialRoutes = require("./routes/employeeFinacialRoutes");
const incomeStatementRoutes = require("./routes/incomeStatementRoutes");
const employeeAttendanceRoutes = require("./routes/employeeAttendanceRoutes");

// const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const supplierRoutes = require("./routes/supplierRoutes");
const rawRoutes = require("./routes/rawMaterialRoutes");

const vehicle = require("./routes/vehicleRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

const categoryRoutes = require("./routes/category");

// Stripe Routes
const StripeRoutes = require("./routes/stripe-route");

// Connect to MongoDB Atlas
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

// Routes
app.use("/auth", userrouter);
// app.use('/customers', customerRoutes);
app.use("/employees", employeeRoutes);
app.use("/employeeLeave", employeeLeaveRoute);
app.use("/attendance", employeeAttendanceRoutes);

app.use("/financial", lostOrProfitRoutes);
app.use("/financial/empFinancial", employeeFinacialRoutes);
app.use("/financial/incomeStatement", incomeStatementRoutes);

// app.use('/inventory', inventoryRoutes);
app.use("/orders", orderRoutes);

app.use("/products", productRoutes);
app.use("/api", categoryRoutes);

app.use("/supplier", supplierRoutes);
app.use("/raw", rawRoutes);

app.use("/", vehicle);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/categories", categoryRoutes);

// Stripe Api
app.use("./api/stripe", StripeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
