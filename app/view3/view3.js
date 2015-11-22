'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ["$scope", "$http", function($scope, $http) {
  $http.get("data/skos_subjects.json").success(function(data){
    data = data["@graph"];
    //dispData: data
    var dispData = [];
    for (var i =0; i < data.length;i++){
      if (!data[i]["broader"] && data[i]["narrower"]){
        console.log(data[i]);
        if (data[i]["prefLabel"] != undefined){
          for (var j =0; j < data[i]["prefLabel"].length;j++){
            //if possible use REGEX here for URI language selection
            if(data[i]["prefLabel"][j].slice(35,37)==="en"){
              dispData.push(data[i]["prefLabel"][j]);
            };
          };
          //dispData.push({id: data[i]["@id"]});
          console.log("hit!");
        };
      };
    };
    $scope.data = dispData;
    console.log($scope.data);
  });
  $http.get("data/output_export_skos-xl_subjects.rdf.json").success(function(links){
    $scope.links = links.data;
    console.log($scope.links);
  });
}]);
