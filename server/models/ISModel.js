const mongoose = require("mongoose")

const ISchema = new mongoose.Schema({

    orderId: String,
    customerName: String,
    orderDate: Date,
    product: String,
    quantity: Number,
    unitPrice: Number,
    amount: Number

})

const ISModel = mongoose.model("incomedetails", ISchema)
module.exports = ISModel