'use strict';

// Phones controller
angular.module('phones').controller('PhonesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Phones',
	function($scope, $stateParams, $location, Authentication, Phones ) {
		$scope.authentication = Authentication;

		// Create new phone
		$scope.create = function() {

			// Create new phone object
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

		//Delete a phone
		$scope.remove = function(phone) {
			if (phone) {
				phone.$remove();

				for (var i in $scope.phones) {
					if ($scope.phones[i] === phone) {
						$scope.phones.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('phones');
				});
			}
		};

		// Update existing phone
		$scope.update = function() {
			var phone = $scope.phone ;

			phone.$update(function() {
				$location.path('phones/' + phone._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Read a list of phones
		$scope.find = function() {
			$scope.phones = Phones.query();
		};


		// Find existing phone
		$scope.findOne = function() {
			$scope.phone = Phones.get({ 
				phoneId: $stateParams.phoneId
			});
		};
		
	}
]);


