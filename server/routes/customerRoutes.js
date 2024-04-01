const express = require('express');
const customerModel = require('../models/Customer');

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    customerModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get user by ID
router.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    customerModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update user by ID
router.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    customerModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new user
router.post("/createUser", (req, res) => {
    customerModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a user
router.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    customerModel.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
