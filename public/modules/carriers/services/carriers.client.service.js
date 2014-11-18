'use strict';

//Phones service used to communicate Phones REST endpoints
angular.module('carriers').factory('Carriers', ['$resource',
	function($resource) {
		return $resource('carriers/:carrierId', { carrierId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);