const express = require('express');
const Categories = require('../models/categories');
const router = express.Router();

// Save category
router.post('/category/save', async (req, res) => {
    try {
        let newCategory = new Categories(req.body);
        await newCategory.save();
        res.status(200).json({ success: "Category saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({
            success: true,
            existingCategories: categories
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

// Get a specific category by ID
router.get('/categories/:id', async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }
        res.status(200).json({
            success: true,
            category: category
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: err.message });
    }
});

// Update category
router.put('/categories/update/:id', async (req, res) => {
    try {
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({
            success: "Updated Successfully",
            updatedCategory
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

// Delete category
router.delete('/categories/delete/:id', async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found, delete unsuccessful"
            });
        }
        res.status(200).json({
            message: "Delete Successful",
            deletedCategory
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
