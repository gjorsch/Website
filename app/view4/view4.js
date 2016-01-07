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
    structData = define2ndLevel(structData,data);
    structData = define3rdLevel(structData,data);
    structData = define4thLevel(structData,data);
    console.log(structData);
    $scope.structData = structData;
  });
  //get links to GLUES Datasets
  $http.get("data/output_export_skos-xl_subjects.rdf.json").success(function(links){
    $scope.links = {
      repeatSelect: null,
      availableOptions: links.data,
      demo: links.data[1]
    };
  });
  //get value of selected keyword from form
  $scope.getSelection = function (){
    var selection = getElement(".keyselection");
    $scope.datasets = filterSelection(selection,$scope.links.availableOptions);
    highlightKeyword(selection);

  };
}]);
