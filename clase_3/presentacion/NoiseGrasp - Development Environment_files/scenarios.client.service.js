'use strict';

//Scenarios service used to communicate Scenarios REST endpoints
angular.module('scenarios').factory('Scenarios', ['$resource',
	function($resource) {
		return $resource('scenarios/:scenarioId', { scenarioId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);