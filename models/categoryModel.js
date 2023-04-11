const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Category name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },

  thumbnail: {
    type: String,
    required: [true, "Please provide thumbnail"],
  },

  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
