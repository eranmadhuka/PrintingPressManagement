const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery");

// Route: POST /api/deliveries - Create a new delivery
router.post("/", async (req, res) => {
  try {
    const newDelivery = new Delivery(req.body);
    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: GET /api/deliveries - Get all deliveries
router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!deletedDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json({ message: "Delivery deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// In your routes file, assuming deliveries is a route dealing with delivery data
router.delete("/", async (req, res) => {
  try {
    const result = await Delivery.deleteMany({ productStatus: "Delivered" });
    if (result.deletedCount === 0) {
      return res.status(404).send("No delivered items found to delete.");
    }
    res.status(200).send("Delivered items have been successfully deleted.");
  } catch (error) {
    console.error("Failed to delete delivered items:", error);
    res.status(500).send("Error deleting delivered items: " + error.message);
  }
});

module.exports = router;
