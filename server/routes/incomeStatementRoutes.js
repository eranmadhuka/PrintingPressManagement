const express = require("express");
const router = express.Router();
// const ISModel = require("../models/ISModel");
const Order = require('../models/Order');

//fetch all entries
router.get("/getIncomeDetails", async (req, res) => {
    try {
        const iDetails = await Order.find({});
        return res.json(iDetails);
    } catch (error) {
        console.error("Error fetching income details", error);
        return res.status(500).json({ message: "Failed to fetch income deetails" });
    }
});

router.get("/getIncomeDetails/:id", async (req, res) => {
    try {
        const incomeId = req.params.id;

        const incomeEntry = await Order.findById(incomeId)

        if (!incomeEntry) {
            return res.status(404).json({ message: "Entry no dfound" });
        }

        return res.json(incomeEntry);
    } catch (error) {
        console.error("Error fetching entry:", error);
        return res.status(500).json({ message: "failed to fetch entry" });
    }
});

router.put("/updateIncomeDetails/:id", (req, res) => {
    const incomeId = req.params.id;
    Order.findByIdAndUpdate(incomeId, {
        orderId: req.body.orderId,
        customerName: req.body.customerName,
        orderDate: req.body.orderDate,
        product: req.body.product,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        amount: req.body.amount,
    })
        .then((iDetails) => res.json(iDetails))
        .catch((err) => res.json(err));
});

// Delete an order
router.delete('/deleteIncomeDetails/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;