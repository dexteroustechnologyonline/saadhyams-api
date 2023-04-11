const express = require("express");
const {
  createCategoryTag,
  getAllCategoryTag,
  SlugUrlExist,
  UpdateCategoryTag,
  UploadImage
} = require("../controllers/categoryTagController");

const router = express.Router();

router.route("/new").post(createCategoryTag);
router.route("/all").get(getAllCategoryTag);
router.route("/cattagslugurl/:slugurl").get(SlugUrlExist);
router.route("/thumbnail").post(UploadImage);
router.route("/updatecattag/:id").put(UpdateCategoryTag);

module.exports = router;
