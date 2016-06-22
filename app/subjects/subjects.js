'use strict';
//Controller for subjects excerpt of Agrovoc - GlUES linking
angular.module('LinkedDataBrowserApp.subjects', ['ngRoute'])

//configuration for angular route provider
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/subjects', {
    templateUrl: 'html/view.html',
    controller: 'subjectsCtrl'
  });
}])

.controller('subjectsCtrl', ["$scope", "$http",'$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll) {
  $scope.language = {
    selected: {name:"english", short :"en"},
    availableOptions: [{name:"deutsch",short: "de"},{name:"english", short :"en"}]
  };
    // function to scroll to selected keyword (doesn't work)
    $scope.gotoHighlight = function() {
      $timeout(function(){
        $location.hash("highlight");
        $anchorScroll();
    });
    };

    //function to retrieve currently selected language
  $scope.getlang = function(){
    lang = $scope.language.selected.short;
  };


  //get links to GLUES Datasets
  $http.get("data/keywords/processed_output_export_skos-xl_subjects.json").success(function(links){
    $scope.links = {
      repeatSelect: activeSelection,
      availableOptions: links.data,
    };

  });
  //get hierachy data
  $http.get("data/hierachy/subjects.json").success(function(data){
    $scope.structData = data;
  });

  //function to add highlight
  $scope.addHighlight = function(){
    highlightKeyword($scope.links.repeatSelect);
    scrolltokeyword($scope.links.repeatSelect);
  };

  $scope.goToAgrovoc = function(){
    window.open($scope.links.repeatSelect);
  };

  //add Dataitem to GLUES Dataset links
  $scope.addItem = function(){
    //add logic to add input to GLUES datasets
    //needs URI of keyword and Input from Form
    //add to Links of selected Dataset
    for (var i = 0; i < $scope.links.availableOptions.length; i++) {
      if($scope.links.availableOptions[i].ID === $scope.links.repeatSelect){
          $scope.links.availableOptions[i].Links.push(transformToGLI($scope.newItem.uri,$scope.newItem.title,$scope.newItem.subjects));
      };
    };
  };

  //select keyword from hierachy
  $scope.selectKeywordFromHierachy = function (ID){
    var match = false;
    var keywordID = $(ID.currentTarget).parent().parent().parent()[0].id;
    $scope.links.repeatSelect = keywordID;
    for (var i = 0; i < $scope.links.availableOptions.length; i++) {
      if ($scope.links.repeatSelect == $scope.links.availableOptions[i].ID){
        match = true;
        break;
      };
    };
    if (!match) {
      alert("sorry, no GLUES matches for this keyword.")
    };
  };

  //filter expression to filter GLUES Linklist by selected keyword (here: item id)
  $scope.filterExpression = function(item) {
    return (item.ID === $scope.links.repeatSelect);
  };

  //filter for displaying Link Count for hierarchy
  //filter in html seems to work globly for all items
  
  $scope.filterCount = function(ID){
    var match = false;
    //console.log(ID.id);
    for (var i = 0; i < $scope.links.availableOptions.length; i++) {
      //console.log(i);
      if (ID.id == $scope.links.availableOptions[i].ID){
        match = true;
        break;
      };
    };
    console.log(match);
    return match;
  };
  //function to export GlUES Dataset for currently selected keyword
  $scope.exportHierarchy = function (){
    var stringdata = JSON.stringify($scope.links.availableOptions);
    createDownloadLink("#export",stringdata);
  };
  //check for buttons to hide
  $scope.hideButtons = function (ID){
    var result = true;
    if(checkToHide(ID,$scope.links.availableOptions)){
      result = false;
    } else{
      result = true;
    };

    //TODO returns global state for all buttons
    //so all buttons are hidden/shown
    //return result;

    return false;
  };

}]);
