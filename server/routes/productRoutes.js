const express = require('express');
// const Products = require('../models/Product');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
    }
});

// Multer file filter to restrict file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed.'), false); // Reject the file
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Route to handle adding a new product
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        // Create a new Product object with the provided data
        const newProduct = new Product({
            pname: req.body.pname,
            pcategory: req.body.pcategory,
            description: req.body.description,
            pprice: req.body.pprice,
            image: req.file.path // Save the file path of the uploaded image
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct); // Respond with the saved product data
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Save product
// Example using async/await
// router.post('/save', async (req, res) => {
//     try {
//         let newProduct = new Products(req.body);
//         await newProduct.save();
//         res.status(200).json({ success: "Product saved successfully" });
//     } catch (err) {
//         console.error(err);  // Server-side error log
//         res.status(400).json({ error: err.message });
//     }
// });


// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            existingProducts: products
        });
    } catch (err) {
        console.error(err);  // Server-side error log
        res.status(400).json({ error: err.message });
    }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({
            success: true,
            product: product
        });
    } catch (err) {
        console.error(err);  // Server-side error log
        res.status(400).json({ success: false, error: err.message });
    }
});


// Update product
router.put('/update/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }  // To return the updated document
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({
            success: "Updated Successfully",
            updatedProduct
        });
    } catch (err) {
        console.error(err);  // Server-side error log
        res.status(400).json({ error: err.message });
    }
});


// Delete product
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found, delete unsuccessful"
            });
        }
        res.status(200).json({
            message: "Delete Successful",
            deletedProduct
        });
    } catch (err) {
        console.error(err);  // Server-side error log
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;
