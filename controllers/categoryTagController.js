const Categorytag = require("../models/categoryTagsModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createCategoryTag = catchAsyncErrors(async (req, res, next) => {
  try {
    const categorytag = await Categorytag.create(req.body);
    res.status(201).json({
      success: true,
      categorytag,
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

exports.getAllCategoryTag = catchAsyncErrors(async (req, res) => {
  try {
    const categorytags = await Categorytag.find();
    res.status(200).json({
      success: true,
      categorytags,
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

exports.SlugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.findOne({
      slugUrl: req.params.slugurl,
    });

    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "new categorytag SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " categorytag SlugUrl already exist",
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

exports.UpdateCategoryTag = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.findById(req.params.id);
    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "categorytag not found",
      });
    }
    categorytag = await Categorytag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      categorytag: categorytag,
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

exports.DeleteCategoryTag = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.findById(req.params.id);
    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "categorytag not found",
      });
    }
    await categorytag.remove();
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

exports.UploadImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "CategoryTag/Thumbnail",
      width: 400,
      height: 400,
      crop: "scale",
    });
    const thumbnails = thumbnail.secure_url;
    res.status(200).json({
      success: true,
      thumbnails,
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
