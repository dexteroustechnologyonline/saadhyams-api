const express = require("express");
const {
  createUser,
  loginUserwithpassword,
  mobileExist,
  emailExist,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/loginwithpassword").post(loginUserwithpassword);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);

module.exports = router;
