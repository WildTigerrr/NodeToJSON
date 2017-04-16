var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Controller started");

$scope.ticketId = 0;
var refresh = function() {
  $http.get('/tickets').then(function(response) {
    console.log("Delivered data");
    console.log(response.data);
    $scope.tickets = response.data.data;
    $scope.ticket = {};
  });
};

refresh();

$scope.addTicket = function() {
  console.log($scope.ticket);
  $http.post('/tickets', $scope.ticket).then(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/tickets/' + id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $scope.ticketId = id;
  $http.get('/tickets/').then(function(response) {
    $scope.ticket = response.data.data[id];
  });
};  

$scope.update = function() {
  console.log($scope.ticketId);
  $http.put('/tickets/' + $scope.ticketId, $scope.ticket).then(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.ticket = "";
}

}]);﻿