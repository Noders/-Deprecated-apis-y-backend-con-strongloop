'use strict';

angular.module('webApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('actor', {
                url: '/actor',
                templateUrl: 'app/actor/actor.html',
                controller: 'ActorCtrl'
            });
    });
