const mongoose = require("mongoose");

// Function to generate Vehicle ID
const generateVehicleID = () => {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const now = new Date();
  const month = months[now.getMonth()];
  const date = ("0" + now.getDate()).slice(-2);
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return `VEH${month}${date}${randomNumber}`;
};

const VehicleSchema = new mongoose.Schema({
  vehicleID: {
    type: String,
    default: generateVehicleID,
    unique: true,
  },
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