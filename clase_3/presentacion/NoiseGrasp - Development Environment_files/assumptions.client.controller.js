'use strict';

// Assumptions controller
angular.module('assumptions').controller('AssumptionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Assumptions',
	function($scope, $stateParams, $location, Authentication, Assumptions) {
		$scope.authentication = Authentication;

		// Create new Assumption
		$scope.create = function() {
			// Create new Assumption object
			var assumption = new Assumptions ({
				name: this.name
			});

			// Redirect after save
			assumption.$save(function(response) {
				$location.path('assumptions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Assumption
		$scope.remove = function(assumption) {
			if ( assumption ) { 
				assumption.$remove();

				for (var i in $scope.assumptions) {
					if ($scope.assumptions [i] === assumption) {
						$scope.assumptions.splice(i, 1);
					}
				}
			} else {
				$scope.assumption.$remove(function() {
					$location.path('assumptions');
				});
			}
		};

		// Update existing Assumption
		$scope.update = function() {
			var assumption = $scope.assumption;

			assumption.$update(function() {
				$location.path('assumptions/' + assumption._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Assumptions
		$scope.find = function() {
			$scope.assumptions = Assumptions.query();
		};

		// Find existing Assumption
		$scope.findOne = function() {
			$scope.assumption = Assumptions.get({ 
				assumptionId: $stateParams.assumptionId
			});
		};
	}
]);