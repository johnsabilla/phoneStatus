'use strict';

// Firstmodules controller
angular.module('phones').controller('PhonesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Phones',
	function($scope, $stateParams, $location, Authentication, Phones ) {
		$scope.authentication = Authentication;

		// Create new Firstmodule
		$scope.create = function() {
			// Create new Firstmodule object
			var phone = new Phones ({
				Name: this.name,
				GSMBands: this.gsmbands,
				LTEFDDBands: this.ltefddbands,
				ModelNumber: this.modelnumber,
				UMTSBands: this.umtsbands,
				TDSCDMABands: this.tdscdmabands
			});
			// Redirect after save
			phone.$save(function(response) {
				$location.path('phones/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.gsmbands= '';
				$scope.ltefddbands= '';
				$scope.modelnumber= '';
				$scope.umtsbands= '';
				$scope.tdscdmabands= '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Firstmodules
		$scope.find = function() {
			$scope.phones = Phones.query();
		};
	}
]);


