// models/Vehicle.js

const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  vehicleStatus: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  registrationDocument: {
    type: String, // You can change this to store file paths or references
    required: true,
  },
  proofOfInsurance: {
    type: String, // You can change this to store file paths or references
    required: true,
  },
  isInformationAccurate: {
    type: Boolean,
    required: true,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Vehicle = mongoose.model("Vehicles", VehicleSchema);
