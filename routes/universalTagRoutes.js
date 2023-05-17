const express = require("express");
const {
  createuniversalTag,
  getAllUniversalTag,
  SlugUrlExist,
  UpdateUniversalTag,
  UploadImage,
  DeleteUniversalTag,
} = require("../controllers/universaltagController");

const router = express.Router();

router.route("/new").post(createuniversalTag);
router.route("/all").get(getAllUniversalTag);
router.route("/univtagslugurl/:slugurl").get(SlugUrlExist);
router.route("/thumbnail").post(UploadImage);
router.route("/updateunitag/:id").put(UpdateUniversalTag);
router.route("/unitagdelete/:id").delete(DeleteUniversalTag);

module.exports = router;
