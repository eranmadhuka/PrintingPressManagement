const express = require("express");
const router = express.Router();
const LPSModel = require("../models/LPSModel");

router.post("/createLPSEntry", (req, res) => {
    LPSModel.create(req.body)
        .then((details) => res.json(details))
        .catch((err) => res.json(err));
});

router.get("/getdetails", async (req, res) => {
    try {
        const users = await LPSModel.find({});
        return res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
});

router.get("/getdetails/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // Find the entry by its ID
        const entry = await LPSModel.findById(id);

        // Check if the entry exists
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        // Return the entry
        return res.json(entry);
    } catch (error) {
        console.error("Error fetching entry:", error);
        return res.status(500).json({ message: "Failed to fetch entry" });
    }
});

router.delete("/deleteaccount/:id", (req, res) => {
    const id = req.params.id;
    LPSModel.findOneAndDelete({ _id: id })
        .then((user) => {
            if (!user) {
                app.delete("/deleteaccount/:id", async (req, res) => {
                    try {
                        const id = req.params.id;

                        // Validate the ID
                        if (!id || !isValidObjectId(id)) {
                            return res.status(400).json({ message: "Invalid ID format" });
                        }

                        // Find and delete the user account
                        const user = await LPSModel.findByIdAndDelete(id);

                        if (!user) {
                            return res.status(404).json({ message: "User not found" });
                        }

                        // Respond with a success message
                        res.json({ message: "User account deleted successfully" });
                    } catch (err) {
                        // Handle database errors or other unexpected errors
                        console.error("Failed to delete user:", err);
                        res.status(500).json({
                            message: "Failed to delete user account",
                            error: err.message,
                        });
                    }
                });

                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch((err) =>
            res.status(500).json({ message: "Failed to delete user", error: err })
        );
});

router.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    LPSModel.findByIdAndUpdate(id, {
        description: req.body.description,
        entryType: req.body.entryType,
        date: req.body.date,
        amount: req.body.amount,
    })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});


module.exports = router;