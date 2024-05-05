const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  // messageId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   index: true, // Adding an index for better query performance
  // },
  employeeId: {
    type: String,
    required: true,
    index: true, // Adding an index for better query performance
  },
  productId: {
    type: String,
    required: true,
    index: true, // Adding an index for better query performance
  },
  text: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of a string
    minlength: 1, // Ensures the message has at least one character
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
