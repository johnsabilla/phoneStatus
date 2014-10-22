'use strict';

(function() {
	// Phones Controller Spec
	describe('PhonesController', function() {
		// Initialize global variables
		var PhonesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});


		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Phones controller.
			PhonesController = $controller('PhonesController', {
				$scope: scope
			});
		}));



		it('$scope.find() should create an array with at least one phone object fetched from XHR', inject(function(Phones) {
			// Create sample phone using the Phones service
			var samplePhone = new Phones({

				Name: 'JohnSung',
				ModelNumber: 'ABC123',
				GSMBands: ['GSM1','GSM2','GSM3','GSM3'],
				LTEFDDBands: ['LTE1','LTE2','LTE3','LTE4'],
				UMTSBands: ['UMTS1','UMTS2','UMTS3','UMTS4'],
				TDSCDMABands: ['TDSCDMA1','TDSCDMA2','TDSCDMA3','TDSCDMA4']

			});

			// Create a sample phones array that includes the new phone
			var samplePhones = [samplePhone];

			// Set GET response
			$httpBackend.expectGET('phones').respond(samplePhones);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.phones).toEqualData(samplePhones);
		}));


		it('$scope.findOne() should create an array with one phone object fetched from XHR using a phoneId URL parameter', inject(function(Phones) {
			// Create sample phone using the Phones service
			var samplePhone = new Phones({

				Name: 'JohnSung',
				ModelNumber: 'ABC123',
				GSMBands: ['GSM1','GSM2','GSM3','GSM3'],
				LTEFDDBands: ['LTE1','LTE2','LTE3','LTE4'],
				UMTSBands: ['UMTS1','UMTS2','UMTS3','UMTS4'],
				TDSCDMABands: ['TDSCDMA1','TDSCDMA2','TDSCDMA3','TDSCDMA4']

			});

			// Set the URL parameter
			$stateParams.phoneId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/phones\/([0-9a-fA-F]{24})$/).respond(samplePhone);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.phone).toEqualData(samplePhone);
		}));

	});
}());