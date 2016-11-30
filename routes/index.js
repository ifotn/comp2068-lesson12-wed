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

// POST /teams
router.post('/teams', function(req, res, next) {
  // get team from the request object
  var newTeam = new Team(req.body);

  // use the mongoose model to save
  newTeam.save(function(err, newTeam) {
   if (err) {
     return next(err);
   }

    // send the new team back as json
    res.json(newTeam);
  });
});

// DELETE /teams/_id
router.delete('/teams/:_id', function(req, res, next) {
  var _id = req.params._id;

  Team.remove({ _id: _id }, function(err, team) {
    if (err) {
      return next(err);
    }

    res.json(team);
  });
});

// UPDATE teams/_id
router.put('/teams/:_id', function(req, res, next)  {
  var modifiedTeam = new Team(req.body);

  Team.update({ _id: modifiedTeam._id }, modifiedTeam, function(err, modifiedTeam) {
    if (err) {
      return next(err);
    }

    res.json(modifiedTeam);
  });
});

// make public
module.exports = router;

