'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'view4Ctrl'
  });
}])

.controller('view4Ctrl', ["$scope", "$http",'$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll) {
  $scope.language = {
    selected: {name:"english", short :"en"},
    availableOptions: [{name:"deutsch",short: "de"},{name:"english", short :"en"}]
  };

    $scope.gotoHighlight = function() {
      $timeout(function(){
        $location.hash("highlight");
        console.log("hit!");
        $anchorScroll();
    });
    };

  $scope.getlang = function(){
    lang = $scope.language.selected.short;
    console.log("click");
    console.log($scope.language.selected.short);
  };


  //get links to GLUES Datasets
  $http.get("data/keywords/processed_output_export_skos-xl_groups.json").success(function(links){
    $scope.links = {
      repeatSelect: null,
      availableOptions: links.data,
      demo: links.data[1]
    };
    console.log($scope.links);
  });
  //get hierachy data
  $http.get("data/hierachy/groups.json").success(function(data){
    $scope.structData = data;
    console.log($scope.structData);
  });
  //get value of selected keyword from form
  $scope.getSelection = function (){
    var selection = getElement(".keyselection");
    console.log(selection);
    $scope.datasets = filterSelection(selection,$scope.links.availableOptions);
    console.log($scope.datasets);
    highlightKeyword(selection);
  };
  $scope.goToAgrovoc = function(){
    var selection = getElement(".keyselection");
    $scope.agroLink = getAgroLink(selection,$scope.links.availableOptions);
    window.open($scope.agroLink);
  };
}]);
