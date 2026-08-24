// models/Contact.js
//
// Describes one inquiry submitted from the Contact page form.
// These are just saved to the database for your team to review —
// this project does not send emails automatically (see README).

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    business: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
