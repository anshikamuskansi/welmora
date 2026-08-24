// routes/contact.js
//
// Handles the Contact page form:
//   POST /api/contact  -> anyone can submit an inquiry
//   GET  /api/contact   -> admin-only: view submitted inquiries
//                          (send the admin password as header
//                          x-admin-password, same as the products page)

const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

function checkAdminPassword(req, res, next) {
  const passwordFromHeader = req.headers["x-admin-password"];
  if (passwordFromHeader !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Incorrect admin password" });
  }
  next();
}

// ---------- Submit a new inquiry (public) ----------
router.post("/", async (req, res) => {
  try {
    const { name, business, email, message } = req.body;
    if (!name || !business || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const inquiry = await Contact.create({ name, business, email, message });
    res.status(201).json({ message: "Thanks! We'll get back to you within one business day.", inquiry });
  } catch (err) {
    res.status(500).json({ message: "Could not send your message", error: err.message });
  }
});

// ---------- View all inquiries (admin only) ----------
router.get("/", checkAdminPassword, async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: "Could not load inquiries", error: err.message });
  }
});

module.exports = router;
