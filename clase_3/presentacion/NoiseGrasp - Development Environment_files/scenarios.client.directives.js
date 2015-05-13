'use strict';
/**
 *
 * Make a bulletGraph
 */
function bulletGraph() {
    return {
        restrict: 'E',
        scope: {
            selectedTab: "@",
            graphData: "@",
            graphMetaData: "@"
        },
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = [{
                "title": "Revenue",
                "subtitle": "US$, in thousands",
                "ra,3,nges": [300],
                "measures": [270],
                "markers": [250]
            }, {
                "title": "Profit",
                "subtitle": "%",
                "ranges": [30],
                "measures": [23],
                "markers": [26]
            }, {
                "title": "Order Size",
                "subtitle": "US$, average",
                "ranges": [600],
                "measures": [320],
                "markers": [0]
            }, {
                "title": "New Customers",
                "subtitle": "count",
                "ranges": [2500],
                "measures": [1650],
            }, {
                "title": "Satisfaction",
                "subtitle": "out of 5",
                "ranges": [5],
                "measures": [4.7],
                "markers": [5]
            }]
        },
        templateUrl: "lib/custom/charts/bulletChart/chart.html",
        link: function($scope, element) {
            $scope.$watch(
                function() {
                    return $scope.selectedTab;
                },
                function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        //HAY UN CAMBIO DE TAB
                        $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
                    }
                });
            $scope.element = element;

            window.onresize = function() {
                //$scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
            };
            $scope.redrawGraphs = function(data) {
                d3.select($scope.element[0]).select(".chart").selectAll("svg").remove();
                if ($scope.element.attr("data")) {
                    $scope.getTheRest(data)
                } else {

                    $scope.graph = {}
                    $scope.graph.data = JSON.parse($scope.graphData)
                    $scope.graph._meta = JSON.parse($scope.graphMetaData)
                    var a = {
                        "title": $scope.graph._meta.name,
                        "subtitle": "%",
                        "ranges": [$scope.graph.data.rango],
                        "measures": [$scope.graph.data.ventas],
                        "markers": [0]
                    }
                    $scope.getTheRest(a)
                }
            }
            $scope.getTheRest = function(data) {
                var oneData = [data];
                $scope.parentChart = {
                    w: $(element).find(".chart").width(),
                    h: 50
                }
                $scope.margin = {
                    top: 5,
                    right: 40,
                    bottom: 20,
                    left: 120
                }
                $scope.width = $scope.parentChart.w - $scope.margin.left - $scope.margin.right;
                $scope.height = $scope.parentChart.h - $scope.margin.top - $scope.margin.bottom;
                var chart = d3.bullet()
                    .width($scope.width)
                    .height($scope.height);

                var svg = d3.select($scope.element[0]).select(".chart").selectAll("svg")
                    .data(oneData)
                    .enter().append("svg")
                    .attr("class", "bullet")
                    .attr("width", "100%")
                    .attr("height", "60px")
                    .append("g")
                    .attr("transform", "translate(" + $scope.margin.left + "," + $scope.margin.top + ")")
                    .call(chart);


                var title = svg.append("g")
                    .style("text-anchor", "end")
                    .attr("transform", "translate(-6," + $scope.height / 2 + ")");

                title.append("text")
                    .attr("class", "title")
                    .text(function(d) {
                        return d.title;
                    });

                title.append("text")
                    .attr("class", "subtitle")
                    .attr("dy", "1em")
                    .text(function(d) {
                        return d.subtitle;
                    });
                $scope.svg = svg;
            }

            //$scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])




        }
    }
}


