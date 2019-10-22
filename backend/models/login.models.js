const User = require('./user.models');
const bcrypt = require('bcrypt');

module.exports.getUserByUsername = function (username, callback) {
  console.log(username)
  var query = { username: username };
  // console.log(query, callback)
  User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err;
    console.log(isMatch)
    callback(null, isMatch);
  });
}