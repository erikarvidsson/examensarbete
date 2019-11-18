var nodemailer = require("nodemailer");

let EmailService = require("../models/email.service.models.js");
require("dotenv").config();

console.log(EmailService);

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
  suject: "",
  text: `Hi Erik you are the best` 
};

transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error)
  } else{
    console.log('Email sent to: ' + info.response)
  }
})