const express = require("express");

const { LPSModel } = require("./..//models/Financial");

const router = express.Router();

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
module.exports = { userrouter: router };
