'use strict';

//Goals service used to communicate Goals REST endpoints
angular.module('goals').factory('Goals', ['$resource',
	function($resource) {
		return $resource('goals/:goalId', { goalId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);