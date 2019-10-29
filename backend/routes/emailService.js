const router = require("express").Router();
let EmailService = require("../models/email.service.models.js");
var nodemailer = require("nodemailer");
require("dotenv").config();

router.route("/").get((req, res) => {
  EmailService.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const adress = req.body.adress;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newEmailService = new EmailService({
    name,
    email,
    adress,
    description,
    date
  });

  newEmailService
    .save()
    .then(() => res.json("Data added!"))
    .catch(err =>
      res.status(400).json("Error: " + err + console.log(newEmailService))
    );

  const info = `${newEmailService}`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS
    }
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Test",
    text: info
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to: " + info.response);
    }
  });
});

// router.route("/add").post((req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const adress = req.body.adress;
//   const description = req.body.description;
//   const date = Date.parse(req.body.date);

//   const newEmailService = new EmailService({
//     name,
//     email,
//     adress,
//     description,
//     date
//   });
//   console.log(newEmailService);

//   const info = `${newEmailService}`

//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAILPASS
//     }
//   });

//   var mailOptions = {
//     from: process.env.EMAIL,
//     to: process.env.EMAIL,
//     subject: "Test",
//     text: info
//   };

//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent to: " + info.response);
//     }
//   });
// });

// router.route("/").get((req, res) => {
//   Data.findById(req.params.id)
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/:id").delete((req, res) => {
//   Data.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Data deleted"))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/update/:id").post((req, res) => {
//   Data.findById(req.params.id)
//     .then(data => {
//       data.adress = req.body.username;
//       data.description = req.body.description;
//       data.date = Date.parse(req.body.lastDate);

//       data
//         .save()
//         .then(() => res.json("Data updated"))
//         .catch(err => res.status(400).json("Eroor: " + err));
//     })
//     .catch(err => res.status(400).json("Error: " + err));
// });

module.exports = router;
