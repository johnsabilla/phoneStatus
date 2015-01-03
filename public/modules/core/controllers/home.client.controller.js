'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Phones',
	function($scope, Authentication, Phones) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.find = function() {
			$scope.phones = Phones.query();
		};
	}
]);