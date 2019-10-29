const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emailServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    adress: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
  }
);

const EmailService = mongoose.model("EmailService", emailServiceSchema);

module.exports = EmailService;
