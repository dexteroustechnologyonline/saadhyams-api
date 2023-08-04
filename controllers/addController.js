const Add = require("../models/addModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createadd = catchAsyncErrors(async (req, res, next) => {
  try {
    const add = await Add.create(req.body);
    res.status(201).json({
      success: true,
      add,
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

exports.getAllAdd = catchAsyncErrors(async (req, res) => {
  try {
    const adds = await Add.find();
    res.status(200).json({
      success: true,
      adds: adds,
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

exports.DeleteAdd = catchAsyncErrors(async (req, res, next) => {
  try {
    let add = await Add.findById(req.params.id);
    if (!add) {
      return res.status(500).json({
        success: false,
        message: "add not found",
      });
    }
    await add.remove();
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

exports.UploadbigBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const bigBanner = await cloudinary.v2.uploader.upload(req.body.bigBanner, {
      folder: "Add/BigBanner",
      // width: 1110,
      // height: 180,
      crop: "scale",
    });
    const bigBanners = bigBanner.secure_url;
    res.status(200).json({
      success: true,
      bigBanners,
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
exports.UploadLongBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const LongBanner = await cloudinary.v2.uploader.upload(
      req.body.LongBanner,
      {
        folder: "Add/LongBanner",
        // width: 729,
        // height: 90,
        crop: "scale",
      }
    );
    const LongBanners = LongBanner.secure_url;
    res.status(200).json({
      success: true,
      LongBanners,
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
exports.UploadSmallBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const SmallBanner = await cloudinary.v2.uploader.upload(
      req.body.SmallBanner,
      {
        folder: "Add/SmallBanner",
        // width: 330,
        // height: 250,
        crop: "scale",
      }
    );
    const SmallBanners = SmallBanner.secure_url;
    res.status(200).json({
      success: true,
      SmallBanners,
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
