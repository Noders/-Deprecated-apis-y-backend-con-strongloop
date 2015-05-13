'use strict';
var _ = _;
var $ = $;
// Scenarios controller
angular.module('scenarios').controller('PlanInversionController', ['$scope', '$stateParams', '$location', 'Authentication', 'Scenarios', 'Goals', 'Media', 'MediumCategories', 'Restrictions', '$http', 'Campaigns', '$modal',
    function($scope, $stateParams, $location, Authentication, Scenarios, Goals, Media, MediumCategories, Restrictions, $http, Campaigns, $modal) {
        $scope.consolidatedMediumMediaObject = $scope.$parent.$parent.consolidatedMediumMediaObject;

        //ORDENA EL ARRAY DE OBJETOS 'ob.medium' DE MAYOR A MENOR, POR el parametro ob.medium[].data.inversionyventas.inversion
        _.each($scope.consolidatedMediumMediaObject.media, function(media, i) {
            media.mediums = _(_.sortBy(media.mediums, function(item) {
                return item.data.inversionyventas.inversion;
            })).reverse().value();
        });

        //ORDENA EL ARRAY DE OBJETOS '$parentScope.consolidatedMediumMediaObject.media' DE MAYOR A MENOR, POR el parametro total.media[].consolidated.inversionyventas.inversion
        $scope.consolidatedMediumMediaObject.media = _(_.sortBy($scope.consolidatedMediumMediaObject.media, function(item) {
            return item.consolidated.inversionyventas.inversion;
        })).reverse().value();
    }
]);


// Scenarios controller
angular.module('scenarios').controller('PlanVentasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Scenarios', 'Goals', 'Media', 'MediumCategories', 'Restrictions', '$http', 'Campaigns', '$modal',
    function($scope, $stateParams, $location, Authentication, Scenarios, Goals, Media, MediumCategories, Restrictions, $http, Campaigns, $modal) {
        $scope.consolidatedMediumMediaObject = $scope.$parent.$parent.consolidatedMediumMediaObject;
        $scope.ventasEsperadasModal = '/modules/scenarios/views/subtabs/plan/ventas_esperadas.html';

        //ORDENA EL ARRAY DE OBJETOS 'ob.medium' DE MAYOR A MENOR, POR el parametro ob.medium[].data.inversionyventas.inversion
        _.each($scope.consolidatedMediumMediaObject.media, function(media, i) {
            media.mediums = _(_.sortBy(media.mediums, function(item) {
                return item.data.inversionyventas.ventas;
            })).reverse().value();
        });

        //ORDENA EL ARRAY DE OBJETOS '$parentScope.consolidatedMediumMediaObject.media' DE MAYOR A MENOR, POR el parametro total.media[].consolidated.inversionyventas.ventas
        $scope.consolidatedMediumMediaObject.media = _(_.sortBy($scope.consolidatedMediumMediaObject.media, function(item) {
            return item.consolidated.inversionyventas.ventas;
        })).reverse().value();

        $scope.showModal = function(name) {
            var modalInstance = $modal.open({
                templateUrl: $scope.ventasEsperadasModal,
                controller: function($scope, $modalInstance) {
                    $scope.name = name;
                    $scope.montoEsperado = 1150000;
                    $scope.porcentajeDeError = 30;
                    $scope.periodoExposicion = 1000000;
                    $scope.residual6Meses = 150000;
                    $scope.closeModal = function() {
                        $modalInstance.dismiss();
                    };
                },
                backdrop: true,
                windowClass: 'animated fadeIn'
            });
        };

    }
]);


