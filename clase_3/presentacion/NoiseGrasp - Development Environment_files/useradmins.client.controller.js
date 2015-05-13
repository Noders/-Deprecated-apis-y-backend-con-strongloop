'use strict';

// Useradmins controller
angular.module('useradmins').controller('UseradminsController', ['$scope', '$http', '$q', '$stateParams', '$location', 'Authentication', 'Useradmins',
	function($scope, $http, $q, $stateParams, $location, Authentication, Useradmins) {
		$scope.authentication = Authentication;
        $scope.roles = [{name:'user'},{name:'admin'}];
        // Authorization prototype
        var role=['admin'];
        if(!$scope.authentication.user){
            $location.path('/signin');
        }else if (!_.intersection($scope.authentication.user.roles, role).length){
            $location.path('/campaigns');
        }
        
        
		// Create new Useradmin
		$scope.create = function() {
			// Clear error and success mesages
			$scope.success = $scope.error = null;
			
			$http.post('/admin/users', $scope.credentials).success(function(response) {
				$scope.credentials = null;
				$scope.success = 'Usuario creado correctamente';
				$location.path('/admin/users/create');
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

        $scope.disableUser = function(){
            $scope.disableSuccess = $scope.disableError = null;
			$http.post('/admin/users/'+$scope.useradmin._id+'/disable', {}).success(function(response) {
				$scope.disableSuccess = 'Usuario deshabilitado correctamente';
                $scope.useradmin.enabled = response.enabled;
			}).error(function(response) {
				$scope.disableError = response.message;
			});
        }
        
        $scope.enableUser = function(){
            $scope.disableSuccess = $scope.disableError = null;
			$http.post('/admin/users/'+$scope.useradmin._id+'/enable', {}).success(function(response) {
				$scope.disableSuccess = 'Usuario habilitado correctamente';
				$scope.useradmin.enabled = response.enabled;
			}).error(function(response) {
				$scope.disableError = response.message;
			});
        }
        
		// Remove existing Useradmin
		$scope.remove = function(useradmin) {
			if ( useradmin ) { 
				useradmin.$remove();

				for (var i in $scope.useradmins) {
					if ($scope.useradmins [i] === useradmin) {
						$scope.useradmins.splice(i, 1);
					}
				}
			} else {
				$scope.useradmin.$remove(function() {
					$location.path('useradmins');
				});
			}
		};

		// Update existing Useradmin
		$scope.update = function() {
			var useradmin = $scope.useradmin;
		    var rol = _.without(_.map($scope.roles, function(rol){
					if(rol.selected){
						return rol.name;
					}
					else{
						//-1 representing media not to be included. Used to filter out with _.without()
						return -1;
					}
				}),-1);
			useradmin.roles = rol;
			useradmin.$update(function() {
				$location.path('admin/users/' + useradmin._id);
				//$location.path('admin/users');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};
		
		
 
		// Find a list of Useradmins
		$scope.find = function() {
	    	$scope.users = Useradmins.query();
            
		};
		
		// Change the user password
		$scope.resetUserPassword = function(){
		    $scope.passwordsuccess = $scope.passworderror = null;
			var ob = {
			    userId : $scope.useradmin._id,
			    passwordDetails : $scope.passwordDetails
			}
			
			$http.post('/admin/users/'+$scope.useradmin._id+'/updatePassword', ob).success(function(response) {
				$scope.passwordDetails = null;
				$scope.success = 'Contraseña cambiada';
			}).error(function(response) {
				$scope.error = response.message;
			});
			
			

		}

		// Find existing Useradmin 
		$scope.findOne = function() {

			$scope.useradmin = Useradmins.get({ 
				useradminId: $stateParams.userId
			},function(){
                var userRoles = $scope.useradmin.roles;
                _.each($scope.roles,function(rol){
                    if(_.contains(userRoles, rol.name)){
                        rol.selected = true;
                    }else{
                        rol.selected = false;
                    }
                });
			});
			
		};
	}
]);