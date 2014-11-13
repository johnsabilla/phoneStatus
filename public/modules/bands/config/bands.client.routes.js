'use strict';

//Setting up route
angular.module('bands').config(['$stateProvider',
	function($stateProvider) {
		// Firstmodules state routing
		$stateProvider.
		state('listBands', {
			url: '/bands',
			templateUrl: 'modules/bands/views/list-bands.client.view.html'
		}).
		state('createBand', {
			url: '/bands/create',
			templateUrl: 'modules/bands/views/create-bands.client.view.html'
		}).
		state('viewBand', {
			url: '/bands/:bandId',
			templateUrl: 'modules/bands/views/view-bands.client.view.html'
		}).
		state('editBand', {
			url: '/bands/:bandId/edit',
			templateUrl: 'modules/bands/views/edit-bands.client.view.html'
		});
	}
]);