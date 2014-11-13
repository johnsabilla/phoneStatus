'use strict';

//Setting up route
angular.module('carriers').config(['$stateProvider',
	function($stateProvider) {
		// Firstmodules state routing
		$stateProvider.
		state('listCarriers', {
			url: '/carriers',
			templateUrl: 'modules/carriers/views/list-carriers.client.view.html'
		}).
		state('createCarrier', {
			url: '/carriers/create',
			templateUrl: 'modules/carriers/views/create-carriers.client.view.html'
		}).
		state('viewCarrier', {
			url: '/carriers/:carrierId',
			templateUrl: 'modules/carriers/views/view-carriers.client.view.html'
		}).
		state('editCarrier', {
			url: '/carriers/:carrierId/edit',
			templateUrl: 'modules/carriers/views/edit-carriers.client.view.html'
		});
	}
]);