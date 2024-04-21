const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const LPSModel = require("./models/Financial");
const { userrouter } = require("./routes/financialRoutes.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", userrouter);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Import routes
// const customerRoutes = require('./routes/customerRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// const financialRoutes = require('./routes/financialRoutes');
// const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require("./routes/orderRoutes");
// const productRoutes = require('./routes/productRoutes');
// const supplierRoutes = require('./routes/supplierRoutes');
// const transportRoutes = require('./routes/transportRoutes');

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/printingPress", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/createLPSEntry", (req, res) => {
  LPSModel.create(req.body)
    .then((details) => res.json(details))
    .catch((err) => res.json(err));
});
app.get("/getdetails", async (req, res) => {
  try {
    const users = await LPSModel.find({});
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.get("/getdetails/:id", async (req, res) => {
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

app.delete("/deleteaccount/:id", (req, res) => {
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

app.put("/updateUser/:id", (req, res) => {
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

// mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

// Routes
// app.use('/customers', customerRoutes);
// app.use('/employees', employeeRoutes);
// app.use('/financial', financialRoutes);
// app.use('/inventory', inventoryRoutes);
app.use("/order", orderRoutes);
// app.use('/product', productRoutes);
// app.use('/supplier', supplierRoutes);
// app.use('/transport', transportRoutes);

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});
