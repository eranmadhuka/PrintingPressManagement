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
    type: String,
    required: true,
  },
  proofOfInsurance: {
    type: String,
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

module.exports = Vehicle = mongoose.model("vehicles", VehicleSchema);
