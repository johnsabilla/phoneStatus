'use strict';

// Configuring the Carriers module
angular.module('carriers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Carriers', 'carriers', 'dropdown', '/carriers(/create)?');
		Menus.addSubMenuItem('topbar', 'carriers', 'List Carriers', 'carriers');
		Menus.addSubMenuItem('topbar', 'carriers', 'New Carriers', 'carriers/create');
	}
]);