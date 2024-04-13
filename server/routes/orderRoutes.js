const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get order by ID
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

// Create a new order
// Create a new order with validation
router.post('/', [
    body('customer').exists().withMessage('Customer is required'),
    body('products').isArray().withMessage('Products must be an array'),
    body('status').isIn(['Pending', 'Confirmed', 'Shipped', 'Delivered']).withMessage('Invalid status'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, proceed to create the order
    const order = new Order({
        customer: req.body.customer,
        products: req.body.products,
        status: req.body.status
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update order with validation
router.patch('/:id', getOrder, [
    body('customer').optional(),
    body('products').optional().isArray(),
    body('status').optional().isIn(['Pending', 'Confirmed', 'Shipped', 'Delivered']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, proceed to update the order
    if (req.body.customer != null) {
        res.order.customer = req.body.customer;
    }
    if (req.body.products != null) {
        res.order.products = req.body.products;
    }
    if (req.body.status != null) {
        res.order.status = req.body.status;
    }
    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an order
router.delete('/deleteOrder/:id', async (req, res) => {
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


// Middleware function to get order by ID
async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}

module.exports = router;
