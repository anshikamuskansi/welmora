// routes/products.js
//
// This file defines all the "doors" (API endpoints) that the frontend
// can knock on to work with products:
//   GET    /api/products        -> get list of all products
//   GET    /api/products/:id    -> get one product
//   POST   /api/products        -> add a new product (with image upload)
//   PUT    /api/products/:id    -> edit an existing product
//   DELETE /api/products/:id    -> remove a product

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");

// ---------- 1. Set up where uploaded images are stored ----------

const uploadDir = path.join(__dirname, "..", "uploads");

// Make sure the "uploads" folder exists (create it if it doesn't)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Example result: 1699999999999-protein-bar.jpg
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  },
});

// Only allow image files, max size 5MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png and .webp image files are allowed"));
    }
  },
});

// ---------- 2. Simple admin-password check ----------
// This is a very basic protection so random visitors can't add/delete
// products. It checks a password sent from the admin form against the
// one stored in your .env file.

function checkAdminPassword(req, res, next) {
  const passwordFromForm = req.body.adminPassword || req.headers["x-admin-password"];
  if (passwordFromForm !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Incorrect admin password" });
  }
  next();
}

// ---------- 3. Routes ----------

// GET all products (anyone can view the catalog)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch products", error: err.message });
  }
});

// GET a single product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch product", error: err.message });
  }
});

// POST - add a new product (image + details)
// "image" must match the field name used in the frontend form
router.post("/", upload.single("image"), checkAdminPassword, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      unit: req.body.unit,
      minOrderQty: req.body.minOrderQty,
      stock: req.body.stock,
      imageUrl: "/uploads/" + req.file.filename,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: "Could not add product", error: err.message });
  }
});

// PUT - edit an existing product (image optional on edit)
router.put("/:id", upload.single("image"), checkAdminPassword, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = req.body.name ?? product.name;
    product.category = req.body.category ?? product.category;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.unit = req.body.unit ?? product.unit;
    product.minOrderQty = req.body.minOrderQty ?? product.minOrderQty;
    product.stock = req.body.stock ?? product.stock;

    // If a new image was uploaded, replace the old one
    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", product.imageUrl);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      product.imageUrl = "/uploads/" + req.file.filename;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: "Could not update product", error: err.message });
  }
});

// DELETE a product
router.delete("/:id", checkAdminPassword, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete the image file too, so uploads folder doesn't fill up
    const imagePath = path.join(__dirname, "..", product.imageUrl);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete product", error: err.message });
  }
});

module.exports = router;
