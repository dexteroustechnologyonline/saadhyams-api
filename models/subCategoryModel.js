const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Sub Category name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
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
  thumbnail: {
    type: String,
    // required: [true, "Please provide thumbnail"],
    default:
      "https://res.cloudinary.com/dfoquniuy/image/upload/v1680860262/SubCategory/Thumbnail/ajexlzjwxbdtamoi4ysg.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subcategory", subCategorySchema);
