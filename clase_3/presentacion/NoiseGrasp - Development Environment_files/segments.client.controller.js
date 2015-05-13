'use strict';

// Segments controller
angular.module('segments').controller('SegmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Segments',
	function($scope, $stateParams, $location, Authentication, Segments) {
		$scope.authentication = Authentication;
        
        
        // 
        var role=['admin'];
        if(!$scope.authentication.user){
            $location.path('/signin');
        }
        else if (!_.intersection($scope.authentication.user.roles, role).length){
            $location.path('/campaigns')
        }

		// Create new Segment
		$scope.create = function() {
			// Create new Segment object
			var segment = new Segments ({
				name: this.name
			});

			// Redirect after save
			segment.$save(function(response) {
				$location.path('segments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Segment
		$scope.remove = function(segment) {
			if ( segment ) { 
				segment.$remove();

				for (var i in $scope.segments) {
					if ($scope.segments [i] === segment) {
						$scope.segments.splice(i, 1);
					}
				}
			} else {
				$scope.segment.$remove(function() {
					$location.path('segments');
				});
			}
		};

		// Update existing Segment
		$scope.update = function() {
			var segment = $scope.segment;

			segment.$update(function() {
				$location.path('segments/' + segment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Segments
		$scope.find = function() {
			$scope.segments = Segments.query();
		};

		// Find existing Segment
		$scope.findOne = function() {
			$scope.segment = Segments.get({ 
				segmentId: $stateParams.segmentId
			});
		};
	}
]);