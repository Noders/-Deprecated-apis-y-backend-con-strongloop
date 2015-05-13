'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', '$modal', '$window',
    function($scope, $http, $location, Users, Authentication, $modal, $window) {
        $scope.user = Authentication.user;

        $scope.open = function(campaignId) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/users/views/modals/modal-success-profile-change.client.view.html',
                controller: ModalInstanceCtrl,
                backdrop: 'static',
                windowClass: 'animated fadeIn'
            });
            modalInstance.result.then(function(selectedItem) {
                if (selectedItem === 'return') {
                	$window.history.back();
                } 
            }, function() {

            });
        };


        $scope.openPassword = function(campaignId) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/users/views/modals/modal-success-password-change.client.view.html',
                controller: ModalInstanceCtrl,
                backdrop: 'static',
                windowClass: 'animated fadeIn'
            });
            modalInstance.result.then(function(selectedItem) {
                if (selectedItem === 'return') {
                	$window.history.back();
                } 
            }, function() {

            });
        };

        var ModalInstanceCtrl = function($scope, $modalInstance) {
            $scope.gotoPreviousPage = function() {
                $modalInstance.close('return');
            };
        };

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

        // Check if there are additional accounts 
        $scope.hasConnectedAdditionalSocialAccounts = function(provider) {
            for (var i in $scope.user.additionalProvidersData) {
                return true;
            }

            return false;
        };

        // Check if provider is already in use with current user
        $scope.isConnectedSocialAccount = function(provider) {
            return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
        };

        // Remove a user social account
        $scope.removeUserSocialAccount = function(provider) {
            $scope.success = $scope.error = null;

            $http.delete('/users/accounts', {
                params: {
                    provider: provider
                }
            }).success(function(response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.user = Authentication.user = response;
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        // Update a user profile
        $scope.updateUserProfile = function(isValid) {
            if (isValid) {
                $scope.success = $scope.error = null;
                if ($scope.user && $scope.user.username) {
                    delete $scope.user.username;
                }
                var user = new Users($scope.user);
                user.$update(function(response) {
                    $scope.open();
                    Authentication.user = response;

                }, function(response) {
                    $scope.error = response.data.message;
                });
            } else {
                $scope.submitted = true;
            }
        };

        // Change user password
        $scope.changeUserPassword = function() {
            $scope.success = $scope.error = null;
            $http.post('/users/password', $scope.passwordDetails).success(function(response) {
                // If successful show success message and clear form
                $scope.passwordDetails = null;
                $scope.openPassword();
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);
