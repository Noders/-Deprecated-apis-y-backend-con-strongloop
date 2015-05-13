'use strict';

//Setting up route
angular.module('medium-categories').config(['$stateProvider',
	function($stateProvider) {
		// Medium categories state routing
		$stateProvider.
		state('listMediumCategories', {
			url: '/medium-categories',
			templateUrl: 'modules/medium-categories/views/list-medium-categories.client.view.html'
		}).
		state('createMediumCategory', {
			url: '/medium-categories/create',
			templateUrl: 'modules/medium-categories/views/create-medium-category.client.view.html'
		}).
		state('viewMediumCategory', {
			url: '/medium-categories/:mediumCategoryId',
			templateUrl: 'modules/medium-categories/views/view-medium-category.client.view.html'
		}).
		state('editMediumCategory', {
			url: '/medium-categories/:mediumCategoryId/edit',
			templateUrl: 'modules/medium-categories/views/edit-medium-category.client.view.html'
		});
	}
]);