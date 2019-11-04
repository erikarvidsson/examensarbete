const router = require("express").Router();
let User = require("../models/user.models");
const jwt = require("jsonwebtoken");
// const exjwt = require("express-jwt");

const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");

require("../passport.config")(passport);

// const jwtMW = exjwt({
//   secret: process.env.SESSION_SECRET
// });

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id })
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err, null);
    });
});

// router.set("trust proxy", 1)
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    passReqToCallback: true
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.route("/").get((req, res) => {
  User.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  // res.render('/userLogin.js')
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// // Endpoint to login
router.route("/login").post(passport.authenticate("local"), function(req, res) {
  // console.log(req.user._id);
  console.log(req.user);
  const user = req.user
  // res.send(user)
  // res.render("/login");
  // res.cookie({user});
  jwt.sign(
    {user},
    process.env.SESSION_SECRET,
    {
    algorithm: 'HS256'
  },
    (err, token) => {
      if (err) {
        console.log(err);
      }else{
        // console.log("Token - " + token)
        res.cookie('token2',token);
        res.send(user);
        res.redirect("/");
      }
    }
  );
});

// Endpoint to get current user
router.get("/user", function(req, res) {
  res.send(req.user);
});

// Endpoint to logout
router.get("/logout", function(req, res) {
  req.logout();
  res.send(null);
});

module.exports = router;
