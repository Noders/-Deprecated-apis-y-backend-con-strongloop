'use strict';
var _ = _;
var $ = $;

// Scenarios controller
angular.module('scenarios').controller('ScenariosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Scenarios', 'Goals', 'Media', 'MediumCategories', 'Restrictions', '$http', 'Campaigns', '$modal',
    function($scope, $stateParams, $location, Authentication, Scenarios, Goals, Media, MediumCategories, Restrictions, $http, Campaigns, $modal) {
        $scope.authentication = Authentication;
        $scope.campaignId = $stateParams.campaignId;
        $scope.scenarioId = $stateParams.scenarioId;
        $scope.goals = Goals.query();
        $scope.restrictions = Restrictions.query();
        $scope.cantidad = [0, 1, 2, 3];
        // Initial values
        $scope.timeframe = 3;
        $scope.scenarioRestrictions = [];

        // Retrieve campaign id from path
        // Add new restriction
        $scope.tabs = {};
        $scope.tabs.selected = 1;
        $scope.getMediumCategoriesWithMedia = function(cb) {
            $scope.media = Media.query(function() {
                $scope.mediumCategories = MediumCategories.query(function() {
                    _.each($scope.mediumCategories, function(category, index) {
                        category.cantidadDeMedios = 0;
                        _.each($scope.media, function(media, index) {
                            if (media.category === category._id) {
                                category.cantidadDeMedios++;
                            }
                        });
                    });
                    if (cb) {
                        cb($scope.campaignId, $stateParams.scenarioId);
                    }
                });
            });
        };
        $scope.tabs.isSelected = function(theIndex) {
            var selected = $scope.tabs.selected;
            if (selected === theIndex) {
                return 'active';
            } else {
                return '';
            }
        };
        $scope.tabs.setMaster = function($event) {
            $scope.tabs.selected = parseInt($($event.target).parent().attr('index'));
            $scope.updateGraphs($event);
        };

        $scope.updateGraphs = function($event) {};

        $scope.addRestriction = function(restrictionType) {
            $scope.scenarioRestrictions.push({
                name: restrictionType.name,
                restrictionType: restrictionType
            });
        };

        // Add new restriction to current scenario
        $scope.addRestrictionToScenario = function(restrictionType) {
            $scope.scenario.restrictions.push({
                name: restrictionType.name,
                restrictionType: restrictionType
            });
        };

        // Remove restriction
        $scope.removeRestriction = function(restriction) {
            var r = confirm('Seguro que desea borrar esta restriccion');
            if (r === true) {
                $scope.scenarioRestrictions.splice($scope.scenarioRestrictions.indexOf(restriction), 1);
            }
        };
        // Remove restriction from a specific scenario
        $scope.removeRestrictionFromScenario = function(restriction) {
            var r = confirm('Seguro que desea borrar esta restriccion');
            if (r === true) {
                $scope.scenario.restrictions.splice($scope.scenarioRestrictions.indexOf(restriction), 1);
            }
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

        // Create new Scenario
        $scope.create = function() {
            // Create new Scenario object
            var scenario = new Scenarios({
                name: this.name,
                campaign: this.campaignId,
                goal: this.goal,
                timeframe: this.timeframe,
                media: _.without(_.map(this.media, function(medium) {
                    if (medium.selected) {
                        return medium._id;
                    } else {
                        //-1 representing media not to be included. Used to filter out with _.without()
                        return -1;
                    }
                }), -1),
                restrictions: this.scenarioRestrictions
            });
            // Redirect after save

            scenario.$save(function(response) {
                $location.path('campaigns');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        // Remove existing Scenario
        $scope.remove = function(scenario) {
            if (scenario) {
                scenario.$remove();

                for (var i in $scope.scenarios) {
                    if ($scope.scenarios[i] === scenario) {
                        $scope.scenarios.splice(i, 1);
                    }
                }
            } else {
                $scope.scenario.$remove(function() {
                    $location.path('scenarios');
                });
            }
        };

        // Update existing Scenario
        $scope.update = function() {
            var scenario = new Scenarios({
                _id: $scope.scenario._id,
                name: $scope.scenario.name,
                campaign: $scope.scenario.campaign,
                goal: $scope.scenario.goal,
                timeframe: $scope.scenario.timeframe,
                media: _.without(_.map($scope.media, function(medium) {
                    if (medium.selected) {
                        return medium._id;
                    } else {
                        //-1 representing media not to be included. Used to filter out with _.without()
                        return -1;
                    }
                }), -1),
                restrictions: $scope.scenario.restrictions
            });
            scenario.$update(function(message) {
                $location.path('campaigns/' + $scope.campaignId + '/scenarios');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        // Find the list of Scenarios for a specified campaign
        //TODO: This is not how it should be done. Refactor ASAP.
        //TODO: Remember to remove $http from the controller's dependencies

        $scope.findCampaignById = function() {
            $http.get('/campaigns/' + $scope.campaignId)
                .success(function(data, status, headers, config) {
                    $scope.campaign = data;
                })
                .error(function(data, status, headers, config) {});
            getScenariosForCampaign($scope.campaignId);
        };
        $scope.find = function() {
            $http.get('/campaigns/' + $scope.campaignId)
                .success(function(data, status, headers, config) {
                    $scope.campaign = data;
                })
                .error(function(data, status, headers, config) {});
            getScenariosForCampaign($scope.campaignId);
        };
        var getScenariosForCampaign = function(campaign) {
            $http.get('/campaigns/' + campaign + '/scenarios')
                .success(function(data, status, headers, config) {
                    _.each(data, function(escenario, i) {
                        if ($scope.scenarioId === escenario._id) {
                            $scope.campaign.scenario = escenario;
                        }
                        if ($scope.campaign &&
                            $scope.campaign.favourite &&
                            $scope.campaign.favourite === escenario._id) {
                            escenario.isFavourite = true;
                        } else {
                            escenario.isFavourite = false;
                        }
                    });

                    $scope.scenarios = data;
                    $scope.campaign.scenarios = data;
                    $scope.$watch(function() {
                        return $scope.campaign.scenario._id;
                    }, function(newVal, oldVal) {
                        if (newVal && oldVal && newVal !== oldVal) {
                            $location.path('campaigns/' + $scope.campaignId + '/scenarios/' + newVal);
                        }
                    });



                })
                .error(function(data, status, headers, config) {});
        };

        var getOneScenarioForCampaignEdit = function(campaign, scenario) {
            $scope.campaign = Campaigns.get({
                campaignId: $scope.campaignId
            }, function() {

                delete $scope.campaign.beginning;
                delete $scope.campaign.created;
                delete $scope.campaign.description;
                delete $scope.campaign.end;
                delete $scope.campaign.name;
                delete $scope.campaign.products;
                delete $scope.campaign.segments;
                delete $scope.campaign.user;

                $http.get('/campaigns/' + campaign + '/scenarios/' + scenario)
                    .success(function(data, status, headers, config) {
                        $scope.scenario = data[0];
                        var scenariosMediums = [];
                        _.forEach($scope.mediumCategories, function(mediumCategory) {
                            _.forEach($scope.media, function(medium) {
                                if (mediumCategory._id === medium.category && _.contains($scope.scenario.media, medium._id)) {
                                    medium.selected = true;
                                    scenariosMediums.push(medium);
                                }
                            });
                        });
                        if ($scope.campaign && $scope.campaign.favourite && $scope.campaign.favourite === $scope.scenario._id) {
                            $scope.scenario.isFavourite = true;
                        } else {
                            $scope.scenario.isFavourite = false;
                        }
                    })
                    .error(function(data, status, headers, config) {});
            });
        };


        var getOneScenarioForCampaign = function(campaign, scenario) {
            $http.get('/campaigns/' + campaign + '/scenarios/' + scenario)
                .success(function(data, status, headers, config) {
                    $scope.scenario = data[0];
                    var scenariosMediums = [];
                    _.forEach($scope.mediumCategories, function(mediumCategory) {
                        _.forEach($scope.media, function(medium) {
                            if (mediumCategory._id === medium.category && _.contains($scope.scenario.media, medium._id)) {
                                medium.selected = true;
                                scenariosMediums.push(medium);
                            }
                        });
                    });
                    if ($scope.campaign && $scope.campaign.favourite && $scope.campaign.favourite === $scope.scenario._id) {
                        $scope.scenario.isFavourite = true;
                    } else {
                        $scope.scenario.isFavourite = false;
                    }
                    $scope.scenario.processedMediums = scenariosMediums;
                    $scope.consolidatedMediumMediaObject = $scope.returnJsonForMVP();
                })
                .error(function(data, status, headers, config) {});
        };


        $scope.returnJsonForMVP = function() {
            var total = {
                _meta: {
                    name: 'TOTAL',
                    cantidademedia: 0
                },
                consolidated: {
                    inversionyventas: {
                        'ventas': 0, //measures,barra
                        'inversion': 0, //markers, linea vertical
                        'rango': 0, //ranges , el numero final del grafico
                    },
                    roi: {
                        'value': 0
                    },
                    contribucionalroi: {
                        'retorno': 0, //measures, barra
                        'inversion': 0, //markers, linea vertical
                        'rango': 0, //ranges, el numero final del grafico
                    }
                },
                media: []
            };
            _.each($scope.mediumCategories, function(data) {
                var ob = {};
                ob._meta = data;
                ob._meta.show = true;
                ob._meta.cantidaddemedios = 0;
                ob.mediums = [];
                ob.consolidated = {
                    inversionyventas: {
                        'ventas': 0, //measures,barra
                        'inversion': 0, //markers, linea vertical
                        'rango': 0, //ranges , el numero final del grafico
                    },
                    roi: {
                        'value': 0
                    },
                    contribucionalroi: {
                        'retorno': 0, //measures, barra
                        'inversion': 0, //markers, linea vertical
                        'rango': 0, //ranges, el numero final del grafico
                    }
                };
                _.each($scope.scenario.processedMediums, function(data2) {
                    if (ob._meta._id !== data2.category) return;
                    var ob2 = {};
                    ob2._meta = data2;
                    var inversionyventas_inversion = Math.floor((Math.random() * 1000) + 100);
                    ob2.data = {
                        inversionyventas: {
                            "ventas": Math.floor((Math.random() * 1000) + 100), //measures,barra
                            "inversion": inversionyventas_inversion, //markers, linea vertical
                            "rango": inversionyventas_inversion + 100, //ranges , el numero final del grafico
                        },
                        roi: {
                            "value": Math.floor((Math.random() * 199) + 10)
                        },
                        contribucionalroi: {
                            "retorno": Math.floor((Math.random() * 100)), //measures, barra
                            "inversion": Math.floor((Math.random() * 100)), //markers, linea vertical
                            "rango": Math.floor((Math.random() * 100)), //ranges, el numero final del grafico
                        }
                    };


                    ob._meta.cantidaddemedios++;
                    ob.consolidated.inversionyventas.ventas += ob2.data.inversionyventas.ventas;
                    ob.consolidated.inversionyventas.ventas += ob2.data.inversionyventas.ventas;
                    ob.consolidated.inversionyventas.inversion += ob2.data.inversionyventas.inversion;
                    ob.consolidated.roi.value += ob2.data.roi.value;
                    ob.consolidated.contribucionalroi.rango += ob2.data.contribucionalroi.rango;
                    ob.consolidated.contribucionalroi.retorno += ob2.data.contribucionalroi.retorno;
                    ob.consolidated.contribucionalroi.inversion += ob2.data.contribucionalroi.inversion;
                    ob.mediums.push(ob2);
                });

                //ob.mediums.data.inversionyventas.inversion
                total._meta.cantidaddemedia++;
                total.consolidated.inversionyventas.rango += ob.consolidated.inversionyventas.rango;
                total.consolidated.inversionyventas.ventas += ob.consolidated.inversionyventas.ventas;
                total.consolidated.inversionyventas.inversion += ob.consolidated.inversionyventas.inversion;
                total.consolidated.roi.value += ob.consolidated.roi.value;
                total.consolidated.contribucionalroi.rango += ob.consolidated.contribucionalroi.rango;
                total.consolidated.contribucionalroi.retorno += ob.consolidated.contribucionalroi.retorno;
                total.consolidated.contribucionalroi.inversion += ob.consolidated.contribucionalroi.inversion;

                total.media.push(ob);
            });

            return total;
        };

        /**
         * Find Exisiting Scenario
         */
        $scope.findOne = function() {
            $scope.getMediumCategoriesWithMedia(getOneScenarioForCampaign);

        };
        /**
         * Find Exisiting Scenario for scenario edit only
         */
        $scope.findOneEdit = function() {
            $scope.getMediumCategoriesWithMedia(getOneScenarioForCampaignEdit);

        };


        /**
         * ACTIVAR a Scenario
         */
        $scope.activar = function(scenario) {
            scenario = _.extend(scenario, {
                activo: true
            });
            var newScenario = new Scenarios(scenario);
            newScenario.$update(function(message) {
                //$location.path('campaigns/' + $scope.campaignId + '/scenarios');
                $scope.scenario.activo = message.activo;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        /**
         * ELIMINAR a Scenario
         */
        $scope.eliminar = function(scenario) {
            scenario = _.extend(scenario, {
                activo: false
            });
            var newScenario = new Scenarios(scenario);
            newScenario.$update(function(message) {
                $scope.scenario.activo = message.activo;
                $location.path('campaigns/');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };



        $scope.modalEliminar = function(scenario) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/scenarios/modal/modal-eliminar.client.view.html', // cambiar ruta template
                controller: ModalFavouriteInstanceCtrl,
                backdrop: 'static',
                windowClass: 'animated fadeIn'
            });

            modalInstance.result.then(function(selectedItem) {
                if (selectedItem === 'change') {
                    $scope.eliminar(scenario);
                }
            }, function() {

            });

        };

        $scope.modalActivar = function(scenario) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/scenarios/modal/modal-activar.client.view.html', // cambiar ruta template
                controller: ModalFavouriteInstanceCtrl,
                backdrop: 'static',
                windowClass: 'animated fadeIn'
            });

            modalInstance.result.then(function(selectedItem) {
                if (selectedItem === 'change') {
                    $scope.activar(scenario);
                }
            }, function() {

            });

        };


        var ModalInstanceCtrl = function($scope, $modalInstance) {
            $scope.gotoCreateScenario = function() {
                $modalInstance.close("scenario");
            };
            $scope.gotoCampaigns = function() {
                $modalInstance.close("campaigns");
            };
        };

        var ModalFavouriteInstanceCtrl = function($scope, $modalInstance) {
            $scope.changeFavourite = function() {
                $modalInstance.close("change");
            };
            $scope.keepFavourite = function() {
                $modalInstance.close("keep");
            };
        };


        //Sample data for testing //TODO: remove
        $scope.labels = ["Segmento 1", "Segmento 2", "Segmento 3", "Segmento 4", "Segmento 5"];
        $scope.data = [300, 500, 100, 80, 140];
        $scope.findCampaignById();
        $scope.setSubtabs = function() {
            $scope.subtabs = {};
            $scope.subtabs.selected = null;
            $scope.subtabs.templates = {}
            $scope.subtabs.templates.plan = {}
            $scope.subtabs.templates.plan.roi = "/modules/scenarios/views/subtabs/plan/roi.html";
            $scope.subtabs.templates.plan.ventas = "/modules/scenarios/views/subtabs/plan/ventas.html";
            $scope.subtabs.templates.plan.inversion = "/modules/scenarios/views/subtabs/plan/inversion.html";
            $scope.subtabs.templates.plan.estrategia = "/modules/scenarios/views/subtabs/plan/estrategia.html";
            $scope.subtabs.templates.plan.marca = "/modules/scenarios/views/subtabs/plan/marca.html";

            $scope.$watch(function() {
                return $scope.subtabs.selected;
            }, function(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    $scope.subtabs.templates.plan.selected = $scope.subtabs.templates.plan[$scope.subtabs.selected];
                }
            });
            
        };

        $scope.showScope = function() {
            console.log($scope);
        };
        $scope.setSubtabs();
        $scope.changeVisibility = function(data) {
            data._meta.show = !data._meta.show;
        };
    }
]);
