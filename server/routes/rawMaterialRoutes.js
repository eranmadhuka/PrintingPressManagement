const express = require("express");
const router = express.Router();

const RawMaterials = require("../models/RawMaterial");

// All raw materials
router.get("/", (req, res) => {
  RawMaterials.find({})
    .then((materials) => res.json(materials))
    .catch((err) => res.json(err));
});

// Get raw material by ID
router.get("/getRawMaterials/:id", (req, res) => {
  const id = req.params.id;
  RawMaterials.findById(id)
    .then((material) => res.json(material))
    .catch((err) => res.json(err));
});

// Update raw material by ID
router.put("/updateRawMaterials/:id", (req, res) => {
  const id = req.params.id;

  // Validate quantity
  const quantity = req.body.quantity;
  if (quantity < 0) {
    return res.status(400).json({ error: "Quantity cannot be negative" });
  }

  // Validate unitPrice
  const unitPrice = req.body.unitPrice;
  if (unitPrice < 0) {
    return res.status(400).json({ error: "Unit price cannot be negative" });
  }

  // Validate totalAmount
  const totalAmount = req.body.totalAmount;
  if (totalAmount < 0) {
    return res.status(400).json({ error: "Total amount cannot be negative" });
  }

  RawMaterials.findByIdAndUpdate(id, req.body, {
    productID: req.body.productID,
    productName: req.body.productName,
    supplierEmail: req.body.supplierEmail,
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    totalAmount: req.body.totalAmount,
    date: req.body.date,
    description: req.body.description,
    updated_date: req.body.updated_date,
  })
    .then((material) => res.json(material))
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});

// Create a new raw material
router.post("/createRawMaterials", (req, res) => {
  RawMaterials.create(req.body)
    .then((material) => res.json(material))
    .catch((err) => res.json(err));
});

// Delete a raw material
router.delete("/deleteRawMaterials/:id", (req, res) => {
  const id = req.params.id;
  RawMaterials.findByIdAndDelete(id)
    .then((material) => res.json(material))
    .catch((err) => res.json(err));
});

module.exports = router;
