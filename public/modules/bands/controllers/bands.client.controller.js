'use strict';

// Bands controller
angular.module('bands').controller('BandsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bands', 
	function($scope, $stateParams, $location, Authentication, Bands) {
		$scope.authentication = Authentication;

		// Create new band
		$scope.create = function() {

			// Create new band object
			var band = new Bands ({
				Frequency: this.Frequency,
				Protocol: this.Protocol,
				Band: this.Band
			});
			
			// Redirect after save
			band.$save(function(response) {
				$location.path('bands/' + response._id);

				// Clear form fields
				$scope.Frequency = 0;
				$scope.Protocol = '';
				$scope.Band = 0;
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Delete a band
		$scope.remove = function(band) {
			if (band) {
				band.$remove();

				for (var i in $scope.bands) {
					if ($scope.bands[i] === band) {
						$scope.bands.splice(i, 1);
					}
				}
			} else {
				$scope.band.$remove(function() {
					$location.path('bands');
				});
			}
		};

		// Update existing band
		$scope.update = function() {

			var band = $scope.band;

			band.$update(function() {
				$location.path('bands/' + band._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Read a list of bands
		$scope.find = function() {
			$scope.bands = Bands.query();
		};


		// Find existing bands
		$scope.findOne = function() {
			$scope.band = Bands.get({ 
				bandId: $stateParams.bandId
			});

		};

		// Find existing band
		$scope.checkBand = function() {
			$scope.band = Bands.get({ 
				bandId: $stateParams.bandId
			});

		};

	}
]);