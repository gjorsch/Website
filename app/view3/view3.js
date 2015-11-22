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
    var dispDataNarrow = [];
    //find parent node
    for (var i =0; i < data.length;i++){
      if (!data[i]["broader"] && data[i]["narrower"]){
        console.log(data[i]);
        if (data[i]["prefLabel"] != undefined){
          for (var j =0; j < data[i]["prefLabel"].length;j++){
            //if possible use REGEX here for URI language selection
            if(data[i]["prefLabel"][j].slice(35,37)==="en"){
              dispData.push({id:data[i]["@id"], label:data[i]["prefLabel"][j]});
            };
          };
        };
      };
    };
    //find next level hierachy item
    console.log(dispData[0]["id"]);
    for (var i=0; i <data.length;i++){
        if (data[i]["broader"]===dispData[0]["id"]){
          //console.log(data[i]);
          //console.log("hit!");
          if (data[i]["prefLabel"] != undefined){
            for (var j =0; j < data[i]["prefLabel"].length;j++){
              //if possible use REGEX here for URI language selection
              if(data[i]["prefLabel"][j].slice(35,37)==="en"){
                dispDataNarrow.push({id:data[i]["@id"], label:data[i]["prefLabel"][j]});
                console.log(data[i]["prefLabel"][j]);
              };
            };
          };
        };
    };
    console.log(dispDataNarrow);
    $scope.data = dispData;
    console.log($scope.data);
  });
  $http.get("data/output_export_skos-xl_subjects.rdf.json").success(function(links){
    $scope.links = links.data;
    console.log($scope.links);
  });
}]);
