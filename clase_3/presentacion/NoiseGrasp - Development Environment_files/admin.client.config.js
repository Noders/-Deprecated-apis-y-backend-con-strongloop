'use strict';

// Admin module config
angular.module('admin').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Admin', 'admin', 'dropdown');
		Menus.addSubMenuItem('topbar', 'admin', 'Segmentos de clientes', 'segments');
		Menus.addSubMenuItem('topbar', 'admin', 'Líneas de productos', 'products');
		Menus.addSubMenuItem('topbar', 'admin', 'Objetivos', 'goals');
		Menus.addSubMenuItem('topbar', 'admin', 'Medios', 'media');
		Menus.addSubMenuItem('topbar', 'admin', 'Categorías de medios', 'medium-categories');
		Menus.addSubMenuItem('topbar', 'admin', 'Restricciones', 'restrictions');
		Menus.addSubMenuItem('topbar', 'admin', 'Usuarios', 'admin/users');
	} 
]);
