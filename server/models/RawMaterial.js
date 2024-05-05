// models/RawMaterials.js

const mongoose = require("mongoose");

const RawMaterialsSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },

  supplierEmail: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = RawMaterials = mongoose.model(
  "rowMaterials",
  RawMaterialsSchema
);
