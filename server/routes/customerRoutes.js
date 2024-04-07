import express, { application } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.KEY, { expiresIn: "3d" });
};

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists" });
    }
    const token = createToken(user._id);
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phone,
      password: hashpassword,
    });
    await newUser.save();
    res.status(200).json({ email, token });
    return res.json({ message: "Record registered" });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/customer", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Route to fetch a specific user by ID
router.get("/customer/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(
    { _id: id },
    {
      firstName: req.body.firstname,
      lastName: req.body.firstname,
      userName: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.ohoneNumber,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.delete("/deleteaccount/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not registered" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Password is incorrect" });
    }
    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Login successfully" });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sajithprawanthafernando@gmail.com",
        pass: "jdnw qzvx hzxj sszp",
      },
    });
    const mailOptions = {
      from: "sajithprawanthafernando@gmail.com",
      to: email,
      subject: "Reset password",
      text: `http://localhost:3000/resetpassword/${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json({ message: "invalid token" });
  }
});

const verifyuser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Assuming you're storing the token in a cookie
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    // If verification succeeds, proceed to the next middleware
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};

// Example route that requires authentication
router.get("/verify", verifyuser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

/*router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});*/

// Express Route for submitting user feedback
router.post(
  "/api/feedback",
  /*authenticateUserMiddleware*/ (req, res) => {
    const { feedback } = req.body;
    const userId = req.user._id;

    User.findByIdAndUpdate(userId, { feedback }, { new: true }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update feedback" });
      }
      res.json({ message: "Feedback submitted successfully" });
    });
  }
);

export { router as userrouter };
