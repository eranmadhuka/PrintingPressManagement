const express = require("express");
const router = express.Router();
const Attendance = require("../models/empAttendanceSchema");

// Create Attendance Record (Check-in)
router.post("/createAttendance", async (req, res) => {
  const { empEmail, checkInTime } = req.body;

  try {
    // Create a new attendance record
    const attendance = new Attendance({
      EmpEmail: empEmail,
      checkInTime: checkInTime,
    });

    // Save the attendance record to the database
    await attendance.save();

    res.json({ msg: "Attendance record created successfully", attendance });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update Attendance Record (Check-out)
router.put("/updateAttendance", async (req, res) => {
  const { empEmail, checkOutTime } = req.body;

  try {
    // Find the attendance record for the employee
    let attendance = await Attendance.findOne({ EmpEmail: empEmail });
    if (!attendance) {
      return res.status(404).json({ msg: "Attendance record not found" });
    }

    // Update the check-out time
    attendance.CheckOut = checkOutTime;

    // Calculate working hours
    const checkInTime = attendance.checkInTime;
    const checkOutTimeObj = new Date(checkOutTime); // Convert to Date object if not already
    const workingHours = (checkOutTimeObj - checkInTime) / (1000 * 60 * 60); // Convert milliseconds to hours

    // Calculate overtime (assuming 8 hours as regular working hours)
    const regularHours = 8;
    let overtime = workingHours - regularHours;
    if (overtime < 0) {
      overtime = 0; // No overtime if working hours are less than regular hours
    }

    // Update WorkingHours and Overtime fields
    attendance.WorkingHours = workingHours.toFixed(2); // Round to 2 decimal places
    attendance.Overtime = overtime.toFixed(2); // Round to 2 decimal places

    // Save the updated attendance record
    await attendance.save();

    res.json({ msg: "Attendance record updated successfully", attendance });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get Single Attendance Record by Employee Email
router.get("/getAttendance/:empEmail", async (req, res) => {
  const empEmail = req.params.empEmail;

  try {
    // Find the attendance record for the employee
    const attendance = await Attendance.findOne({ EmpEmail: empEmail });
    if (!attendance) {
      return res.status(404).json({ msg: "Attendance record not found" });
    }

    res.json(attendance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get All Attendance Records
router.get("/getAllAttendance", async (req, res) => {
  try {
    // Find all attendance records
    const allAttendance = await Attendance.find();
    res.json(allAttendance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
