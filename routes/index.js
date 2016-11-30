var express = require('express');
var router = express.Router();

// link to the Team model
var Team = require('../models/team');

// GET
router.get('/', function(req, res, next) {
  res.render('index');
});

// make public
module.exports = router;

