const express = require("express");
const {
  createCategory,
  getAllCategory,
  SlugUrlExist,
  UpdateCategory,
  DeleteCategory,
  UploadImage,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/new").post(createCategory);
router.route("/all").get(getAllCategory);
router.route("/catslugurl/:slugurl").get(SlugUrlExist);
router.route("/thumbnail").post(UploadImage);
router.route("/catupdate/:id").put(UpdateCategory);
router.route("/catdelete/:id").delete(DeleteCategory);

module.exports = router;
