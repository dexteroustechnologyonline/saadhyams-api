const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const reporterSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter  firstname"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please enter  lastname"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "email already exist"],
    trim: true,
  },

  mobile: {
    type: String,
    required: [true, "Please provide mobile"],
    unique: [true, "password already exist"],
    trim: true,
  },
  kycdocument: {
    type: String,
    required: [true, "Please provide kycdocument"],
    unique: [true, "kycdocument already exist"],
    trim: true,
  },
  kycdocumentImage: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dh1fsseho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669977353/Avatar/avatar2_z6yynb.jpg",
  },

  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reporter", reporterSchema);
