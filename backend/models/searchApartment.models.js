const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    dataId: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const SApt = mongoose.model("SApt", userSchema);

module.exports = SApt;
