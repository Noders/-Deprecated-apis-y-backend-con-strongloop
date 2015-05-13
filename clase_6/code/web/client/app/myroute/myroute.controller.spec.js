'use strict';

describe('Controller: MyrouteCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MyrouteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyrouteCtrl = $controller('MyrouteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
