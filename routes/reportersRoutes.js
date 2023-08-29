const express = require("express");
const {
  createReporter,
  loginReporter,
  mobileExist,
  emailExist,
  kycdocumentExist,
  getAllReporter,
  UploadImage,
  UpdateReporter,
  Uploadavathar,
  loginReporterBypassword,
  DeleteReporter
} = require("../controllers/reporterController");

const router = express.Router();

router.route("/register").post(createReporter);
router.route("/login").post(loginReporter);
router.route("/loginbypassword").post(loginReporterBypassword);

router.route("/reporterall").get(getAllReporter);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/kycdocumentImage").post(UploadImage);
router.route("/avatharImage").post(Uploadavathar);
router.route("/email/:email").get(emailExist);
router.route("/kycdocument/:kycdocument").get(kycdocumentExist);
router.route("/reporterUpdate/:id").put(UpdateReporter);
router.route("/reporterDelete/:id").delete(DeleteReporter);

module.exports = router;
