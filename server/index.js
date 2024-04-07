const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Import routes
// const customerRoutes = require('./routes/customerRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// const financialRoutes = require('./routes/financialRoutes');
// const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const productRoutes = require('./routes/productRoutes');
// const supplierRoutes = require('./routes/supplierRoutes');
// const transportRoutes = require('./routes/transportRoutes');

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/press', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

// Routes
// app.use('/customers', customerRoutes);
// app.use('/employees', employeeRoutes);
// app.use('/financial', financialRoutes);
// app.use('/inventory', inventoryRoutes);
app.use('/order', orderRoutes);
// app.use('/product', productRoutes);
// app.use('/supplier', supplierRoutes);
// app.use('/transport', transportRoutes);

app.listen(5000, () => {
    console.log("Server is Running on port 5000");
})