const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const multiparty = require("multiparty");

// var session = require("express-session");

const errorMiddleware = require("./middleware/error");

// const PORT = process.env.PORT || 4000;

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
  // app.use(express.static("super-admin/build"));
  // const path = require("path");
  // app.get("*", (req, res) =>{
  //   res.sendFile(path.resolve(__dirname, 'super-admin', 'build', 'index.html'));
  // })
}

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10000kb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));
app.use(fileUpload({ useTempFiles: true }));


const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


//Rotes Imports

const admin = require("./routes/adminRoutes");
app.use("/api/v1/admin", admin);

const reporter = require("./routes/reportersRoutes");
app.use("/api/v1/reporter", reporter);

const user = require("./routes/userRoute");
app.use("/api/v1/user", user);

const category = require("./routes/categoryRoute");
app.use("/api/v1/category", category);

const subCategory = require("./routes/subCategoryRoutes");
app.use("/api/v1/subcategory", subCategory);

const universalTag = require("./routes/universalTagRoutes");
app.use("/api/v1/universaltag", universalTag);

const categoryTag = require("./routes/categoryTagRoutes");
app.use("/api/v1/categorytag", categoryTag);

const news = require("./routes/newsRoute");
app.use("/api/v1/news", news);

const adds = require("./routes/addRoute");
app.use("/api/v1/adds", adds);

app.use(errorMiddleware);

module.exports = app;
