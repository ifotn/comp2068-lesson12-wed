/**
 * Created by RFreeman on 10/12/2016.
 */

// create the angular app
var app = angular.module('TeamApp', ['ui.router']);

// create the factory (server-side angular) that talks to our express controller
app.factory('TeamFactory', ['$http', function($http) {

    // initialize an empty teams list
    var t = {
        teams: []
    };

    // GET
    t.getTeams = function() {
        // execute a GET on the /teams route in our express controller
        // this route returns a json object with team data
        // copy this data to our local array
        return $http.get('/teams').success(function(data) {
           angular.copy(data, t.teams);
        });
    };

    // ADD
    t.addTeam = function(team) {
      // execute a POST on the /teams route in our express controller
        // save to mongodb
        // add new team object to the current list in memory
        return $http.post('/teams', team).success(function(data) {
            t.teams.push(data);
        });
    };

    // DELETE
    t.deleteTeam = function(_id, index) {
        // execute a DELETE on /teams/_id in the express controller
        // save to mongodb
        // remove the selected team from the current list in memory
        return $http.delete('/teams/' + _id, { _id: _id}).success(function(data) {
            t.teams.splice(index,  1);
        });
    };

    // UPDATE
    t.updateTeam = function(team) {
      return $http.put('/teams/' + team._id, team).success(function(data) {
          t.getTeams();
      });
    };

    // expose the team array back to the controller
    return t;
}]);
// end factory

// create the controller (client-side angular) that interfaces between the factory & the view
app.controller('TeamController', ['$scope', 'TeamFactory', function($scope, TeamFactory) {

    // get
    $scope.getTeams = function() {
        // call the factory's getTeams method and put the results in an array in $scope
        TeamFactory.getTeams().then(function(response) {
            $scope.teams = response.data;
        });
    };

    // add
    $scope.addTeam = function() {
      // 1 create a new team object from the form values
        var team = {
            city: $scope.city,
            nickname: $scope.nickname,
            wins: $scope.wins,
            losses: $scope.losses
        };

        // 2. pass the object to the factory and call the add method
        TeamFactory.addTeam(team);

        // 3. refresh the team list
        $scope.getTeams();

        // 4. clear the form inputs
        clearForm();
    };

    // delete
    $scope.deleteTeam = function(_id, index) {
        if (confirm('Are you sure?')) {
            TeamFactory.deleteTeam(_id, index);

            // refresh the list
            $scope.getTeams();
        }
    };

    // select single Team
    $scope.selectTeam = function(index) {
        var team = $scope.teams[index];

        // populate the individual scope values for this team
        $scope._id = team['_id'];
        $scope.city = team['city'];
        $scope.nickname = team['nickname'];
        $scope.wins = team['wins'];
        $scope.losses = team['losses'];
    };

    // update
    $scope.updateTeam = function() {
        var team = {
            _id: $scope._id,
            city: $scope.city,
            nickname: $scope.nickname,
            wins: $scope.wins,
            losses: $scope.losses
        };

      TeamFactory.updateTeam(team);

        // refresh list
        $scope.getTeams();

        // clear the form
        clearForm();
    };

    // clear form
    var clearForm = function() {
        $scope.city = '';
        $scope.nickname = '';
        $scope.wins = '';
        $scope.losses = '';
        $scope._id = '';
    };
}]);
// end controller