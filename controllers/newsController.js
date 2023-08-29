const News = require("../models/newsModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.newsCreate = catchAsyncErrors(async (req, res, next) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json({
      success: true,
      news,
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
    let news = await News.findOne({ slugUrl: req.params.slugurl });

    if (!news) {
      return res.status(500).json({
        success: false,
        message: "new news SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " category SlugUrl already exist",
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
    const slider = await cloudinary.v2.uploader.upload(req.body.slider, {
      folder: "News/Slider",
      // width: 850,
      // height: 565,
      crop: "scale",
    });
    const sliders = slider.secure_url;

    const thumbnail = await cloudinary.v2.uploader.upload(req.body.slider, {
      folder: "News/Thumbnail",
      width: 360,
      height: 239,
      crop: "scale",
    });
    const thumbnails = thumbnail.secure_url;

    const icon = await cloudinary.v2.uploader.upload(req.body.slider, {
      folder: "News/Icon",
      width: 100,
      height: 75,
      crop: "scale",
    });
    const icons = icon.secure_url;

    res.status(200).json({
      success: true,
      sliders,
      thumbnails,
      icons,
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

exports.newsCommentPost = catchAsyncErrors(async (req, res, next) => {
  try {
    let news = await News.findById(req.body.newsId);
    if (!news) {
      return res.status(200).json({
        success: false,
        message: "news not found",
      });
    }

    news.review = [req.body, ...news.review];

    news = await News.findByIdAndUpdate(req.body.newsId, news, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      news: news,
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

exports.getAllNews = catchAsyncErrors(async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      success: true,
      news: news,
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

exports.getNewsByReporterId = catchAsyncErrors(async (req, res, next) => {
  try {
    let news = await News.find({ reporterId: req.params.id });

    if (!news) {
      return res.status(500).json({
        success: false,
        message: "news not found",
      });
    }
    return res.status(200).json({
      success: true,
      news,
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

exports.getFindByNewsId = catchAsyncErrors(async (req, res, next) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(500).json({
        success: false,
        message: "news not found",
      });
    }
    return res.status(200).json({
      success: true,
      news,
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

exports.DeleteNews = catchAsyncErrors(async (req, res, next) => {
  try {
    let news = await News.findById(req.params.id);
    if (!news) {
      return res.status(500).json({
        success: false,
        message: "news not found",
      });
    }
    await news.remove();
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

exports.UpdateNews = catchAsyncErrors(async (req, res, next) => {
  try {
    let news = await News.findById(req.params.id);
    if (!news) {
      return res.status(500).json({
        success: false,
        message: "news not found",
      });
    }
    news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      news: news,
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
