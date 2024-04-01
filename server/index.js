const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Import routes
const customerRoutes = require('./models/Customer');
const employeeRoutes = require('./models/Employee');
const financialRoutes = require('./models/Financial');
const inventoryRoutes = require('./models/Inventory');
const orderRoutes = require('./models/Order');
const productRoutes = require('./models/Product');
const supplierRoutes = require('./models/Supplier');
const transportRoutes = require('./models/Transport');

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/usersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

// Routes
app.use('/customers', customerRoutes);
app.use('/employees', employeeRoutes);
app.use('/financial', financialRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/order', orderRoutes);
app.use('/product', productRoutes);
app.use('/supplier', supplierRoutes);
app.use('/transport', transportRoutes);

app.listen(5000, () => {
    console.log("Server is Running on port 5000");
})