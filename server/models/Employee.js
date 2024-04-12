const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    designation: {
        type: String,
    },
    department: {
        type: String,
    },
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
