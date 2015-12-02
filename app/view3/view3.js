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
    var dispData = {};

    //find parent node
    for (var i=0; i<data.length; i++){
      if (!data[i]["broader"] && data[i]["narrower"]){
        console.log(data[i]);
        if (data[i]["prefLabel"] != undefined){
          for (var j =0; j < data[i]["prefLabel"].length;j++){
            //if possible use REGEX here for URI language selection
            if(data[i]["prefLabel"][j].slice(35,37)==="en"){
              dispData.parent = ({id:data[i]["@id"], label:data[i]["prefLabel"][j], narrower: []});
              for (var k=0; k<data[i]["narrower"].length;k++){
                dispData["parent"]["narrower"].push({id: data[i]["narrower"][k]});
              };
            };
          };
        };
      };
    };

    //define 2nd level hierachy nodes
    for (var i=0; i<data.length; i++){
      for (var j=0; j<dispData["parent"]["narrower"].length; j++){
        if (data[i]["@id"]==dispData["parent"]["narrower"][j]["id"]){
          //add labels to narrower ids
          if (data[i]["prefLabel"] != undefined){
            for (var k =0; k<data[i]["prefLabel"].length;k++){
              if(data[i]["prefLabel"][k].slice(35,37)==="en"){
                dispData["parent"]["narrower"][j]["label"]= data[i]["prefLabel"][k];
                if (data[i]["narrower"] != undefined){
                  //add Array for narrower URIs "ids" to each parent
                  dispData["parent"]["narrower"][j]["narrower"]=[];
                  for (var l=0; l<data[i]["narrower"].length;l++){
                    dispData["parent"]["narrower"][j]["narrower"].push({id: data[i]["narrower"][l]});
                    //console.log(data[i]["narrower"][l]);
                    //console.log(dispData["parent"]["narrower"][j]["narrower"]);
                  };
                };
              };
            };
          };
        };
      };
    };
    //define 3rd level hierachy nodes
    for (var i=0; i<data.length; i++){
      for (var j=0; j<dispData["parent"]["narrower"].length; j++){
        if(dispData["parent"]["narrower"][j]["narrower"] != undefined){
          for(var k=0; k<dispData["parent"]["narrower"][j]["narrower"].length; k++){
            if (data[i]["@id"]==dispData["parent"]["narrower"][j]["narrower"][k]["id"]){
              //console.log(data[i]["@id"]);
              if (data[i]["prefLabel"] != undefined){
                for (var l =0; l<data[i]["prefLabel"].length;l++){
                  if(data[i]["prefLabel"][l].slice(35,37)==="en"){
                    dispData["parent"]["narrower"][j]["narrower"][k]["label"]= data[i]["prefLabel"][l];
                    if (data[i]["narrower"] != undefined){
                      //add Array for narrower URIs "ids" to each parent
                      dispData["parent"]["narrower"][j]["narrower"][k]["narrower"]=[];
                      for (var m=0; m<data[i]["narrower"].length;m++){
                        if(data[i]["narrower"][m].length>1){
                          dispData["parent"]["narrower"][j]["narrower"][k]["narrower"].push({id: data[i]["narrower"][m]});
                          //console.log(data[i]["narrower"][l]);
                          //console.log(dispData["parent"]["narrower"][j]["narrower"][k]["narrower"]);
                          console.log(data[i]["narrower"][m]);
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };

    console.log(dispData);
    $scope.dispData = dispData;
    console.log($scope.data);
  });
  $http.get("data/output_export_skos-xl_subjects.rdf.json").success(function(links){
    $scope.links = {
      repeatSelect: null,
      availableOptions: links.data
    };
    console.log($scope.links);

  });
}]);
