'use strict';

//Setting up route
angular.module('scenarios').config(['$stateProvider',
	function($stateProvider) {
		// Scenarios state routing
		$stateProvider.
		state('createScenario', {
			url: '/campaigns/:campaignId/scenarios/create',
			templateUrl: 'modules/scenarios/views/create-scenario.client.view.html'
		}).
		state('viewScenario', {
			url: '/campaigns/:campaignId/scenarios/:scenarioId',
			templateUrl: 'modules/scenarios/views/view-scenario.client.view.html'
		}).
		state('editScenario', {
			url: '/campaigns/:campaignId/scenarios/:scenarioId/edit',
			templateUrl: 'modules/scenarios/views/edit-scenario.client.view.html'
		});
	}
]);