function simplerBulletGraph() {
    return {
        restrict: 'E',
        scope: {
            selectedTab: "@",
            graphData: "@",
            graphMetaData: "@"

        },
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = [{
                "title": "Revenue",
                "subtitle": "US$, in thousands",
                "ranges": [300],
                "measures": [270],
                "markers": [250]
            }, {
                "title": "Profit",
                "subtitle": "%",
                "ranges": [30],
                "measures": [23],
                "markers": [26]
            }, {
                "title": "Order Size",
                "subtitle": "US$, average",
                "ranges": [600],
                "measures": [320],
                "markers": [0]
            }, {
                "title": "New Customers",
                "subtitle": "count",
                "ranges": [2500],
                "measures": [1650],
            }, {
                "title": "Satisfaction",
                "subtitle": "out of 5",
                "ranges": [5],
                "measures": [4.7],
                "markers": [5]
            }]
        },
        templateUrl: "lib/custom/charts/simplerBulletChart/chart.html",
        link: function($scope, element) {
            $scope.$watch(
                function() {
                    return $scope.selectedTab;
                },
                function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        //HAY UN CAMBIO DE TAB
                        $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
                    }
                });
            $scope.element = element;

            window.onresize = function() {
                $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
            };

            $scope.redrawGraphs = function(data) {
                d3.select($scope.element[0]).select(".chart").selectAll("svg").remove();
                if ($scope.element.attr("data")) {
                    $scope.getTheRest(data)
                } else {

                    $scope.graph = {}
                    $scope.graph.data = JSON.parse($scope.graphData)
                    $scope.graph._meta = JSON.parse($scope.graphMetaData)
                    var a = {
                        "title": $scope.graph._meta.name,
                        "subtitle": "%",
                        "ranges": [$scope.graph.data.rango],
                        "measures": [$scope.graph.data.retorno],
                        "markers": [0]
                    }
                    $scope.getTheRest(a)
                }
            }
            $scope.getTheRest = function(data) {
                    var oneData = [data];
                    $scope.parentChart = {
                        w: $(element).find(".chart").width(),
                        h: 50
                    }
                    $scope.margin = {
                        top: 5,
                        right: 40,
                        bottom: 20,
                        left: 40
                    }
                    $scope.width = $scope.parentChart.w - $scope.margin.left - $scope.margin.right;
                    $scope.height = $scope.parentChart.h - $scope.margin.top - $scope.margin.bottom;
                    var chart = d3.simplerBullet()
                        .width($scope.width)
                        .height($scope.height);

                    var svg = d3.select($scope.element[0]).select(".chart").selectAll("svg")
                        .data(oneData)
                        .enter().append("svg")
                        .attr("class", "bullet")
                        .attr("width", "100%")
                        .attr("height", "60px")
                        .append("g")
                        .attr("transform", "translate(" + $scope.margin.left + "," + $scope.margin.top + ")")
                        .call(chart);


                    var title = svg.append("g")
                        .style("text-anchor", "end")
                        .attr("transform", "translate(-6," + $scope.height / 2 + ")");



                    $scope.svg = svg;
                }
                //$scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])

        }
    }
}


/**
 *
 * Make a radialGraph
 */

function radialGraph() {
    return {
        restrict: 'E',
        scope: {
            selectedTab: "@",
            graphData: "@",
            graphMetaData: "@",

        },
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = [{
                "diameter": 80,
                "value": 42,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 0"
            }, {
                "diameter": 80,
                "value": 132,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 1"
            }, {
                "diameter": 80,
                "value": 56,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 2"
            }, {
                "diameter": 80,
                "value": 12,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 3"
            }]

        },
        templateUrl: "lib/custom/charts/radialChart/chart.html",
        link: function($scope, element) {
            $scope.element = element;
            $scope.$watch(
                function() {
                    return $scope.selectedTab;
                },
                function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        //HAY UN CAMBIO DE TAB
                        $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
                    }
                });
            window.onresize = function() {};
            $scope.redrawGraphs = function(data) {
                d3.select($scope.element[0]).select(".chart").selectAll("svg").remove();
                if ($scope.element.attr("data")) {
                    $scope.getTheRest(data)
                } else {
                    $scope.graph = {}
                    $scope.graph.data = JSON.parse($scope.graphData)
                    $scope.graph._meta = JSON.parse($scope.graphMetaData)
                    var a = {
                        "diameter": 80,
                        "value": $scope.graph.data.value,
                        "minValue": 0,
                        "maxValue": 200,
                        //"label": "Label 3"
                    };

                    $scope.getTheRest(a)
                }
                /*
                if ($scope.element.attr("data")) {

                    $scope
                        .graph
                        .value(data.value)
                        .diameter(data.diameter)
                        .render()
                } else {
                    $scope
                        .graph
                        .value($scope.graph.data.value)
                        .diameter(150)
                        .render()
                }
                */
            }

            $scope.getTheRest = function(data) {
                $scope.graph = radialProgress.draw($scope.element.find(".chart")[0])
                    .label(data.label)
                    .onClick($scope.callback)
                    .diameter(data.diameter)
                    .value(data.value)
                    .render()
            }
            $scope.callback = function() {
                    console.log($scope.element)
                }
                //$scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
        }
    }
}



