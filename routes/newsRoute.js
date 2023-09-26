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
<<<<<<< HEAD
  getFindByNewsId,
  getFindByNewsurl,
  UpdateNewsVisit
  
=======
  getFindByNewsId
>>>>>>> 561734db211535f922634aebe1ae65ebdc6db5f2
} = require("../controllers/newsController");

const router = express.Router();

router.route("/new").post(newsCreate);
router.route("/all").get(getAllNews);
router.route("/newsslugurl/:slugurl").get(SlugUrlExist);
router.route("/newsimage").post(UploadImage);
router.route("/newscomment").put(newsCommentPost);
router.route("/reporterid/:id").get(getNewsByReporterId);
router.route("/findbyid/:id").get(getFindByNewsId);
<<<<<<< HEAD
router.route("/findbyurl/:url").get(getFindByNewsurl);
=======
>>>>>>> 561734db211535f922634aebe1ae65ebdc6db5f2
router.route("/newsupdate/:id").put(UpdateNews);
router.route("/newsvisitupdate/:id").put(UpdateNewsVisit);
router.route("/newsdelete/:id").delete(DeleteNews);

module.exports = router;
