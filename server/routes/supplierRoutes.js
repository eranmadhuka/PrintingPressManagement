const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");

// All suppliers
router.get("/", (req, res) => {
    Supplier.find({})
        .then((suppliers) => res.json(suppliers))
        .catch((err) => res.json(err));
});

// Get supplier by ID
router.get("/getSupplier/:id", (req, res) => {
    // Update endpoint to getSupplier
    const id = req.params.id;
    Supplier.findById(id)
        .then((supplier) => res.json(supplier))
        .catch((err) => res.json(err));
});

// Update Supplier by ID
router.put("/updateSupplier/:id", (req, res) => {
    // Update endpoint to updateSupplier
    const id = req.params.id;
    Supplier.findByIdAndUpdate(id, req.body, {
        supplierID: req.body.supplierID,
        supplierName: req.body.supplierName,
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        updated_date: req.body.updated_date,
    })
        .then((supplier) => res.json(supplier))
        .catch((err) => res.json(err));
});

// Create a new supplier
router.post("/createSupplier", (req, res) => {
    // Update endpoint to createSupplier
    Supplier.create(req.body)
        .then((supplier) => res.json(supplier))
        .catch((err) => res.json(err));
});

// Delete a supplier
router.delete("/deleteSupplier/:id", (req, res) => {
    // Update endpoint to deleteSupplier
    const id = req.params.id;
    Supplier.findByIdAndDelete(id)
        .then((supplier) => res.json(supplier))
        .catch((err) => res.json(err));
});

module.exports = router;
