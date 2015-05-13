'use strict';

//Setting up route
angular.module('restrictions').config(['$stateProvider',
	function($stateProvider) {
		// Restrictions state routing
		$stateProvider.
		state('listRestrictions', {
			url: '/restrictions',
			templateUrl: 'modules/restrictions/views/list-restrictions.client.view.html'
		}).
		state('createRestriction', {
			url: '/restrictions/create',
			templateUrl: 'modules/restrictions/views/create-restriction.client.view.html'
		}).
		state('viewRestriction', {
			url: '/restrictions/:restrictionId',
			templateUrl: 'modules/restrictions/views/view-restriction.client.view.html'
		}).
		state('editRestriction', {
			url: '/restrictions/:restrictionId/edit',
			templateUrl: 'modules/restrictions/views/edit-restriction.client.view.html'
		});
	}
]);