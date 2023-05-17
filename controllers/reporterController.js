const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Reporter = require("../models/reporterModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.createReporter = async (req, res, next) => {
  try {
    const reporter = await Reporter.create(req.body);
    res.status(201).json({
      success: true,
      reporter,
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

exports.getAllReporter = catchAsyncErrors(async (req, res) => {
  try {
    const repertories = await Reporter.find();
    res.status(200).json({
      success: true,
      repertories: repertories,
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


exports.loginReporter = catchAsyncErrors(async (req, res, next) => {
  try {
    const reporter = await Reporter.findOne({ mobile: req.body.mobile });

    if (!reporter) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    const firstname = reporter.firstname;
    const lastname = reporter.lastname;
    const email = reporter.email;
    const mobile = reporter.mobile;
    const kycdocument = reporter.kycdocument;

    res.status(200).json({
      success: true,
        firstname,
        lastname,
        email,
        mobile,
        kycdocument,
        reporter,
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
    let reporter = await Reporter.findOne({ mobile: req.params.mobile });

    if (!reporter) {
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
    let reporter = await Reporter.findOne({ email: req.params.email });

    if (!reporter) {
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
exports.kycdocumentExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let reporter = await Reporter.findOne({
      kycdocument: req.params.kycdocument,
    });

    if (!reporter) {
      return res.status(500).json({
        success: false,
        message: "new kycdocument",
      });
    }

    return res.status(200).json({
      success: true,
      message: " kycdocument already exist",
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
