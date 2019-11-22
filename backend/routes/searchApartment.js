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

let SApt = require("../models/searchApartment.models");

router.route("/").get((req, res) => {
  SApt.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const dataId = req.body.dataId;
  console.log(req.body);

  const newSApt = new SApt({
    userId,
    dataId
  });

  newSApt
    .save()
    .then(() => res.json("Data added!"))
    .catch(err => res.status(400).json("Error: " + err + console.log(newData)));
});


router.route("/:dataId").get((req, res) => {
  SApt.findOne({dataId: req.params.dataId})
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:dataId").delete((req, res) => {
  SApt.deleteOne({ dataId: req.params.dataId })
    .then(() => res.json("Data deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;
