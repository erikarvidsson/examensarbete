const router = require('express').Router();
let Data = require('../models/data.models');

router.route('/').get((req, res) => {
  Data.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const adress = req.body.adress;
  const description = req.body.description;
  const img = req.body.img;
  const lastDate = Date.parse(req.body.lastDate);

  const newData = new Data({
    adress,
    description,
    img,
    lastDate
  });
  console.log(newData)

  newData.save()
    .then(() => res.json('Data added!'))
    .catch(err => res.status(400).json('Error: ' + err + console.log(newData)));
});

router.route('/:id').get((req, res) => {
  Data.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Data.findByIdAndDelete(req.params.id)
    .then(() => res.json('Data deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Data.findById(req.params.id)
    .then(data => {
      data.adress = req.body.username;
      data.description = req.body.description;
      data.date = Date.parse(req.body.lastDate);

      data.save()
        .then(() => res.json('Data updated'))
        .catch(err => res.status(400).json('Eroor: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;