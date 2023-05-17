const Universaltag = require("../models/universalTagsModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createuniversalTag = catchAsyncErrors(async(req,res,next)=>{
    try{
     const universaltag = await Universaltag.create(req.body);
     res.status(201).json({
         success: true,
         universaltag,
       });
    }
    catch(error)
    {
     res.status(501).json({
         success: false,
         massage: error._message,
         error:error
       });
       res.status(400).json({
         success: false,
         massage: error._message,
         error:error
       });
       res.status(500).json({
         success: false,
         massage: error._message,
         error:error
       });
    }
 });
 
 exports.getAllUniversalTag = catchAsyncErrors (async(req,res)=>{
   try {
     const universaltags = await Universaltag.find()
     res.status(200).json({
       success: true,
       universaltags:universaltags
     });
   } catch (error) {
     res.status(501).json({
       success: false,
       massage: error._message,
       error:error
     });
     res.status(400).json({
       success: false,
       massage: error._message,
       error:error
     });
     res.status(500).json({
       success: false,
       massage: error._message,
       error:error
     });
   }
 });

 exports.SlugUrlExist = catchAsyncErrors(async (req, res, next) => {
    try {
      let universaltag = await Universaltag.findOne({ slugUrl: req.params.slugurl });
  
      if (!universaltag) {
        return res.status(500).json({
          success: false,
          message: "new universaltag SlugUrl",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: " universaltag SlugUrl already exist",
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

  exports.UpdateUniversalTag = catchAsyncErrors(async (req, res, next) => {
    try {
      let universaltag = await Universaltag.findById(req.params.id);
      if (!universaltag) {
        return res.status(500).json({
          success: false,
          message: "universaltag not found",
        });
      }
      universaltag = await Universaltag.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        universaltag:universaltag,
      });
    } catch (error) {
      res.status(501).json({
        success: false,
        massage: error._message,
        error:error
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error:error
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error:error
      });
    }
  });

  exports.DeleteUniversalTag = catchAsyncErrors(async (req, res, next) => {
    try {
      let universaltag = await Universaltag.findById(req.params.id);
      if (!universaltag) {
        return res.status(500).json({
          success: false,
          message: "universaltag not found",
        });
      }
      await universaltag.remove();
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
        folder: "UniversalTag/Thumbnail",
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