function testRadialGraph() {
    return {
        restrict: 'E',
        scope: {},
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = [{
                "diameter": 80,
                "value": 42,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 0"
            }, {
                "diameter": 80,
                "value": 132,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 1"
            }, {
                "diameter": 80,
                "value": 56,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 2"
            }, {
                "diameter": 80,
                "value": 12,
                "minValue": 10,
                "maxValue": 250,
                "label": "Label 3"
            }]

        },
        templateUrl: "lib/custom/charts/radialChart/chart.html",
        link: function($scope, element) {
            $scope.element = element;
            window.onresize = function() {};
            $scope.redrawGraphs = function(data) {
                d3.select($scope.element[0]).select(".chart").selectAll("svg").remove();
                if ($scope.element.attr("data")) {
                    $scope.getTheRest(data)
                } else {
                    var a = {
                        "diameter": 80,
                        "value": 42,
                        "minValue": 0,
                        "maxValue": 200,
                        //"label": "Label 3"
                    };

                    $scope.getTheRest(a)
                }
                /*
                if ($scope.element.attr("data")) {

                    $scope
                        .graph
                        .value(data.value)
                        .diameter(data.diameter)
                        .render()
                } else {
                    $scope
                        .graph
                        .value($scope.graph.data.value)
                        .diameter(150)
                        .render()
                }
                */
            }

            $scope.getTheRest = function(data) {
                $scope.graph = radialProgress.draw($scope.element.find(".chart")[0])
                    .label(data.label)
                    .onClick($scope.callback)
                    .diameter(data.diameter)
                    .value(data.value)
                    .render()
            }
            $scope.callback = function() {
                console.log($scope.element)
            }
            $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
        }
    }
}




/**
 *
 * Make a radialGraph
 */

function horizontalBarGraph() {
    return {
        restrict: 'E',
        scope: {
            selectedTab: "@"
        },
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = {
                labels: [
                    'resilience', 'maintainability', 'accessibility',
                    'uptime', 'functionality', 'impact'
                ],
                series: [{
                    label: '2012',
                    values: [4, 8, 15, 16, 23, 42]
                }, {
                    label: '2013',
                    values: [12, 43, 22, 11, 73, 25]
                }, {
                    label: '2014',
                    values: [31, 28, 14, 8, 15, 21]
                }, ]
            }

        },
        templateUrl: "lib/custom/charts/horizontalBarChart/chart.html",
        link: function($scope, element) {

            $scope.element = element;
            $scope.$watch(
                function() {
                    return $scope.selectedTab;
                },
                function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        //HAY UN CAMBIO DE TAB
                        $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
                    }
                });
            window.onresize = function() {};
            $scope.redrawGraphs = function(data) {
                $scope
                    .graph
                    .value(data.value)
                    .diameter(data.diameter)
                    .render()
                    //$scope.getTheRest(data)
            }

            $scope.getTheRest = function(data) {
                $scope.graph = horizontalBarChart
                    .draw($scope.element.find(".chart")[0])
                    .data($scope.theData)
                    .onClick($scope.callback)
                    .render()
            }
            $scope.callback = function() {
                    console.log(this)
                }
                //$scope.getTheRest($scope.theData[$scope.element.attr("data")])
        }
    }
}




/**
 *
 * Make a radialGraph
 */

