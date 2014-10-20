'use strict';

// Configuring the Articles module
angular.module('phones').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Phones', 'phones', 'dropdown', '/phones(/create)?');
		Menus.addSubMenuItem('topbar', 'phones', 'List Phones', 'phones');
		Menus.addSubMenuItem('topbar', 'phones', 'New Phones', 'phones/create');
	}
]);