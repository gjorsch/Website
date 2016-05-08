'use strict';

angular.module('LinkedDataBrowserApp.version', [
  'LinkedDataBrowserApp.version.interpolate-filter',
  'LinkedDataBrowserApp.version.version-directive'
])

.value('version', '0.1');
