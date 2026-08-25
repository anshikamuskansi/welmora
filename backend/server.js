// server.js
//
// This is the "main switch" that starts the whole backend.
// It connects to MongoDB, sets up the API, and serves the
// uploaded product images and the frontend website.

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

const app = express();

// ---------- Middleware ----------
app.use(cors()); // allows the frontend to talk to this backend
app.use(express.json()); // lets the server understand JSON requests
app.use(express.urlencoded({ extended: true })); // lets it understand form data

// Serve uploaded product images at: http://localhost:5000/uploads/filename.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve the frontend website (index.html, admin.html, css, js) directly
// from this same server, so the client only needs ONE server running.
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ---------- API routes ----------
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ---------- Catch-all error handler ----------
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ message: err.message || "Something went wrong on the server." });
});
// ---------- Connect to MongoDB ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ---------- Start the server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});