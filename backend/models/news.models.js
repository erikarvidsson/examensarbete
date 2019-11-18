const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: { type: String, required: false },
    userName: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
    information: { type: String, required: false },
    img: { type: String, required: false },
    lastDate: { type: Date, required: false }
  },
  {
    timestamps: true
  }
);

const News = mongoose.model("News", userSchema);

module.exports = News;
