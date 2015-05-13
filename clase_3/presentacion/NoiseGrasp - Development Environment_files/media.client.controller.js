'use strict';

// Media controller
angular.module('media').controller('MediaController', ['$scope', '$stateParams', '$location', 'Authentication', 'Media', 'MediumCategories' ,
	function($scope, $stateParams, $location, Authentication, Media, MediumCategories) {
		$scope.authentication = Authentication;

        
        // Authorization prototype
        var role=["admin"]
        if(!$scope.authentication.user){
            $location.path('/signin');
        }
        else if (!_.intersection($scope.authentication.user.roles, role).length){
            $location.path('/campaigns')
        }
        
		//Other models
		$scope.mediumCategories = MediumCategories.query();

		// Create new Medium
		$scope.create = function() {
			// Create new Medium object
			var medium = new Media ({
				name: this.name,
				category: this.category._id
			});

			// Redirect after save
			medium.$save(function(response) {
				$location.path('media/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Medium
		$scope.remove = function(medium) {
			if ( medium ) { 
				medium.$remove();

				for (var i in $scope.media) {
					if ($scope.media [i] === medium) {
						$scope.media.splice(i, 1);
					}
				}
			} else {
				$scope.medium.$remove(function() {
					$location.path('media');
				});
			}
		};

		// Update existing Medium
		$scope.update = function() {
			var medium = $scope.medium;

			medium.$update(function() {
				$location.path('media/' + medium._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Media
		$scope.find = function() {
			$scope.media = Media.query();
		};

		// Find existing Medium
		$scope.findOne = function() {
			$scope.medium = Media.get({ 
				mediumId: $stateParams.mediumId
			});
		};
	}
]);
