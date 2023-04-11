const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const newsSchema = mongoose.Schema({
  newsTitle: {
    type: String,
    required: [true, "Please enter newsTitle name"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  newsContent: {
    type: String,
    required: [true, "Please enter  newsContent"],
  },
  newsMainContent: {
    type: String,
    default: "",
  },
  newsVideoLink: [
    {
      type: String,
      default: "",
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter Category Name name"],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Require"],
    ref: "Category",
  },
  subCategory: {
    type: String,
    required: [true, "Please enter subCategory name"],
  },
  subCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Require"],
    ref: "Subcategory",
  },

  categoryTag: {
    type: String,
    default: "",
  },
  universatTag: {
    type: String,
    default: "",
  },
  slider: [
    {
      type: String,
    },
  ],
  thumbnail: {
    type: String,
  },
  icon: {
    type: String,
  },
  reporterId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "reporterId Require"],
    ref: "Reporter",
  },
  reporterName: {
    type: String,
    required: [true, "Please enter  name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide mobile"],
    trim: true,
  },

  mobile: {
    type: String,
    required: [true, "Please provide mobile"],
    trim: true,
  },

  newsAprovelText: {
    type: String,
    default: "Pending",
  },
  newsAprovelStatus: {
    type: Boolean,
    default: false,
  },

  review: [
    {
      userName: {
        type: String,
      },
      userEmail: {
        type: String,
      },
      newsComment: {
        type: String,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", newsSchema);
