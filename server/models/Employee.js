const mongoose = require("mongoose");

// Function to generate Employee ID
const generateEmployeeID = () => {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const now = new Date();
    const month = months[now.getMonth()];
    const date = ('0' + now.getDate()).slice(-2);
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return `EMP${month}${date}${randomNumber}`;
};

const EmployeeSchema = new mongoose.Schema({
    empID: {
        type: String,
        default: generateEmployeeID,
        unique: true
    },
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

module.exports = Employee = mongoose.model("employees", EmployeeSchema);
