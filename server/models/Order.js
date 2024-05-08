const mongoose = require('mongoose');

// Function to generate Order ID
const generateOrderID = () => {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const now = new Date();
    const month = months[now.getMonth()];
    const date = ('0' + now.getDate()).slice(-2);
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return `CM${month}${date}${randomNumber}`;
};

// Define schema for Order
const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        default: generateOrderID,
        unique: true
    },
    customer: {
        type: String, // Change type to String to store email
        required: true
    },
    // customer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },

    products: {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        additionalDetails: {
            type: Object, // Additional details stored as an object
            default: {} // Default value as an empty object
        }
    },
    shippingDetails: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
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

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
