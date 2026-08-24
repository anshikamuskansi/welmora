// routes/auth.js
//
// Handles the Login and Register pages:
//   POST /api/auth/register  -> create a new wholesale account
//   POST /api/auth/login     -> check email + password, return a token
//   GET  /api/auth/me        -> check if a token is still valid
//
// HOW LOGIN TOKENS WORK (in plain terms):
// When someone logs in successfully, the server creates a "token" —
// like a temporary digital wristband — and sends it back. The
// frontend saves that token in the browser and includes it on future
// requests to prove "yes, I already signed in." Tokens expire after
// 7 days, at which point the person needs to log in again.

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "please-set-a-real-secret-in-env";

// ---------- Register ----------
router.post("/register", async (req, res) => {
  try {
    const { businessName, name, phone, email, password, businessType, gstin } = req.body;

    if (!businessName || !name || !phone || !email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    // Turn the password into a secure, one-way scrambled hash.
    // "10" below is the amount of scrambling work — a good default.
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      businessName,
      name,
      phone,
      email,
      passwordHash,
      businessType,
      gstin,
    });

    res.status(201).json({
      message: "Account created. A team member will review your business details shortly.",
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Could not create account", error: err.message });
  }
});

// ---------- Login ----------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Signed in successfully.",
      token,
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Could not sign in", error: err.message });
  }
});

// ---------- Check if a saved token is still valid ----------
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Not signed in" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Account no longer exists" });

    res.json({ user: publicUser(user) });
  } catch (err) {
    res.status(401).json({ message: "Session expired, please sign in again" });
  }
});

// Strips out the password hash before sending user data back to the browser
function publicUser(user) {
  return {
    id: user._id,
    businessName: user.businessName,
    name: user.name,
    email: user.email,
    businessType: user.businessType,
    status: user.status,
  };
}

module.exports = router;
