'use strict';

angular.module('webApp')
    .controller('ActorCtrl',['$scope', 'Actor', function($scope,Actor) {
        $scope.message = 'Hello';
        $scope.actores = Actor.find()
    }]);
