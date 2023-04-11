const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
// const { sendUserToken } = require("../utils/jwtToken");

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
};

exports.loginUserwithpassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    const name = user.name;
    const mobile = user.mobile;
    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    res.status(201).json({
      success: true,
      name,
      mobile,
      email,
      user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});


exports.mobileExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ mobile: req.params.mobile });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "new Mobile",
      });
    }

    return res.status(200).json({
      success: true,
      message: " Mobile Number already exist",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.emailExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "new email",
      });
    }

    return res.status(200).json({
      success: true,
      message: " email already exist",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});