const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Reporter = require("../models/reporterModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { log } = require("console");
const cloudinary = require("cloudinary");

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

exports.UploadImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const kycdocumentImage = await cloudinary.v2.uploader.upload(
      req.body.kycdocumentImage,
      {
        folder: "KycDocument/kycdocumentImage",
        // width: 600,
        // height: 400,
        crop: "scale",
      }
    );
    const kycdocumentImages = kycdocumentImage.secure_url;
    res.status(200).json({
      success: true,
      kycdocumentImages,
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

exports.UpdateReporter = catchAsyncErrors(async (req, res, next) => {
  try {
    let reporter = await Reporter.findById(req.params.id);
    if (!reporter) {
      return res.status(500).json({
        success: false,
        message: "reporter not found",
      });
    }
    reporter = await Reporter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      reporter: reporter,
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
