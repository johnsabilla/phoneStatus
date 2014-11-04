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
				GSMBands: [],
				LTEFDDBands: [],
				ModelNumber: this.modelnumber,
				UMTSBands: [],
				TDSCDMABands: []
			});
			
			// Convert comma separated string to array of strings and add to phone
			phone.GSMBands.push.apply(phone.GSMBands, this.gsmbands.split(','));
			phone.LTEFDDBands.push.apply(phone.LTEFDDBands, this.ltefddbands.split(','));
			phone.UMTSBands.push.apply(phone.UMTSBands, this.umtsbands.split(','));
			phone.TDSCDMABands.push.apply(phone.TDSCDMABands, this.tdscdmabands.split(','));

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
				$scope.phone.$remove(function() {
					$location.path('phones');
				});
			}
		};

		// Update existing phone
		$scope.update = function() {

			//Make sure that we re-insert the string as an array of strings
			$scope.phone.GSMBands = $scope.phone.GSMBands.split(',');
			$scope.phone.UMTSBands = $scope.phone.UMTSBands.split(',');
			$scope.phone.LTEFDDBands = $scope.phone.LTEFDDBands.split(',');
			$scope.phone.TDSCDMABands = $scope.phone.TDSCDMABands.split(',');
			var phone = $scope.phone;

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

			
			console.log('test');
	/*		$scope.band = Bands.get({
				band: 
			});*/
		};
		
	}
]);


