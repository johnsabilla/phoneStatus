'use strict';

// Carriers controller
angular.module('carriers').controller('CarriersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Carriers', 
	function($scope, $stateParams, $location, Authentication, Carriers) {
		$scope.authentication = Authentication;

		// Create new carrier
		$scope.create = function() {

			// Create new carrier object
			var carrier = new Carriers ({
				CarrierName: this.CarrierName,
				Country: this.Country,
				Bands: this.Bands
			});
			
			carrier.Bands.push.apply(carrier.Bands, this.Bands.split(','));

			// Redirect after save
			carrier.$save(function(response) {
				$location.path('carriers/' + response._id);

				// Clear form fields
				$scope.CarrierName = 0;
				$scope.Country = '';
				$scope.Bands = 0;
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Delete a carrier
		$scope.remove = function(carrier) {
			if (carrier) {
				carrier.$remove();

				for (var i in $scope.carriers) {
					if ($scope.carriers[i] === carrier) {
						$scope.carriers.splice(i, 1);
					}
				}
			} else {
				$scope.band.$remove(function() {
					$location.path('carriers');
				});
			}
		};

		// Update existing carrier
		$scope.update = function() {

			var carrier = $scope.carrier;

			carrier.$update(function() {
				$location.path('carriers/' + carrier._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Read a list of carriers
		$scope.find = function() {
			$scope.carriers = Carriers.query();
		};


		// Find existing carriers
		$scope.findOne = function() {
			$scope.carrier = Carriers.get({ 
				carrierId: $stateParams.carrierId
			});

		};

		// Find existing carrier
		$scope.checkBand = function() {
			$scope.carrier = Carriers.get({ 
				carrierId: $stateParams.carrierId
			});

		};

	}

]);