const mongoose = require("mongoose");

const addsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
  },
  bigBanner: {
    type: String,
    // required: [true, "Please provide bigBanner"],
  },
  LongBanner: {
    type: String,
    // required: [true, "Please provide LongBanner"],
  },
  SmallBanner: {
    type: String,
    // required: [true, "Please provide SmallBanner"],
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

module.exports = mongoose.model("Add", addsSchema);
