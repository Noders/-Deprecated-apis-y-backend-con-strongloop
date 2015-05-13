'use strict';

//Setting up route
angular.module('useradmins').config(['$stateProvider',
	function($stateProvider) {
		// Useradmins state routing
		$stateProvider.
		state('listUseradmins', {
			url: '/admin/users',
			templateUrl: 'modules/useradmins/views/list-useradmins.client.view.html'
		}).
		state('createUseradmin', {
			url: '/admin/users/create',
			templateUrl: 'modules/useradmins/views/create-useradmin.client.view.html'
		})./*
		state('viewUseradmin', {
			url: '/admin/users/:userId',
			templateUrl: 'modules/useradmins/views/view-useradmin.client.view.html'
		}).*/
		state('editUseradmin', {
			url: '/admin/users/:userId/edit',
			templateUrl: 'modules/useradmins/views/edit-useradmin.client.view.html'
		});
	}
]);