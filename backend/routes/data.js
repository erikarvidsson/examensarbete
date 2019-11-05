const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date() + file.originalname);
  }
});
const upload = multer({ storage: storage });

let Data = require("../models/data.models");

router.route("/").get((req, res) => {
  Data.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userName = req.body.userName;
  const adress = req.body.adress;
  const description = req.body.description;
  const img = Date() + req.body.img;
  const lastDate = Date.parse(req.body.lastDate);
  console.log(req.body);

  const newData = new Data({
    userName,
    adress,
    description,
    img,
    lastDate
  });

  newData
    .save()
    .then(() => res.json("Data added!"))
    .catch(err => res.status(400).json("Error: " + err + console.log(newData)));
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

// router.route('/:id').get((req, res) => {
//   Data.findById(req.params.id)
//   .then(data => res.json(data))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Data.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Data deleted'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Data.findById(req.params.id)
//     .then(data => {
//       data.adress = req.body.username;
//       data.description = req.body.description;
//       data.date = Date.parse(req.body.lastDate);

//       data.save()
//         .then(() => res.json('Data updated'))
//         .catch(err => res.status(400).json('Eroor: ' + err))
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
