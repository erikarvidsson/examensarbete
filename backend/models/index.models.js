const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    header: { type: String, required: true },
    description: { type: String, required: false },
    img: { type: String, required: false },
    lastDate: { type: Date, required: false }
  },
  {
    timestamps: true
  }
);

const Index = mongoose.model("Index", userSchema);

module.exports = Index;
