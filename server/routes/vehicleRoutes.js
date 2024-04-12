const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Vehicle = require("../models/Vehicle");
const fs = require("fs");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get vehicle by ID
router.get("/getVehicle/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ message: "Invalid Vehicle ID" });
  }
});

// Express route to view documents for a specific vehicle
router.get("/view-documents/:vehicleId", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({
      registrationDocument: `http://localhost:5000/files/${vehicle.registrationDocument}`,
      proofOfInsurance: `http://localhost:5000/files/${vehicle.proofOfInsurance}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Vehicle
router.post(
  "/createVehicle",
  upload.fields([
    { name: "registrationDocument", maxCount: 1 },
    { name: "proofOfInsurance", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      vehicleName,
      vehicleNumber,
      vehicleStatus,
      vehicleType,
      isInformationAccurate,
    } = req.body;

    const newVehicle = new Vehicle({
      vehicleName,
      vehicleNumber,
      vehicleStatus,
      vehicleType,
      registrationDocument: req.files["registrationDocument"][0].filename,
      proofOfInsurance: req.files["proofOfInsurance"][0].filename,
      isInformationAccurate,
    });

    try {
      const savedVehicle = await newVehicle.save();
      res.status(201).json(savedVehicle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Update vehicle by ID
router.put("/updateVehicle/:id", async (req, res) => {
  const id = req.params.id;
  const {
    vehicleName,
    vehicleNumber,
    vehicleStatus,
    vehicleType,
    isInformationAccurate,
  } = req.body;

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.vehicleName = vehicleName;
    vehicle.vehicleNumber = vehicleNumber;
    vehicle.vehicleStatus = vehicleStatus;
    vehicle.vehicleType = vehicleType;
    vehicle.isInformationAccurate = isInformationAccurate;

    const updatedVehicle = await vehicle.save();
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a vehicle
router.delete("/deleteVehicle/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Delete the associated documents from the server if they exist
    if (deletedVehicle.registrationDocument) {
      const regDocPath = path.join(
        __dirname,
        `../files/${deletedVehicle.registrationDocument}`
      );
      if (fs.existsSync(regDocPath)) {
        fs.unlinkSync(regDocPath);
      }
    }

    if (deletedVehicle.proofOfInsurance) {
      const proofDocPath = path.join(
        __dirname,
        `../files/${deletedVehicle.proofOfInsurance}`
      );
      if (fs.existsSync(proofDocPath)) {
        fs.unlinkSync(proofDocPath);
      }
    }

    res.json({
      message: "Vehicle and associated documents deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
