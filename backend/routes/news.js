const multer = require("multer");
const router = require("express").Router();
const nowDate = new Date();

var path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, (Date() + file.originalname).replace(/\s/g, ""));
  }
});
const upload = multer({ storage: storage });

let News = require("../models/news.models");

router.route("/").get((req, res) => {
  News.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const userName = req.body.userName;
  const title = req.body.title;
  const description = req.body.description;
  const information = req.body.information;
  const img = (Date() + req.body.img).replace(/\s/g, "");
  const lastDate = Date.parse(req.body.lastDate);
  console.log(req.body);

  const newNews = new News({
    userId,
    userName,
    title,
    description,
    information,
    img,
    lastDate
  });

  newNews
    .save()
    .then(() => res.json("News added!"))
    .catch(err => res.status(400).json("Error: " + err + console.log(newNews)));
});

router.route("/save").post(upload.single("img"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

router.route("/:id").get((req, res) => {
  News.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route('/:id').delete((req, res) => {
//   Data.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Data deleted'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/fetchImage/:file").get((req, res) => {
  let file = req.params.file;
  let fileLocation = path.join("../uploads/", file);
  res.send({ image: fileLocation });
  res.sendFile(`${fileLocation}`);
});

router.route("/update/:id").post((req, res) => {
  News.findById(req.params.id)
    .then(data => {
      data.userId = req.body.userId;
      data.userName = req.body.userName;
      data.title = req.body.title;
      data.description = req.body.description;
      data.information = req.body.information;
      data.img = (Date() + req.body.img).replace(/\s/g, "");
      data.lastDate = Date.parse(req.body.lastDate);

      data
        .save()
        .then(() => res.json("Data updated"))
        .catch(err => res.status(400).json("Eroor: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
