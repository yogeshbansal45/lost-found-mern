console.log("Auth routes loaded");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ msg: "Email already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ msg: "User Registered Successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "Invalid credentials" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ msg: "Invalid credentials" });
        }

        // generate token
        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ msg: "Error" });
    }
});

module.exports = router;