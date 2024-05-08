const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
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

// Get Order by User ID
// router.get("/orderHistory/:id", (req, res) => {
//     const userID = req.params.id;
//     Order.find({ customer: userID })
//         .then((leaves) => {
//             if (!leaves || leaves.length === 0) {
//                 return res.status(404).json({ message: "Order not found" });
//             }
//             res.json(leaves);
//         })
//         .catch((err) => res.status(500).json({ error: err.message }));
// });
router.get("/orderHistory/:email", (req, res) => {
    const userEmail = req.params.email;

    Order.find({ customer: userEmail })
        .then((orders) => {
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "Orders not found" });
            }
            res.json(orders);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});



// Without Validation
router.post('/', async (req, res) => {
    const { customer, products, shippingDetails, status } = req.body;

    try {
        // Create a new order instance
        const order = new Order({
            customer,
            products,
            shippingDetails,
            status
        });

        // Save the order to the database
        const newOrder = await order.save();

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Update an order
router.patch('/:id', async (req, res) => {
    const orderId = req.params.id;
    const updateData = req.body;

    try {
        // Validate the order ID
        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        // Validate the update data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Find the order by ID and update it
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send the updated order as response
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Server error' });
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
