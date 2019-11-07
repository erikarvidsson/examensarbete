const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: { type: String, required: false },
    userName: { type: String, required: false },
    adress: { type: String, required: true },
    description: { type: String, required: false },
    img: { type: String, required: false },
    lastDate: { type: Date, required: false }
  },
  {
    timestamps: true
  }
);

const Data = mongoose.model('Data', userSchema);

module.exports = Data;