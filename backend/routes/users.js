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

router.route('/add').post(async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const username = req.body.username;
  const password = hashedPassword


  const newUser = new User({ username, password });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;