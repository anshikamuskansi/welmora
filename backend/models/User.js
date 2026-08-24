// models/User.js
//
// Describes a customer account (from the Login / Register pages).
// Passwords are NEVER stored as plain text — only a scrambled
// "hash" of the password is saved (see routes/auth.js), so even
// if someone saw the database, they couldn't read anyone's password.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Your name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      enum: ["Pharmacy", "Gym / Fitness studio", "Clinic", "Retail chain", "Other"],
      default: "Other",
    },
    gstin: {
      type: String,
      default: "",
    },
    // New wholesale signups start as "pending" so an admin can approve
    // them before wholesale pricing/ordering is unlocked. This project
    // doesn't build the approval screen yet — see README for next steps.
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
