const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.KEY, { expiresIn: "90d" });
};

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

router.post("/emplogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await Employee.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not registered" });
    }

    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "90d",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({
      status: true,
      message: "Login successfully",
      email,
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get user by ID
router.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  Employee.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/:email", async (req, res) => {
  const userEmail = req.params.email; // Extract the email from request parameters

  try {
    const user = await Employee.findOne({ email: userEmail }); // Find the user by email

    res.json(user); // Send user data as response
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Failed to fetch user data" });
  }
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
