'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Admin state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/admin/views/admin.client.view.html'
		})/*.
		state('adminUsers', {
			url: '/admin/users',
			templateUrl: 'modules/admin/views/admin.client.users.view.html'
		});*/
	}
]);