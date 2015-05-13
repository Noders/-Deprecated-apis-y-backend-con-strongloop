'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myroute', {
        url: 'performer',
        templateUrl: 'app/myroute/myroute.html',
        controller: 'MyrouteCtrl'
      });
  });