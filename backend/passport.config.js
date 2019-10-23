const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("./models/login.models");

const passport2 = () => {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      console.log(username),
        User.getUserByUsername(username, function(err, user) {
          if (err) throw err;
          if (!user) {
            return done(null, false, { message: "Unknown User" });
          }
          User.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              return done(null, user, { message: "Password is correct" });
            } else {
              return done(null, false, { message: "Invalid password" });
            }
          });
        });
    })
  );
};

module.exports = passport2;