function stackedHorizontalBarGraph() {
    return {
        restrict: 'E',
        scope: {
            selectedTab: "=",
            graphTotalData: "=",
            graphMetaData: "=",
            graphData: '='
        },
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = [
                20, 40, 50
            ]
        },
        templateUrl: "lib/custom/charts/stackedHorizontarBarChart/chart.html",
        link: function($scope, element, attrs) {
            $scope.attrs = attrs;
            $scope.element = element;
            $scope.$watch(
                function() {
                    return $scope.selectedTab;
                },
                function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        //HAY UN CAMBIO DE TAB
                        $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
                    }
                });
            window.onresize = function() {};
            $scope.getTheRest = function(data) {
                $scope.graph = stackedHorizontalBarChart
                    .draw($scope.element.find(".chart")[0])
                    .data(data)
                    .onClick($scope.callback)
                    .render()
            }
            $scope.callback = function() {
                console.log(this)
            }
            $scope.getTheRest({
                graphData: $scope.graphData,
                graphTotalData: $scope.graphTotalData,
                graphMetaData: $scope.graphMetaData
            })
        }
    }
}


/**
 *
 * Make a radialGraph
 */

function stackedHorizontalBarGraphVentas() {
    return {
        restrict: 'E',
        scope: {
            selectedTab: "=",
            graphTotalData: "=",
            graphMetaData: "=",
            graphData: '='
        },
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = [
                20, 40, 50
            ]
        },
        templateUrl: "lib/custom/charts/stackedHorizontarBarChart/chart.html",
        link: function($scope, element, attrs) {
            $scope.attrs = attrs;
            $scope.element = element;
            $scope.$watch(
                function() {
                    return $scope.selectedTab;
                },
                function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        //HAY UN CAMBIO DE TAB
                        $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
                    }
                });
            window.onresize = function() {};
            $scope.getTheRest = function(data) {
                $scope.graph = stackedHorizontalBarChartVentas
                    .draw($scope.element.find(".chart")[0])
                    .data(data)
                    .onClick($scope.callback)
                    .render()
            }
            $scope.callback = function() {
                console.log(this)
            }
            $scope.getTheRest({
                graphData: $scope.graphData,
                graphTotalData: $scope.graphTotalData,
                graphMetaData: $scope.graphMetaData
            })
        }
    }
}





/**
 *
 * Make a radialGraph
 */

function roiRadialChart() {
    return {
        restrict: 'E',
        restrict: 'E',
        scope: {
            selectedTab: "=",
            graphTotalData: "=",
            graphMetaData: "=",
            graphMediasData: '='
        },
        controller: function($scope, $window) {
            $scope.w = angular.element($window);
        },
        templateUrl: "lib/custom/charts/roiRadialChart/chart.html",
        link: function($scope, element) {
            $scope.element = element;
            window.onresize = function() {};
            $scope.redrawGraphs = function(data) {
                roiRadialProgress.draw(data.element).data(data).render()
            }
            $scope.redrawGraphs({
                graphTotalData: $scope.graphTotalData,
                graphMetaData: $scope.graphMetaData,
                graphMediasData: $scope.graphMediasData,
                element: $scope.element
            })
        }
    }
}




/**
 *
 * Make a areaChart inside a Modal
 */

function areaGraphModal() {
    return {
        restrict: 'E',
        restrict: 'E',
        scope: {
            selectedTab: "=",
            graphTotalData: "=",
            graphMetaData: "=",
            graphMediasData: '='
        },
        controller: function($scope, $window) {
            $scope.w = angular.element($window);
        },
        templateUrl: "lib/custom/charts/areaChart/chart.html",
        link: function($scope, element) {
            $scope.element = element;
            window.onresize = function() {};
            $scope.redrawGraphs = function(data) {
                areaChartModal.draw(data.element).data(data).render()
            }
            $scope.redrawGraphs({
                graphTotalData: $scope.graphTotalData,
                graphMetaData: $scope.graphMetaData,
                graphMediasData: $scope.graphMediasData,
                element: $scope.element
            })
        }
    }
}





/**
 *
 * Make a areaChart inside a Modal
 */

