'use strict';

// Declare app level module which depends on views, and components
angular.module('LinkedDataBrowserApp', [
  'ngRoute',
  'LinkedDataBrowserApp.subjects',
  'LinkedDataBrowserApp.activities',
  'LinkedDataBrowserApp.entities',
  'LinkedDataBrowserApp.groups',
  'LinkedDataBrowserApp.measure',
  'LinkedDataBrowserApp.resources',
  'LinkedDataBrowserApp.version',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/subjects'});
}]);
