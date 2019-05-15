const express = require('express');
const router = express.Router();

const Coaster = require('../models/Coaster')


router.get('/getAllCoasters', (req, res, next) => {
  Coaster.find()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})


router.post("/postCoaster", (req, res) => {
  console.log(req.body)
  Coaster.create(req.body)
    .then(data => res.json(data))
    .catch(err => console.log(err))
})



router.get("/getOneCoaster/:id", (req, res) => {
  Coaster.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => console.log(err))
})



module.exports = router;