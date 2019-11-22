const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emailServiceSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    adress: { type: String },
    description: { type: String },
    date: { type: Date }
  }
);

const EmailService = mongoose.model("EmailService", emailServiceSchema);

module.exports = EmailService;
