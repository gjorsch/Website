'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ["$scope", "$http", function($scope, $http) {
  $http.get("data/skos_entities.json").success(function(data){
    var dispData = [];
    var lessRespData;
    data = data["@graph"];
    for (var i = 0; i < data.length; i++) {
		  lessRespData = data[i]["skosxl:literalForm"];
			if (lessRespData != undefined){
				if (lessRespData["@language"]== "en"){
					dispData.push({id: data[i]["@id"],language: lessRespData["@language"], value: lessRespData["@value"]});
				}
			}
  	}
    $scope.data = dispData;
    console.log($scope.data);
  });
  $http.get("data/output_export_skos-xl_subjects.rdf.json").success(function(links){
    $scope.links = links.data;
    console.log($scope.links);
  });
}]);
