const path = require("path");
const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.static("./public"));
app.use(cors({ origin: true }));
const port = 3003;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));
route(app);
// let fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });
// let upload = multer({
//   storage: fileStorage,
// });
// app.post("/api/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   let pathIamge = "http://localhost:" + port + req.file.path.slice(6);
//   pathIamge = pathIamge.replace("\\", "/");
//   res.json(pathIamge);
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
