const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    updated: { type: Date, default: Date.now },
    feedback: { type: String },
});

const usermodel = mongoose.model("customers", customerSchema);

module.exports = usermodel;
