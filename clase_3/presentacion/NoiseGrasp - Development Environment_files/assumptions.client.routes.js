'use strict';

//Setting up route
angular.module('assumptions').config(['$stateProvider',
	function($stateProvider) {
		// Assumptions state routing
		$stateProvider.
		state('listAssumptions', {
			url: '/assumptions',
			templateUrl: 'modules/assumptions/views/list-assumptions.client.view.html'
		}).
		state('createAssumption', {
			url: '/assumptions/create',
			templateUrl: 'modules/assumptions/views/create-assumption.client.view.html'
		}).
		state('viewAssumption', {
			url: '/assumptions/:assumptionId',
			templateUrl: 'modules/assumptions/views/view-assumption.client.view.html'
		}).
		state('editAssumption', {
			url: '/assumptions/:assumptionId/edit',
			templateUrl: 'modules/assumptions/views/edit-assumption.client.view.html'
		});
	}
]);