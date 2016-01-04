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
}])
.directive("collapseDirective", function() {
    return {
        restrict: "A",
        link: function(scope,elem, attrs) {
          $(elem).click(function (e) {
              var children = $(elem).next('li.parent_li').find(' > ul > li');
              //var children = $(elem);
              console.log(children);
              if (children.is(":visible")) {
                  children.hide('fast');
                  $(elem).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
              } else {
                  children.show('fast');
                  $(elem).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
              }
              e.stopPropagation();
          });
        }
    }
});
