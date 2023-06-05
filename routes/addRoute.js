const express = require("express");
const {
  createadd,
  getAllAdd,
  DeleteAdd,
  UploadbigBanner,
  UploadLongBanner,
  UploadSmallBanner,
} = require("../controllers/addController");

const router = express.Router();

router.route("/new").post(createadd);
router.route("/all").get(getAllAdd);
router.route("/bigBanner").post(UploadbigBanner);
router.route("/LongBanner").post(UploadLongBanner);
router.route("/SmallBanner").post(UploadSmallBanner);
router.route("/adddelete/:id").delete(DeleteAdd);

module.exports = router;
