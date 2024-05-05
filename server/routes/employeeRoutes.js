const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

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
  const { fname, lname, email, password, designation, department } = req.body;

  // Check if all required fields are provided
  if (!fname || !lname || !email || !password || !designation || !department) {
    return res.status(400).json({
      message:
        "All required fields must be provided: fname, lname, email, password, designation, department",
    });
  }

  // Validate email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

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
