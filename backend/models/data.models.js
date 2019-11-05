const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    adress: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false },
    lastDate: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Data = mongoose.model('Data', userSchema);

module.exports = Data;