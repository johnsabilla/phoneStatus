'use strict';

//Firstmodules service used to communicate Firstmodules REST endpoints
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