const express = require("express");
const {
    createAdmin,mobileExist,emailExist,loginAdmin,loginAdminwithpassword
} = require("../controllers/adminController");

const router = express.Router();
router.route("/register").post(createAdmin);
router.route("/login").post(loginAdmin);
router.route("/loginwithpassword").post(loginAdminwithpassword);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);


module.exports = router;
