'use strict';

//Segments service used to communicate Segments REST endpoints
angular.module('segments').factory('Segments', ['$resource',
	function($resource) {
		return $resource('segments/:segmentId', { segmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);