// Scenarios controller
angular.module('scenarios').controller('PlanRoiController', ['$scope', '$stateParams', '$location', 'Authentication', 'Scenarios', 'Goals', 'Media', 'MediumCategories', 'Restrictions', '$http', 'Campaigns', '$modal',
    function($scope, $stateParams, $location, Authentication, Scenarios, Goals, Media, MediumCategories, Restrictions, $http, Campaigns, $modal) {
        $scope.consolidatedMediumMediaObject = $scope.$parent.$parent.consolidatedMediumMediaObject;

        /*
            ORDENA EL ARRAY DE OBJETOS 'ob.medium' 
            DE MAYOR A MENOR, 
            POR el parametro 

            (Ademas agrega el valor 
            ob.media.data.roi.valueover100)
        */
        $scope.consolidatedMediumMediaObject.consolidated.roi.valueover100 = $scope.consolidatedMediumMediaObject.consolidated.roi.value/100;
        _.each($scope.consolidatedMediumMediaObject.media, function(media, i) {
            media.consolidated.roi.valueover100 = media.consolidated.roi.value/100;
            media.mediums = _(_.sortBy(media.mediums, function(item) {
                return item.data.roi.value;
            })).reverse().value();
        });
        console.log($scope.consolidatedMediumMediaObject)
        //ORDENA EL ARRAY DE OBJETOS '$parentScope.consolidatedMediumMediaObject.media' DE MAYOR A MENOR, POR el parametro total.media[].consolidated.inversionyventas.ventas
        $scope.consolidatedMediumMediaObject.media = _(_.sortBy($scope.consolidatedMediumMediaObject.media, function(item) {
            return item.consolidated.roi.value;
        })).reverse().value();
    }
]);



// Scenarios controller
angular.module('scenarios').controller('PlanEstrategiaController', ['$scope', '$stateParams', '$location', 'Authentication', 'Scenarios', 'Goals', 'Media', 'MediumCategories', 'Restrictions', '$http', 'Campaigns', '$modal',
    function($scope, $stateParams, $location, Authentication, Scenarios, Goals, Media, MediumCategories, Restrictions, $http, Campaigns, $modal) {
        $scope.consolidatedMediumMediaObject = $scope.$parent.$parent.consolidatedMediumMediaObject;

        //ORDENA EL ARRAY DE OBJETOS 'ob.medium' DE MAYOR A MENOR, POR el parametro ob.medium[].data.inversionyventas.inversion
        _.each($scope.consolidatedMediumMediaObject.media, function(media, i) {
            media.mediums = _(_.sortBy(media.mediums, function(item) {
                return item.data.roi.value;
            })).reverse().value();
        });

        //ORDENA EL ARRAY DE OBJETOS '$parentScope.consolidatedMediumMediaObject.media' DE MAYOR A MENOR, POR el parametro total.media[].consolidated.inversionyventas.ventas
        $scope.consolidatedMediumMediaObject.media = _(_.sortBy($scope.consolidatedMediumMediaObject.media, function(item) {
            return item.consolidated.roi.value;
        })).reverse().value();
    }
]);



// Scenarios controller
angular.module('scenarios').controller('PlanMarcaController', ['$scope', '$stateParams', '$location', 'Authentication', 'Scenarios', 'Goals', 'Media', 'MediumCategories', 'Restrictions', '$http', 'Campaigns', '$modal',
    function($scope, $stateParams, $location, Authentication, Scenarios, Goals, Media, MediumCategories, Restrictions, $http, Campaigns, $modal) {
        $scope.consolidatedMediumMediaObject = $scope.$parent.$parent.consolidatedMediumMediaObject;

        //ORDENA EL ARRAY DE OBJETOS 'ob.medium' DE MAYOR A MENOR, POR el parametro ob.medium[].data.inversionyventas.inversion
        _.each($scope.consolidatedMediumMediaObject.media, function(media, i) {
            media.mediums = _(_.sortBy(media.mediums, function(item) {
                return item.data.roi.value;
            })).reverse().value();
        });

        //ORDENA EL ARRAY DE OBJETOS '$parentScope.consolidatedMediumMediaObject.media' DE MAYOR A MENOR, POR el parametro total.media[].consolidated.inversionyventas.ventas
        $scope.consolidatedMediumMediaObject.media = _(_.sortBy($scope.consolidatedMediumMediaObject.media, function(item) {
            return item.consolidated.roi.value;
        })).reverse().value();
    }
]);
