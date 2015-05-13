'use strict';

//Assumptions service used to communicate Assumptions REST endpoints
angular.module('assumptions').factory('Assumptions', ['$resource',
	function($resource) {
		return $resource('assumptions/:assumptionId', { assumptionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);