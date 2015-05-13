'use strict';

// Configuring the Articles module
angular.module('campaigns').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Campañas', 'campaigns', 'dropdown', '/campaigns(/create)?');
		//Menus.addSubMenuItem('topbar', 'campaigns', 'Ver campañas', 'campaigns');
		//Menus.addSubMenuItem('topbar', 'campaigns', 'Nueva campaña', 'campaigns/create');
	}
]);
