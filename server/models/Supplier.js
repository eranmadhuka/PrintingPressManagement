const mongoose = require("mongoose");

// Function to generate Supplier ID
const generateSupplierID = () => {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const now = new Date();
    const month = months[now.getMonth()];
    const date = ('0' + now.getDate()).slice(-2);
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return `SUP${month}${date}${randomNumber}`;
};

const SupplierSchema = new mongoose.Schema({
    supplierID: {
        type: String,
        default: generateSupplierID,
        unique: true
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
