'use strict';

//Restrictions service used to communicate Restrictions REST endpoints
angular.module('restrictions').factory('Restrictions', ['$resource',
	function($resource) {
		return $resource('restrictions/:restrictionId', { restrictionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);