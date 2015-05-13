'use strict';

//Medium categories service used to communicate Medium categories REST endpoints
angular.module('medium-categories').factory('MediumCategories', ['$resource',
	function($resource) {
		return $resource('medium-categories/:mediumCategoryId', { mediumCategoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);