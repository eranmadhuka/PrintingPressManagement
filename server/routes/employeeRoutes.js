const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.get("/drivers/ids", async (req, res) => {
    try {
        // Find employees with designation "Driver" and return only their IDs
        const driverIds = await Employee.find(
            { designation: "Driver" },
            { _id: 1 } // Project only the _id field
        ).select("_id"); // Optionally reiterate to select only _id for clarity

        // Transform the data to return a list of IDs
        const ids = driverIds.map((driver) => driver._id);

        res.json(ids);
    } catch (error) {
        console.error("Error fetching driver IDs:", error);
        res.status(500).json({ error: "Error fetching driver IDs" });
    }
});

// Route to get detailed information about drivers
router.get("/drivers/details", async (req, res) => {
    try {
        // Find employees with designation "Driver" and return detailed information
        const drivers = await Employee.find(
            { designation: "Driver" },
            { _id: 1, fname: 1, lname: 1, phone: 1 }
        );
        res.json(drivers);
    } catch (error) {
        console.error("Error fetching driver details:", error);
        res.status(500).json({ error: "Error fetching driver details" });
    }
});

// All users
router.get("/", (req, res) => {
    Employee.find({})
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});

// Get user by ID
router.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    Employee.findById({ _id: id })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});

// Update User by ID
router.put("/updateEmployee/:id", (req, res) => {
    const id = req.params.id;
    Employee.findByIdAndUpdate(id, {
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        designation: req.body.designation,
        department: req.body.department,
    })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});

// Create a new user
router.post("/createEmp", (req, res) => {
    Employee.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});

// Delete a user
router.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id;
    Employee.findByIdAndDelete({ _id: id })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});

module.exports = router;
