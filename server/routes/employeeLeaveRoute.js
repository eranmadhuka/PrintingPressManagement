const express = require("express");
const router = express.Router();

const EmployeeLeave = require("../models/EmployeeLeaves");

// All leaves
router.get("/", (req, res) => {
    EmployeeLeave.find({})
        .then((leaves) => res.json(leaves))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Get leave by ID
router.get("/getLeave/:id", (req, res) => {
    const id = req.params.id;
    EmployeeLeave.findById(id)
        .then((leave) => {
            if (!leave) {
                return res.status(404).json({ message: "Leave not found" });
            }
            res.json(leave);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Update leaves by ID
router.put("/updateLeave/:id", (req, res) => {
    const id = req.params.id;
    EmployeeLeave.findByIdAndUpdate(
        id,
        {
            reason: req.body.reason,
            from: req.body.from,
            to: req.body.to,
            type: req.body.type,
        },
        { new: true } // To return the updated document
    )
        .then((leave) => {
            if (!leave) {
                return res.status(404).json({ message: "Leave not found" });
            }
            res.json(leave);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Create new leave
router.post("/createLeave", (req, res) => {
    EmployeeLeave.create(req.body)
        .then((leave) => res.status(201).json(leave))
        .catch((err) => res.status(400).json({ error: err.message }));
});

// Delete a leave
router.delete("/deleteLeave/:id", (req, res) => {
    const id = req.params.id;
    EmployeeLeave.findByIdAndDelete(id)
        .then((leave) => {
            if (!leave) {
                return res.status(404).json({ message: "Leave not found" });
            }
            res.json({ message: "Leave deleted successfully" });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
