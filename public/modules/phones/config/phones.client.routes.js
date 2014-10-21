'use strict';

//Setting up route
angular.module('phones').config(['$stateProvider',
	function($stateProvider) {
		// Firstmodules state routing
		$stateProvider.
		state('listPhones', {
			url: '/phones',
			templateUrl: 'modules/phones/views/list-phones.client.view.html'
		}).
		state('createPhone', {
			url: '/phones/create',
			templateUrl: 'modules/phones/views/create-phones.client.view.html'
		}).
		state('viewPhone', {
			url: '/phones/:phoneId',
			templateUrl: 'modules/phones/views/view-phones.client.view.html'
		}).
		state('editPhone', {
			url: '/phones/:phoneId/edit',
			templateUrl: 'modules/phones/views/edit-phones.client.view.html'
		});
	}
]);