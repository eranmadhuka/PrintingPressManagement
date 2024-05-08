const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const { upload } = require("../middleware/uploadMiddleware.js");
const requireAuth = require("../middleware/requireAuth.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { fileURLToPath } = require("url");
const { dirname } = require("path");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.KEY, { expiresIn: "90d" });
};

const router = express.Router();

router.get("/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join("G:/images", imageName); // Construct absolute path to the image
    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send("Image not found");
        } else {
            res.sendFile(imagePath);
        }
    });
});

router.post("/upload/:email", (req, res) => {
    upload.single("profileImage")(req, res, async (err) => {
        if (err) {
            // Multer error occurred
            console.error("Error uploading image:", err);
            return res
                .status(400)
                .json({ success: false, message: "Upload failed", error: err.message });
        }
        // No Multer error, handle file upload success
        try {
            const profileImage = req.file;
            console.log(profileImage.originalname);

            const user = await User.findOneAndUpdate(
                { email: req.params.email },
                { filename: profileImage.originalname },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Image uploaded successfully.",
                imagePath: profileImage.path,
                user: user,
            });
        } catch (error) {
            console.error("Error handling file upload:", error);
            res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    });
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User is not registered" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "Password is incorrect" });
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

router.delete("/deletenotification/:email", async (req, res) => {
    const userEmail = req.params.email;
    const notificationContent = req.body.notificationContent;

    try {
        // Find the user by email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove the notification from the notification array
        user.notification = user.notification.filter(
            (notification) => notification !== notificationContent
        );

        // Save the updated user document
        await user.save();

        res.json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Failed to delete notification:", error);
        res.status(500).json({ error: "Failed to delete notification" });
    }
});

router.delete("/handledeleteaccount/:email", (req, res) => {
    const email = req.params.email;
    User.findOneAndDelete({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch((err) =>
            res.status(500).json({ message: "Failed to delete user", error: err })
        );
});

router.post("/register", async (req, res) => {
    try {
        let { username, email, phone, password, role } = req.body;

        // Trim input fields to remove leading/trailing white spaces
        username = username.trim();
        email = email.trim();
        phone = phone.trim();
        password = password.trim();

        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Set role based on email (if it starts with "print", assign admin role)
        if (email.toLowerCase().startsWith("print")) {
            role = "admin";
        } else {
            role = "user";
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            phone,
            password: hashpassword,
            role: role, // Assigning role here
        });

        await newUser.save();
        const token = createToken(newUser._id); // Generating token after user creation
        console.log("Token:", token); // Logging the token
        return res
            .status(200)
            .json({
                username,
                email,
                phone,
                role,
                token,
                message: "Record registered",
            });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
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

    if (!password) {
        return res.status(400).json({ message: "password is required" });
    }

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

router.get("/handlecustomer", async (req, res) => {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
});

router.post("/sendfeedback/:email", async (req, res) => {
    const { notification } = req.body;

    if (!notification) {
        return res.status(400).json({ message: "notification is required" });
    }

    const email = req.params.email;

    try {
        // Find the user by email
        const user = await User.findOneAndUpdate(
            { email: email },
            { $push: { notification: notification } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Failed to update feedback:", error);
        res.status(500).json({ error: "Failed to update feedback" });
    }
});

router.use(requireAuth);

router.get("/customer", async (req, res) => {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
});

router.get("/customer/:email", async (req, res) => {
    const userEmail = req.params.email; // Extract the email from request parameters

    try {
        const user = await User.findOne({ email: userEmail }); // Find the user by email
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user); // Send user data as response
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Failed to fetch user data" });
    }
});

// Get user by ID
router.get("/customer/:id", async (req, res) => {
    const userId = req.params.id; // Extract the user ID from request parameters

    try {
        const user = await User.findById(userId); // Find the user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user); // Send user data as response
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Failed to fetch user data" });
    }
});


router.put("/users/:email", async (req, res) => {
    const userEmail = req.params.email;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail }, // Query condition to find the document by email
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
            },
            { new: true } // Set to true to return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser); // Send the updated user data as response
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Failed to update user data" });
    }
});

router.delete("/deleteacc/:email", (req, res) => {
    const email = req.params.email;
    User.findOneAndDelete({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch((err) =>
            res.status(500).json({ message: "Failed to delete user", error: err })
        );
});

// Express Route for submitting user feedback
router.post("/feedbacks/:email", async (req, res) => {
    const { feedback } = req.body;

    if (!feedback) {
        return res.status(400).json({ message: "feedback is required" });
    }

    const email = req.params.email; // Use req.params to get the email parameter from the URL

    try {
        // Find the user by email
        const user = await User.findOneAndUpdate(
            { email: email }, // Filter by email
            { feedback: feedback, date: new Date() },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Failed to update feedback:", error);
        res.status(500).json({ error: "Failed to update feedback" });
    }
});

router.post("/changepassword/:email", async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const email = req.params.email;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the current password is correct
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedPassword;
        await user.save();

        // Send success response
        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Failed to change password:", error);
        res.status(500).json({ error: "Failed to change password" });
    }
});

module.exports = router;
