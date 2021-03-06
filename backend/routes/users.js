const router = require('express').Router();
let User = require('../models/user.models');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addAdmin').post(async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const username = req.body.username;
  const email = req.body.email;
  const admin = true;
  const password = hashedPassword


  const newUser = new User({ username, email, admin, password });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const username = req.body.username;
  const email = req.body.email;
  const password = hashedPassword


  const newUser = new User({ username, email, password });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(data => {
      data.username = req.body.username;
      data.email = req.body.email;
      data.date = Date.parse(req.body.lastDate);

      data
        .save()
        .then(() => res.json("Data updated"))
        .catch(err => res.status(400).json("Eroor: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;