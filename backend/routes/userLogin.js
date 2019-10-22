const router = require("express").Router();
// const express = require('express');
let User = require("../models/user.models");

const passport = require("passport");
const session = require("express-session");
var jwt = require("jsonwebtoken");

require("../passport.config")(passport);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
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
router
  .route("/login")
  .post(
    passport.authenticate("local"),
    passport.authenticate("local"),
    function(req, res) {
      console.log(req.user);
      res.send(req.user);
      res.render("/");
    }
  );

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
