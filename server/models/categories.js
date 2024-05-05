const mongoose = require('mongoose');

// Define the schema for the "Categories" collection
const categorySchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

// Export the model based on the schema
module.exports = mongoose.model('categories', categorySchema);
