'use strict';

// Goals controller
angular.module('goals').controller('GoalsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Goals',
	function($scope, $stateParams, $location, Authentication, Goals) {
		$scope.authentication = Authentication;
        
        // Authorization prototype
        var role=["admin"]
        if(!$scope.authentication.user){
            $location.path('/signin');
        }
        else if (!_.intersection($scope.authentication.user.roles, role).length){
            $location.path('/campaigns')
        }
        
		// Create new Goal
		$scope.create = function() {
			// Create new Goal object
			var goal = new Goals ({
				name: this.name
			});

			// Redirect after save
			goal.$save(function(response) {
				$location.path('goals/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Goal
		$scope.remove = function(goal) {
			if ( goal ) { 
				goal.$remove();

				for (var i in $scope.goals) {
					if ($scope.goals [i] === goal) {
						$scope.goals.splice(i, 1);
					}
				}
			} else {
				$scope.goal.$remove(function() {
					$location.path('goals');
				});
			}
		};

		// Update existing Goal
		$scope.update = function() {
			var goal = $scope.goal;

			goal.$update(function() {
				$location.path('goals/' + goal._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Goals
		$scope.find = function() {
			$scope.goals = Goals.query();
		};

		// Find existing Goal
		$scope.findOne = function() {
			$scope.goal = Goals.get({ 
				goalId: $stateParams.goalId
			});
		};
	}
]);