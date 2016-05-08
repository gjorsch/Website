'use strict';

describe('LinkedDataBrowserApp.version module', function() {
  beforeEach(module('LinkedDataBrowserApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
