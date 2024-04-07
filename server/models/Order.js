const mongoose = require('mongoose');

// Define schema for Order
const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create model for Order
const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
