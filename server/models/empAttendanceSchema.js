const mongoose = require("mongoose");

const empAttendanceSchema = new mongoose.Schema({
  EmpEmail: {
    type: String,
    unique: true,
  },
  Date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  checkInTime: {
    type: Date,
    required: true,
  },
  CheckOut: {
    type: Date,
  },
  WorkingHours: {
    type: Number,
  },
  Overtime: {
    type: Number,
  },
});

module.exports = mongoose.model("attendance", empAttendanceSchema);
