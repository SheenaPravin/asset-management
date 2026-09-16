const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyJWT, getSecret } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name)
      return res.status(400).json({ message: "email, password, first_name, last_name are required" });
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "Email has already been taken." });
    const hash = await bcrypt.hash(password, 10);
    await new User({ email: email.toLowerCase(), password: hash, first_name, last_name }).save();
    res.json({ message: "Success" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUser = await User.findOne({ email: (email || "").toLowerCase() });
    if (!dbUser) return res.status(401).json({ message: "Invalid Email or Password" });
    const ok = await bcrypt.compare(password || "", dbUser.password);
    if (!ok) return res.status(401).json({ message: "Invalid Email or Password" });
    const payload = { id: dbUser._id, email: dbUser.email, first_name: dbUser.first_name, last_name: dbUser.last_name };
    const token = jwt.sign(payload, getSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || "30d" });
    res.json({ message: "Success", token: "Bearer " + token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/me", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, ...req.user });
});

module.exports = router;
