'use strict';

//Setting up route
angular.module('segments').config(['$stateProvider',
	function($stateProvider) {
		// Segments state routing
		$stateProvider.
		state('listSegments', {
			url: '/segments',
			templateUrl: 'modules/segments/views/list-segments.client.view.html'
		}).
		state('createSegment', {
			url: '/segments/create',
			templateUrl: 'modules/segments/views/create-segment.client.view.html'
		}).
		state('viewSegment', {
			url: '/segments/:segmentId',
			templateUrl: 'modules/segments/views/view-segment.client.view.html'
		}).
		state('editSegment', {
			url: '/segments/:segmentId/edit',
			templateUrl: 'modules/segments/views/edit-segment.client.view.html'
		});
	}
]);