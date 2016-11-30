/**
 * Created by RFreeman on 10/12/2016.
 */

// create the angular app
var app = angular.module('TeamApp', ['ui.router']);

// create the factory (server-side angular) that talks to our express controller
app.factory('teams', ['$http', function($http) {

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
    }

    // expose the team array back to the controller
    return t;
}]);
// end factory

// create the controller (client-side angular) that interfaces between the factory & the view
app.controller('TeamController', ['$scope', 'teams', function($scope, teams) {

    // get
    $scope.getTeams = function() {
        // call the factory's getTeams method and put the results in an array in $scope
        teams.getTeams().then(function(response) {
            $scope.teams = response.data;
        });
    };
}]);