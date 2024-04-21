const mongoose = require("mongoose")

//Loss or profit form 
const LPSchema = new mongoose.Schema({

    description: String,
    entryType: String,
    date: Date,
    amount: Number
})

const LPSModel = mongoose.model("details", LPSchema)
module.exports = LPSModel