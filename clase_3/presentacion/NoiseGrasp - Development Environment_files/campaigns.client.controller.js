'use strict';
var _ = _;
// Campaigns controller
angular.module('campaigns').controller('CampaignsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Campaigns', 'Products', 'Segments', '$modal',
    function($scope, $stateParams, $location, $http, Authentication, Campaigns, Products, Segments, $modal) {
        $scope.authentication = Authentication;

        //TODO: Cambiar el sistema de autorizaciones por un Module de angular que podemamos inyectar en diferentes modulos y realize las validaciones de autorizacion de acceso.
        if (!$scope.authentication.user) {
            $location.path('/signin');
        }
        // Other models
        $scope.products = Products.query();
        $scope.segments = Segments.query();
        $scope.selectionfilter = false;
        $scope.defaultchoice = [{
            text: 'Crear un nuevo escenario'
        }];
        $scope.$watch('selectionfilter', function() {
            if ($scope.selectionfilter) {
                $scope.sort = 'name';
            } else {
                $scope.sort = 'beggining';
            }
        });

        // Create new Campaign
        $scope.create = function() {
            // Create new Campaign object
            var campaign = new Campaigns({
                name: this.name,
                description: this.description,
                beginning: this.beginning,
                end: this.end,
                products: _.map(this.products, function(product) {
                    if (product.selected) {
                        return product._id;
                    } else {
                        return null;
                    }
                }),
                segments: _.map(this.segments, function(segment) {
                    if (segment.selected) {
                        return segment._id;
                    } else {
                        return null;
                    }
                })
            });
            campaign.$save(function(response) {
                $scope.openModal(response._id);

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.openDatepickerBeginning = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedBeginning = true;
        };
        $scope.openDatepickerEnd = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedEnd = true;
        };
        $scope.dateOptions = {
            'show-weeks': false
        };
        $scope.openModal = function(campaignId) {

            var modalInstance = $modal.open({
                templateUrl: 'lib/custom/modal/modal-finished-campaign.client.view.html', // cambiar ruta template
                controller: ModalInstanceCtrl,
                backdrop: 'static',
                keyboard: false,
                windowClass: 'animated fadeIn'
            });

            modalInstance.result.then(function(selectedItem) {
                if (selectedItem === 'scenario') {
                    $location.path('campaigns/' + campaignId + '/scenarios/create');

                } else if (selectedItem === 'campaigns') {
                    $location.path('campaigns');
                }
            }, function() {});
        };

        $scope.modalEliminar = function(campaign) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/campaigns/modal/modal-eliminar.client.view.html', // cambiar ruta template
                controller: ModalFavouriteInstanceCtrl,
                backdrop: 'static',
                windowClass: 'animated fadeIn'
            });

            modalInstance.result.then(function(selectedItem) {
                if (selectedItem === 'change') {
                    $scope.eliminar(campaign);
                }
            }, function() {});

        };

        $scope.modalActivar = function(campaign) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/campaigns/modal/modal-activar.client.view.html', // cambiar ruta template
                controller: ModalFavouriteInstanceCtrl,
                backdrop: 'static',
                windowClass: 'animated fadeIn'
            });

            modalInstance.result.then(function(selectedItem) {
                if (selectedItem === 'change') {
                    $scope.activar(campaign);
                }
            }, function() {});

        };


        var ModalInstanceCtrl = function($scope, $modalInstance) {
            $scope.gotoCreateScenario = function() {
                $modalInstance.close('scenario');
            };
            $scope.gotoCampaigns = function() {
                $modalInstance.close('campaigns');
            };
        };

        var ModalFavouriteInstanceCtrl = function($scope, $modalInstance) {
            $scope.changeFavourite = function() {
                $modalInstance.close('change');
            };
            $scope.keepFavourite = function() {
                $modalInstance.close('keep');
            };
        };



        $scope.changing = function(event) {};
        // Remove existing Campaign
        $scope.remove = function(campaign) {
            if (campaign) {
                campaign.$remove();

                for (var i in $scope.campaigns) {
                    if ($scope.campaigns[i] === campaign) {
                        $scope.campaigns.splice(i, 1);
                    }
                }
            } else {
                $scope.campaign.$remove(function() {
                    $location.path('campaigns');
                });
            }
        };

        // Update existing Campaign
        $scope.update = function() {
            var campaign = $scope.campaign;

            //Copy list of selected products and segments from UI to campaing object
            campaign.products = _.map(this.products, function(product) {
                if (product.selected) {
                    return product._id;
                } else {
                    return null;
                }
            });
            campaign.segments = _.map(this.segments, function(segment) {
                if (segment.selected) {
                    return segment._id;
                } else {
                    return null;
                }
            });

            campaign.$update(function() {
                $location.path('campaigns');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };



        $scope.makeItFavourite = function(campaign) {

            if (campaign.scenario) {
                if (typeof campaign.scenario.isFavourite === 'undefined' && campaign.favourite !== campaign.scenario._id) {
                    campaign.favourite = campaign.scenario._id;
                    var theCampaign = new Campaigns(campaign);

                    theCampaign.$update(function(response) {
                        if (!campaign.scenario.isFavourite) {
                            _.each(campaign.scenarios, function(scenario, i) {
                                if (campaign.scenario._id !== scenario._id) {
                                    scenario.isFavourite = false;
                                }
                            });
                            campaign.scenario.isFavourite = true;
                        }
                    }, function(errorResponse) {});
                } else if (!campaign.scenario.isFavourite) {
                    var modalInstance = $modal.open({
                        templateUrl: 'lib/custom/modal/modal-favourite.client.view.html', // cambiar ruta template
                        controller: ModalFavouriteInstanceCtrl,
                        backdrop: 'static',
                        windowClass: 'animated fadeIn'
                    });

                    modalInstance.result.then(function(selectedItem) {
                        if (selectedItem === 'change') {
                            campaign.favourite = campaign.scenario._id;
                            var theCampaign = new Campaigns(campaign);
                            theCampaign.$update(function(response) {
                                if (!campaign.scenario.isFavourite) {
                                    _.each(campaign.scenarios, function(scenario, i) {
                                        if (campaign.scenario._id !== scenario._id) {
                                            scenario.isFavourite = false;
                                        }
                                    });
                                    campaign.scenario.isFavourite = true;
                                }
                            }, function(errorResponse) {});
                        }
                    }, function() {

                    });
                }
            }


        };


        // Find a list of Campaigns
        $scope.find = function() {
            $scope.campaigns = Campaigns.query({}, function(e) {
                _.forEach($scope.campaigns, function(campaign, v) {
                    $http.get('/campaigns/' + campaign._id + '/scenarios')
                        .success(function(data, status, headers, config) {
                            campaign.scenariosCount = data.length;
                            campaign.scenarios = data;
                            _.forEach(data, function(scenario, v) {
                                scenario.inversiondemedios = (Math.floor(Math.random() * 990) + 10) / 10;
                                scenario.ventasesperadas = (Math.floor(Math.random() * 990) + 10) / 10;
                                scenario.roiesperado = (Math.floor(Math.random() * 1000) + 10) / 10;
                                if (scenario._id === campaign.favourite) {
                                    scenario.isFavourite = true;
                                    campaign.scenario = campaign.scenarios[v];
                                }
                            });
                        })
                        .error(function(data, status, headers, config) {});
                });
            });

        };


        // Find existing Campaign
        $scope.findOne = function() {
            $scope.campaign = Campaigns.get({
                campaignId: $stateParams.campaignId
            }, function() {
                //Convert dates to yyyy-mm-dd for compatibility with input="date" in Chrome
                //TODO: Check alternative browser compatibility
                $scope.campaign.beginning = $scope.campaign.beginning.slice(0, 10);
                $scope.campaign.end = $scope.campaign.end.slice(0, 10);
                //Define selected products and segments in UI based on retrieved campaign
                _.forEach($scope.products, function(product) {
                    if (_.contains($scope.campaign.products, product._id)) {
                        product.selected = true;
                    }
                });
                _.forEach($scope.segments, function(segment) {
                    if (_.contains($scope.campaign.segments, segment._id)) {
                        segment.selected = true;
                    }
                });
            });
        };
        /**
         * ACTIVAR a Scenario
         */
        $scope.activar = function(campaign) {
            campaign = _.extend(campaign, {
                activo: true
            });
            var newScenario = new Campaigns(campaign);
            newScenario.$update(function(message) {
                $scope.campaign.activo = message.activo;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        /**
         * ELIMINAR a Scenario
         */
        $scope.eliminar = function(campaign) {
            campaign = _.extend(campaign, {
                activo: false
            });
            var newScenario = new Campaigns(campaign);
            newScenario.$update(function(message) {
                $scope.campaign.activo = message.activo;
                $location.path('campaigns/');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        //UI
        $scope.checkAll = function(array) {
            for (var i = 0, len = array.length; i < len; i++) {
                array[i].selected = true;
            }
        };
        $scope.uncheckAll = function(array) {
            for (var i = 0, len = array.length; i < len; i++) {
                array[i].selected = false;
            }
        };
        $scope.sort = 'name';
        $scope.resort = function(attribute) {
            $scope.sort = attribute;
        };
        $scope.singleCampaignView = '/modules/campaigns/views/single-campaign.client.view.html';
        $scope.updateSelectedScenarioForCampaign = function(theCampaign){
        };
        $scope.showscope = function() {
            console.log($scope);
        };
    }
]);
