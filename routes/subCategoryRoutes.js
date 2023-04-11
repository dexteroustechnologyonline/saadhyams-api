const express = require("express");
const {
  createSubCategory,
  getAllSubCategory,
  DeleteSubCategory,
  getsubCategorybyId,
  UpdateSubCategory,
  SlugUrlExist,
  UploadImage
} = require("../controllers/subCategoryController");

const router = express.Router();

router.route("/new").post(createSubCategory);
router.route("/all").get(getAllSubCategory);
router.route("/slugurl/:slugurl").get(SlugUrlExist);
router.route("/thumbnail").post(UploadImage);
router.route("/subcatbyid/:catid").get(getsubCategorybyId);
router.route("/subcatupdate/:id").put(UpdateSubCategory);
router.route("/subcatdelete/:id").delete(DeleteSubCategory);

module.exports = router;
