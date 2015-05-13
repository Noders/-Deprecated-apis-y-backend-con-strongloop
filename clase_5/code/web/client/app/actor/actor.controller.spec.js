'use strict';

describe('Controller: ActorCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ActorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActorCtrl = $controller('ActorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
