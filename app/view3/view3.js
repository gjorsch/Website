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
    var dispData = {};
    //find parent node
    for (var i=0; i<data.length; i++){
      if (!data[i]["broader"] && data[i]["narrower"]){
        if (data[i]["prefLabel"] != undefined){
          for (var j =0; j < data[i]["prefLabel"].length;j++){
            //if possible use REGEX here for URI language selection
            if(data[i]["prefLabel"][j].slice(35,37)==="en"){
              dispData.parent = ({id:data[i]["@id"], label:data[i]["prefLabel"][j], narrower: [], name: getName(data[i]["prefLabel"][j],data)});
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
          //add labels and names to narrower ids
          if (data[i]["prefLabel"] != undefined){
            for (var k =0; k<data[i]["prefLabel"].length;k++){
              if(data[i]["prefLabel"][k].slice(35,37)==="en"){
                dispData["parent"]["narrower"][j]["label"]= data[i]["prefLabel"][k];
                dispData["parent"]["narrower"][j]["name"]= getName(data[i]["prefLabel"][k],data);
                if (data[i]["narrower"] != undefined){
                  //add Array for narrower URIs "ids" to each parent
                  dispData["parent"]["narrower"][j]["narrower"]=[];
                  for (var l=0; l<data[i]["narrower"].length;l++){
                    dispData["parent"]["narrower"][j]["narrower"].push({id: data[i]["narrower"][l]});
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
              if (data[i]["prefLabel"] != undefined){
                for (var l =0; l<data[i]["prefLabel"].length;l++){
                  if(data[i]["prefLabel"][l].slice(35,37)==="en"){
                    dispData["parent"]["narrower"][j]["narrower"][k]["label"]= data[i]["prefLabel"][l];
                    dispData["parent"]["narrower"][j]["narrower"][k]["name"]= getName(data[i]["prefLabel"][l],data);
                    if (data[i]["narrower"] != undefined){
                      //add Array for narrower URIs "ids" to each parent
                      dispData["parent"]["narrower"][j]["narrower"][k]["narrower"]=[];
                      for (var m=0; m<data[i]["narrower"].length;m++){
                        if(data[i]["narrower"][m].length>1){
                          dispData["parent"]["narrower"][j]["narrower"][k]["narrower"].push({id: data[i]["narrower"][m], label: getlabel(data[i]["narrower"][m],data), name: getName(getlabel(data[i]["narrower"][m],data),data)});
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
    $scope.dispData = dispData;
    //console.log(dispData);
  });
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
    scrollToHighlight();
  };

}]);
