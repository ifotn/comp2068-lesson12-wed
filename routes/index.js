var express = require('express');
var router = express.Router();

// link to the Team model
var Team = require('../models/team');

// GET
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET /teams
router.get('/teams', function(req, res, next) {
  // use the Team model to get all teams and send back as json only
  Team.find(function(err, teams) {
    if (err) {
      return next(err);
    }

    // no error, query returned json to us so send back to the factory
    res.json(teams);
  });
});


// make public
module.exports = router;