function lineGraph() {
    return {
        restrict: 'E',
        restrict: 'E',
        scope: {
            selectedTab: "=",
            graphTotalData: "=",
            graphMetaData: "=",
            graphMediasData: '='
        },
        controller: function($scope, $window) {
            $scope.w = angular.element($window);
        },
        templateUrl: "lib/custom/charts/lineChart/chart.html",
        link: function($scope, element) {
            $scope.element = element;
            window.onresize = function() {};
            $scope.redrawGraphs = function(data) {
                lineChart.draw(data.element).data(data).render()
            }
            $scope.redrawGraphs({
                graphTotalData: $scope.graphTotalData,
                graphMetaData: $scope.graphMetaData,
                graphMediasData: $scope.graphMediasData,
                element: $scope.element
            })
        }
    }
}



/**
 *
 * Make a areaChart inside a Modal
 */

function lineGraphEstrategia() {
    return {
        restrict: 'E',
        restrict: 'E',
        scope: {
            selectedTab: "=",
            graphTotalData: "=",
            graphMetaData: "=",
            graphMediasData: '='
        },
        controller: function($scope, $window) {
            $scope.w = angular.element($window);
        },
        templateUrl: "lib/custom/charts/lineChartEstrategia/chart.html",
        link: function($scope, element) {
            $scope.element = element;
            window.onresize = function() {};
            $scope.redrawGraphs = function(data) {
                lineChartEstrategia.draw(data.element).data(data).render()
            }
            $scope.redrawGraphs({
                graphTotalData: $scope.graphTotalData,
                graphMetaData: $scope.graphMetaData,
                graphMediasData: $scope.graphMediasData,
                element: $scope.element
            })
        }
    }
}



/**
 *
 * Make a radialGraph
 */

function stackedHorizontalBarGraphEstrategia() {
    return {
        restrict: 'E',
        scope: {
            selectedTab: "=",
            graphTotalData: "=",
            graphMetaData: "=",
            graphData: '='
        },
        controller: function($scope, $window) {
            //add javascript
            $scope.w = angular.element($window);
            $scope.theData = [
                20, 40, 50
            ]
        },
        templateUrl: "lib/custom/charts/stackedHorizontarBarChartEstrategia/chart.html",
        link: function($scope, element, attrs) {
            $scope.attrs = attrs;
            $scope.element = element;
            $scope.$watch(
                function() {
                    return $scope.selectedTab;
                },
                function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        //HAY UN CAMBIO DE TAB
                        $scope.redrawGraphs($scope.theData[Math.floor((Math.random() * 4))])
                    }
                });
            window.onresize = function() {};
            $scope.getTheRest = function(data) {
                $scope.graph = stackedHorizontalBarChartEstrategia
                    .draw($scope.element.find(".chart")[0])
                    .data(data)
                    .onClick($scope.callback)
                    .render()
            }
            $scope.callback = function() {
                console.log(this)
            }
            $scope.getTheRest([{
                title: "Segmento 1",
                value: 350
            }, {
                title: "Segmento 2",
                value: 210
            }, {
                title: "Segmento 3",
                value: 600
            }, {
                title: "Segmento 4",
                value: 404
            }])
        }
    }
}

/**
 *
 * Pass all functions into module
 */

angular
    .module('scenarios')
    .directive('bulletGraph', bulletGraph)
    .directive('simplerBulletGraph', simplerBulletGraph)
    .directive('radialGraph', radialGraph)
    .directive('horizontalBarGraph', horizontalBarGraph)
    .directive('stackedHorizontalBarGraph', stackedHorizontalBarGraph)
    .directive('stackedHorizontalBarGraphVentas', stackedHorizontalBarGraphVentas)
    .directive('roiRadialChart', roiRadialChart)
    .directive('testRadialGraph', testRadialGraph)
    .directive('areaGraphModal', areaGraphModal)
    .directive('lineGraph', lineGraph)
    .directive('lineGraphEstrategia', lineGraphEstrategia)
    .directive('stackedHorizontalBarGraphEstrategia', stackedHorizontalBarGraphEstrategia)
