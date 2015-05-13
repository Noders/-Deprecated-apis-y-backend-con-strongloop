'use strict';

//Media service used to communicate Media REST endpoints
angular.module('media').factory('Media', ['$resource',
	function($resource) {
		return $resource('media/:mediumId', { mediumId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);