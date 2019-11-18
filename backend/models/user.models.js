const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trin: true,
    minlength: 3
  },
  email: {
    type: String,
    required: false,
    unique: true,
    minlength: 3
  },
  admin: {
    type: Boolean,
    required: false,
  },
  password: { type: String, required: true, minlength: 3 }  
},{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;