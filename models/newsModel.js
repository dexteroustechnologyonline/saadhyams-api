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
  newsVideoYouTubeLink: {
    type: String,
    default: "",
  },
  newsVideoTwitterLink: {
    type: String,
    default: "",
  },
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
  sliderShow: {
    type: Boolean,
    default: false,
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
  numberofViews: {
    type: Number,
    default: 0,
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
      avatar: {
        type: String,
        default:
          "https://res.cloudinary.com/dh1fsseho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669977353/Avatar/avatar2_z6yynb.jpg",
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", newsSchema);
