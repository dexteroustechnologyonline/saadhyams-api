const express = require("express");
const {
  newsCreate,
  SlugUrlExist,
  UploadImage,
  getAllNews,
  getNewsByReporterId,
  UpdateNews,
  newsCommentPost,
} = require("../controllers/newsController");

const router = express.Router();

router.route("/new").post(newsCreate);
router.route("/all").get(getAllNews);
router.route("/newsslugurl/:slugurl").get(SlugUrlExist);
router.route("/newsimage").post(UploadImage);
router.route("/newscomment").post(newsCommentPost);
router.route("/reporterid/:id").get(getNewsByReporterId);
router.route("/newsupdate/:id").put(UpdateNews);

module.exports = router;
