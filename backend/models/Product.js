// // models/Product.js
// //
// // This file describes the "shape" of a product in the database.
// // Think of it like a form template: every product saved to MongoDB
// // must follow this structure.

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: [true, "Category is required"],
//       enum: ["Menstrual Care", "Nutrition", "Hormonal Health", "Pain Relief", "Other"],
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: 0,
//     },
//     unit: {
//       type: String,
//       default: "per unit", // e.g. "per box of 12", "per 500g pack"
//     },
//     minOrderQty: {
//       type: Number,
//       default: 1, // B2B buyers often need to order in bulk
//     },
//     stock: {
//       type: Number,
//       default: 0,
//     },
//     imageUrl: {
//       type: String, // path to the uploaded image, e.g. /uploads/xyz.jpg
//       required: [true, "Product image is required"],
//     },
//   },
//   {
//     timestamps: true, // automatically adds createdAt and updatedAt
//   }
// );

// module.exports = mongoose.model("Product", productSchema);
// models/Product.js
//
// This file describes the "shape" of a product in the database.
// Think of it like a form template: every product saved to MongoDB
// must follow this structure.

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Menstrual Care", "Nutrition", "Hormonal Health", "Pain Relief", "Other"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      default: "per unit", // e.g. "per box of 12", "per 500g pack"
    },
    minOrderQty: {
      type: Number,
      default: 1, // B2B buyers often need to order in bulk
    },
    stock: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String, // path to the uploaded image, e.g. /uploads/xyz.jpg
      required: [true, "Product image is required"],
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);