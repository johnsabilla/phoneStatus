'use strict';

//Phones service used to communicate Phones REST endpoints
angular.module('phones').factory('Phones', ['$resource',
	function($resource) {
		return $resource('phones/:phoneId', { phoneId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);