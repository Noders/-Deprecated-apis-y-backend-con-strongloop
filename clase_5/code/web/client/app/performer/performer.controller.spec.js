'use strict';

describe('Controller: PerformerCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var PerformerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerformerCtrl = $controller('PerformerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
