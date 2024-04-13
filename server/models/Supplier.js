// models/Supplier.js

const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    supplierID: {
        type: String,
        required: true,
    },
    supplierName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyAddress: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Supplier = mongoose.model("suppliers", SupplierSchema);
