'use strict';

// Medium categories controller
angular.module('medium-categories').controller('MediumCategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'MediumCategories',
	function($scope, $stateParams, $location, Authentication, MediumCategories) {
		$scope.authentication = Authentication;
        
        // Authorization prototype
        var role=["admin"]
        if(!$scope.authentication.user){
            $location.path('/signin');
        }
        else if (!_.intersection($scope.authentication.user.roles, role).length){
            $location.path('/campaigns')
        }
        
		// Create new Medium category
		$scope.create = function() {
			// Create new Medium category object
			var mediumCategory = new MediumCategories ({
				name: this.name
			});

			// Redirect after save
			mediumCategory.$save(function(response) {
				$location.path('medium-categories/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Medium category
		$scope.remove = function(mediumCategory) {
			if ( mediumCategory ) { 
				mediumCategory.$remove();

				for (var i in $scope.mediumCategories) {
					if ($scope.mediumCategories [i] === mediumCategory) {
						$scope.mediumCategories.splice(i, 1);
					}
				}
			} else {
				$scope.mediumCategory.$remove(function() {
					$location.path('medium-categories');
				});
			}
		};

		// Update existing Medium category
		$scope.update = function() {
			var mediumCategory = $scope.mediumCategory;

			mediumCategory.$update(function() {
				$location.path('medium-categories/' + mediumCategory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Medium categories
		$scope.find = function() {
			$scope.mediumCategories = MediumCategories.query();
		};

		// Find existing Medium category
		$scope.findOne = function() {
			$scope.mediumCategory = MediumCategories.get({ 
				mediumCategoryId: $stateParams.mediumCategoryId
			});
		};
	}
]);