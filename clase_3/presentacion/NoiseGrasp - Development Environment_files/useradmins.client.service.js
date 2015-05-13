'use strict';

//Useradmins service used to communicate Useradmins REST endpoints
angular.module('useradmins')
.factory('Useradmins', ['$resource', '$q',
	function($resource,$q) {
	    
		return $resource('admin/users/:useradminId', { useradminId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	    
	}
])
.factory('listOfUsers', ['$resource', '$q',
	function($resource, $q) {
        return $resource(
            'admin/users/:userId', 
            {}, 
            {
                update: {
                    method: 'PUT'
                }
            }
        );
    }
]);
