'use strict';

angular.module('phones').controller('myPhonesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Phones', 'Bands', 
	function($scope, $stateParams, $location, Authentication, Phones, Bands) {


		var myBands = new Bands($scope.Band);
		

		$scope.checkBands = function(){
			myBands.Frequency = 9999;
		};

		
	}
]);
