const mongoose = require("mongoose")

//Loss or profit form 
const LPSchema = new mongoose.Schema({

    description: String,
    entryType: String,
    date: Date,
    amount: Number

})

const LPSModel = mongoose.model("lpdetails", LPSchema)
module.exports = LPSModel

//income form

