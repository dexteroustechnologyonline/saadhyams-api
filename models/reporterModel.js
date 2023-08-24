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
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "email already exist"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
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
  district: {
    type: String,
    trim: true,
  },
  mandal: {
    type: String,
    trim: true,
  },
  kycdocumentImage: [
    {
      type: String,
    },
  ],
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dh1fsseho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669977353/Avatar/avatar2_z6yynb.jpg",
  },

  role: {
    type: String,
    default: "reporter",
  },

  reporterStatus: {
    type: String,
    default: "1",
  },
  reporterStatusText: {
    type: String,
    default: "Not Approve",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reporterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
reporterSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

reporterSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Reporter", reporterSchema);
