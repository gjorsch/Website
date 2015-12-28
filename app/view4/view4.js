'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl', ["$scope", "$http", function($scope, $http) {
  $http.get("data/skos_subjects.json").success(function(data){
    data = data["@graph"];
    var structData = getParent(data);
    structData = defineNextLevel(structData,data);
    console.log(structData);

  });
}]);
