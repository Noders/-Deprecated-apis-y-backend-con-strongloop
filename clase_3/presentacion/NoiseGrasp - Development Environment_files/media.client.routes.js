'use strict';

//Setting up route
angular.module('media').config(['$stateProvider',
	function($stateProvider) {
		// Media state routing
		$stateProvider.
		state('listMedia', {
			url: '/media',
			templateUrl: 'modules/media/views/list-media.client.view.html'
		}).
		state('createMedium', {
			url: '/media/create',
			templateUrl: 'modules/media/views/create-medium.client.view.html'
		}).
		state('viewMedium', {
			url: '/media/:mediumId',
			templateUrl: 'modules/media/views/view-medium.client.view.html'
		}).
		state('editMedium', {
			url: '/media/:mediumId/edit',
			templateUrl: 'modules/media/views/edit-medium.client.view.html'
		});
	}
]);