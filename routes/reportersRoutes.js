const express = require("express");
const {
  createReporter,
  loginReporter,
  mobileExist,
  emailExist,
  kycdocumentExist,getAllReporter
} = require("../controllers/reporterController");

const router = express.Router();

router.route("/register").post(createReporter);
router.route("/login").post(loginReporter);
router.route("/reporterall").get(getAllReporter);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);
router.route("/kycdocument/:kycdocument").get(kycdocumentExist);

module.exports = router;
