'use strict';

//Setting up route
angular.module('goals').config(['$stateProvider',
	function($stateProvider) {
		// Goals state routing
		$stateProvider.
		state('listGoals', {
			url: '/goals',
			templateUrl: 'modules/goals/views/list-goals.client.view.html'
		}).
		state('createGoal', {
			url: '/goals/create',
			templateUrl: 'modules/goals/views/create-goal.client.view.html'
		}).
		state('viewGoal', {
			url: '/goals/:goalId',
			templateUrl: 'modules/goals/views/view-goal.client.view.html'
		}).
		state('editGoal', {
			url: '/goals/:goalId/edit',
			templateUrl: 'modules/goals/views/edit-goal.client.view.html'
		});
	}
]);