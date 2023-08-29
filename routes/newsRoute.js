const express = require("express");
const {
  newsCreate,
  SlugUrlExist,
  UploadImage,
  getAllNews,
  getNewsByReporterId,
  UpdateNews,
  newsCommentPost,
  DeleteNews,
  getFindByNewsId
} = require("../controllers/newsController");

const router = express.Router();

router.route("/new").post(newsCreate);
router.route("/all").get(getAllNews);
router.route("/newsslugurl/:slugurl").get(SlugUrlExist);
router.route("/newsimage").post(UploadImage);
router.route("/newscomment").put(newsCommentPost);
router.route("/reporterid/:id").get(getNewsByReporterId);
router.route("/findbyid/:id").get(getFindByNewsId);
router.route("/newsupdate/:id").put(UpdateNews);
router.route("/newsdelete/:id").delete(DeleteNews);

module.exports = router;
