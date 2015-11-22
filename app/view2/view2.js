'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ["$scope", "$http", function($scope, $http) {
  $http.get("data/skos_subjects.json").success(function(data){
    var dispData = [];
    var lessRespData;
    data = data["@graph"];
    for (var i = 0; i < data.length; i++) {
		  lessRespData = data[i]["skosxl:literalForm"];
			if (lessRespData != undefined){
				if (lessRespData["@language"]== "de"){
					dispData.push({id: data[i]["@id"],language: lessRespData["@language"], value: lessRespData["@value"]});
				}
			}
  	}
    $scope.data = dispData;
    console.log($scope.data);
  });
}]);
