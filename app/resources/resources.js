'use strict';
//Controller for resources excerpt of Agrovoc - GlUES linking
angular.module('LinkedDataBrowserApp.resources', ['ngRoute'])

//configuration for angular route provider
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/resources', {
    templateUrl: 'resources/resources.html',
    controller: 'resourcesCtrl'
  });
}])

.controller('resourcesCtrl', ["$scope", "$http",'$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll) {
  $scope.language = {
    selected: {name:"english", short :"en"},
    availableOptions: [{name:"deutsch",short: "de"},{name:"english", short :"en"}]
  };
    // function to scroll to selected keyword (doesn't work)
    $scope.gotoHighlight = function() {
      $timeout(function(){
        $location.hash("highlight");
        console.log("hit!");
        $anchorScroll();
    });
    };
  //function to retrieve currently selected language
  $scope.getlang = function(){
    lang = $scope.language.selected.short;
    console.log("click");
    console.log($scope.language.selected.short);
  };


  //get links to GLUES Datasets
  $http.get("data/keywords/processed_output_export_skos-xl_resources.json").success(function(links){
    $scope.links = {
      repeatSelect: activeSelection,
      availableOptions: links.data,
    };
    console.log($scope.links);

  });
  //get hierachy data
  $http.get("data/hierachy/resources.json").success(function(data){
    $scope.structData = data;
    console.log($scope.structData);
  });
  //function to add highlight
  $scope.addHighlight = function(){
    console.log("highlight");
    highlightKeyword($scope.links.repeatSelect);
  };

  $scope.goToAgrovoc = function(){
    window.open($scope.links.repeatSelect);
  };

  //add Dataitem to GLUES Dataset links
  $scope.addItem = function(){
    //add logic to add input to GLUES datasets
    //needs URI of keyword and Input from Form
    console.log("Click!");
    //add to Links of selected Dataset
    for (var i = 0; i < $scope.links.availableOptions.length; i++) {
      if($scope.links.availableOptions[i].ID === $scope.links.repeatSelect){
          $scope.links.availableOptions[i].Links.push(transformToGLI($scope.newItem.uri,$scope.newItem.title,$scope.newItem.subjects));
      }
    }
  }

  //select keyword from hierachy
  $scope.selectKeywordFromHierachy = function (ID){
    console.log(ID.currentTarget);
    var keywordID = $(ID.currentTarget).parent().parent().parent()[0].id;
    console.log(keywordID);
    $scope.links.repeatSelect = keywordID;
    console.log($scope.links.repeatSelect);
  }
  $scope.filterExpression = function(item) {
    return (item.ID === $scope.links.repeatSelect);
  }
  //function to export GlUES Dataset for currently selected
  $scope.exportHierarchy = function (){
    var stringdata = JSON.stringify($scope.links.availableOptions);
    createDownloadLink("#export",stringdata);
  }

}]);
