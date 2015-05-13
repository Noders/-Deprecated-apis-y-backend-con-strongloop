'use strict';

angular.module('webApp')
    .controller('PerformerCtrl', ['$scope', 'Actor', function($scope, Actor) {
        $scope.message = 'Hello';
        $scope.actores = Actor.find();
        
    }]);
