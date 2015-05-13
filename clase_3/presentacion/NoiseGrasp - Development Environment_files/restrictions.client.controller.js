'use strict';

// Restrictions controller
angular.module('restrictions').controller('RestrictionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Restrictions',
	function($scope, $stateParams, $location, Authentication, Restrictions) {
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

		//UI
		$scope.fields = [{}];
		$scope.fields[0].optionsList = [];

		//Add field to restriction
		$scope.addField = function() {
			$scope.fields.push({optionsList: []});
		}

		//Remove field from restriction
		$scope.removeField = function(field) {
			$scope.fields.splice($scope.fields.indexOf(field),1);
		}

		//Add option to field
		$scope.addOption = function(field) {
			field.optionsList.push({});
		}

		//Remove option from field
		$scope.removeOption = function(field, option) {
			field.optionsList.splice(field.optionsList.indexOf(option),1);
		}

		// Create new Restriction
		$scope.create = function() {
			// Create new Restriction object
			var restriction = new Restrictions ({
				name: this.name,
				title: this.title,
				fields: this.fields
			});

			// Redirect after save
			restriction.$save(function(response) {
				$location.path('restrictions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Restriction
		$scope.remove = function(restriction) {
			if ( restriction ) { 
				restriction.$remove();

				for (var i in $scope.restrictions) {
					if ($scope.restrictions [i] === restriction) {
						$scope.restrictions.splice(i, 1);
					}
				}
			} else {
				$scope.restriction.$remove(function() {
					$location.path('restrictions');
				});
			}
		};

		// Update existing Restriction
		$scope.update = function() {
			var restriction = $scope.restriction;

			restriction.$update(function() {
				$location.path('restrictions/' + restriction._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Restrictions
		$scope.find = function() {
			$scope.restrictions = Restrictions.query();
		};

		// Find existing Restriction
		$scope.findOne = function() {
			$scope.restriction = Restrictions.get({ 
				restrictionId: $stateParams.restrictionId
			});
		};
	}
]);
