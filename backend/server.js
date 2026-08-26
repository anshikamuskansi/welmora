

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const productRoutes = require("./routes/products");
// const authRoutes = require("./routes/auth");
// const contactRoutes = require("./routes/contact");

// const app = express();

// // ---------- CORS ----------
// app.use(cors({
//     origin: [
//         "http://localhost:5500",
//         "http://127.0.0.1:5500",
//         "https://welmora.vercel.app"
//     ]
// }));

// // ---------- Middleware ----------
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ---------- Uploaded Images ----------
// app.use(
//     "/uploads",
//     express.static(path.join(__dirname, "uploads"))
// );

// // ---------- Frontend ----------
// app.use(
//     express.static(path.join(__dirname, "..", "frontend"))
// );

// // ---------- API Routes ----------
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/contact", contactRoutes);

// // ---------- Home Page ----------
// app.get("/", (req, res) => {
//     res.sendFile(
//         path.join(__dirname, "..", "frontend", "index.html")
//     );
// });

// // ---------- Error Handler ----------
// app.use((err, req, res, next) => {
//     console.error("❌ Server error:", err.message);

//     res.status(500).json({
//         message: err.message || "Something went wrong on the server."
//     });
// });

// // ---------- MongoDB ----------
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("✅ Connected to MongoDB");
//     })
//     .catch((err) => {
//         console.error("❌ MongoDB connection error:", err.message);
//     });

// // ---------- Start Server ----------
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });
// server.js
//
// Main backend server.
// Connects to MongoDB, sets up API routes,
// serves uploaded images, and serves the frontend.

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

const app = express();

// ---------- CORS ----------
app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:5000",
        "https://welmora.vercel.app"
    ]
}));

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Uploaded Images ----------
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// ---------- Frontend ----------
app.use(
    express.static(path.join(__dirname, "..", "frontend"))
);

// ---------- MongoDB connection (cached for serverless) ----------
// On Vercel, this file can be re-run on every request instead of once.
// Without caching, that opens a brand new MongoDB connection every
// time - which quickly exhausts Atlas's connection limit and causes
// exactly the "Could not connect to any servers" error after a few
// requests. This caches the connection across invocations instead.

let cached = global._mongooseConnection;
if (!cached) {
    cached = global._mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_URI, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 10000,
            })
            .then((mongooseInstance) => {
                console.log("✅ Connected to MongoDB");
                return mongooseInstance;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// Make sure the database is connected before any /api route runs
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        res.status(500).json({ message: "Could not connect to the database." });
    }
});

// ---------- API Routes ----------
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ---------- Home Page ----------
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "frontend", "index.html")
    );
});

// ---------- Error Handler ----------
app.use((err, req, res, next) => {
    console.error("❌ Server error:", err.message);
    res.status(500).json({
        message: err.message || "Something went wrong on the server."
    });
});

// ---------- Start Server ----------
// Only run app.listen() when developing locally (npm start).
// On Vercel, the app is exported instead and Vercel runs it for us.
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

module.exports = app;