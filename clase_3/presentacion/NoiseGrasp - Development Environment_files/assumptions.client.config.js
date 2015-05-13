'use strict';

// Configuring the Articles module
angular.module('assumptions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*
		Menus.addMenuItem('topbar', 'Assumptions', 'assumptions', 'dropdown', '/assumptions(/create)?');
		Menus.addSubMenuItem('topbar', 'assumptions', 'List Assumptions', 'assumptions');
		Menus.addSubMenuItem('topbar', 'assumptions', 'New Assumption', 'assumptions/create');
		*/
	}
]);
