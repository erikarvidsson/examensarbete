const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  adress: { type: String, required: true,},
  description: { type: String, required: true},
  img: { type: Object, required: false},
  lastDate: {type: Date, required: true}
}, {
  timestamps: true,
});

const Data = mongoose.model('Data', userSchema);

module.exports = Data;