'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('performer', {
        url: '/performer',
        templateUrl: 'app/performer/performer.html',
        controller: 'PerformerCtrl'
      });
  });