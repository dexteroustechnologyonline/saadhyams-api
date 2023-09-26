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

// for Mobile and password
exports.loginReporterBypassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const reporter = await Reporter.findOne({ email }).select("+password");
    if (!reporter) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = await reporter.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
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

exports.Uploadavathar = catchAsyncErrors(async (req, res, next) => {
  try {
    const avatharImage = await cloudinary.v2.uploader.upload(
      req.body.avatharImage,
      {
        folder: "avatharImage/avatharImageImage",
        // width: 600,
        // height: 400,
        crop: "scale",
      }
    );
    const avatharImages = avatharImage.secure_url;
    res.status(200).json({
      success: true,
      avatharImages,
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

exports.UpdateReporterAll = catchAsyncErrors(async (req, res, next) => {
  try {
    const repertories = await Reporter.find();
    for (let index = 0; index < repertories.length; index++) {
      let reporter= repertories[index];
      reporter = await Reporter.findByIdAndUpdate(req.params.id, {password:"123456"}, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
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

exports.DeleteReporter = catchAsyncErrors(async (req, res, next) => {
  try {
    let reporter = await Reporter.findById(req.params.id);
    if (!reporter) {
      return res.status(500).json({
        success: false,
        message: "reporter not found",
      });
    }
    await reporter.remove();
    res.status(200).json({
      success: true,
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
