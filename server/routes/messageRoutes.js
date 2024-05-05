const express = require("express");
const router = express.Router();
const Message = require("../models/message"); // Import the Message model

// Endpoint to send a message
router.post("/sendMessage", async (req, res) => {
  try {
    const { employeeId, productId, text } = req.body;
    // Validate input data
    if (!employeeId || !text || !productId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Create and save the message
    const message = new Message({ employeeId, productId, text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get a message by ID
router.get("/messages", async (req, res) => {
  try {
    const { employeeId } = req.query;
    // Validate input data
    if (!employeeId) {
      return res.status(400).json({ error: "Missing employeeId" });
    }
    // Query messages by employee ID
    const messages = await Message.find({ employeeId });
    if (!messages || messages.length === 0) {
      return res
        .status(404)
        .json({ error: "No messages found for the provided employeeId" });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to delete a message by ID
router.delete("/messages/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    // Validate input data
    if (!messageId) {
      return res.status(400).json({ error: "Missing messageId" });
    }
    // Delete message by ID
    await Message.findByIdAndDelete(messageId);
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/latestmessage", async (req, res) => {
  try {
    const { employeeId } = req.query;
    // Validate input data
    if (!employeeId) {
      return res.status(400).json({ error: "Missing employeeId" });
    }
    // Query the latest message by employee ID
    const latestMessage = await Message.findOne({ employeeId })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .exec(); // Execute the query
    if (!latestMessage) {
      return res
        .status(404)
        .json({ error: "No message found for the provided employeeId" });
    }
    res.status(200).json(latestMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
