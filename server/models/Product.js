const mongoose = require('mongoose');

// Define the schema for the "Products" collection
const productSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    pcategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pprice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

// Export the model based on the schema
module.exports = mongoose.model('Products', productSchema);
