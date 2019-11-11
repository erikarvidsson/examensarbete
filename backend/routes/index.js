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

let Index = require("../models/index.models");

router.route("/").get((req, res) => {
  Index.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const header = req.body.adress;
  const description = req.body.description;
  console.log(req.body);

  const newIndex = new Index({
    userId,
    header,
    description,
  });

  newIndex
    .save()
    .then(() => res.json("Data added!"))
    .catch(err =>
      res.status(400).json("Error: " + err + console.log(newIndex))
    );
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

router.route("/fetchImage/:file").get((req, res) => {
  let file = req.params.file;
  let fileLocation = path.join("../uploads/", file);
  res.send({ image: fileLocation });
  res.sendFile(`${fileLocation}`);
});

router.route("/update/:id").post((req, res) => {
  Index.findById(req.params.id)
    .then(data => {
      data.userId = req.body.userId;
      data.userName = req.body.userName;
      data.adress = req.body.adress;
      data.description = req.body.description;
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
