'use strict';
var d3 = d3;
var roiRadialProgress = {};
var _ = _;
roiRadialProgress.draw = function(parent) {

    var canvasData = {
        width: '100%',
        height: '100%',
        totalGraphArea: {
            height: 200,
            margin: 20
        },
        mediaGraphArea: {
            height: 150,
            margin: 15
        }
    };
    var bigGraph = {
        width: 0,
        height: 0,
        margin: 0,
        arcData: null,
        arc2Data: null,
        currentArc: 0,
        currentArc2: 0,
        fontSize: 20,
        division: 4,
        currentValue: 0,
        previousValue: null,
        previousRatio: null,
        arc: d3.svg.arc()
            .startAngle(0 * (Math.PI / 180)),
        arc2: d3.svg.arc()
            .startAngle(0 * (Math.PI / 180))
            .endAngle(0),
        position: {
            x: 0,
            y: 0
        },
        data: {
            value: 132,
            minValue: 0,
            maxValue: 100,
            label: 'Label 1'
        },
    };
    bigGraph.arcTween = function(a) {
        var i = d3.interpolate(bigGraph.currentArc, a);
        return function(t) {
            bigGraph.currentArc = i(t);
            return bigGraph.arc.endAngle(i(t))();
        };
    };

    bigGraph.arcTween2 = function(a) {
        var i = d3.interpolate(bigGraph.currentArc2, a);
        return function(t) {
            bigGraph.currentArc2 = i(t);
            return bigGraph.arc2.endAngle(i(t))();
        };
    };



    var _data = null,
        _duration = 790,
        _selection,
        _margin = {
            top: 0,
            right: 0,
            bottom: 30,
            left: 0
        },
        _fontSize = 10;


    var _mouseClick;

    _selection = d3.select(parent[0]);


    function component() {
        _selection.each(function() {
            var data = _data;

            // tamaño del area para el grafico total, mas tamaño del area para el grafico inferior.
            canvasData.height =
                1 * (canvasData.totalGraphArea.height + canvasData.totalGraphArea.margin) +
                1 * (canvasData.mediaGraphArea.height + canvasData.mediaGraphArea.margin);
            canvasData.width =
                parseInt(d3.select(_selection.node().parentNode.parentNode.parentNode).style('width'), 10);

            //CreandoMedidas Base para el grafico grande
            bigGraph = measure(bigGraph);

            // levantando el canvas para dibujar
            var canvas = _selection.append('myCanvas')
                .attr('id', 'roicharts')
                .attr('width', canvasData.width)
                .attr('height', canvasData.height);

            var svgTotal =
                d3
                .select(this)
                .select('#roicharts')
                .append('total')
                .selectAll('svg')
                .data(
                    [data.graphTotalData.value]
                );
            var svgSubs = canvas
                .append('subs')
                .append('subs_wrapper')
                .attr('class', '_centerGraph')
                .selectAll('svg')
                .data(
                    [2]
                );

            var enterTotal =
                svgTotal
                .enter()
                .append('svg')
                .attr('class', '_centerGraph total')
                .append('g')
                .attr('transform', 'translate(' + bigGraph.width + ',' + 0 + ')');


            // CREATING big graph
            svgTotal
                .attr('width', bigGraph.width)
                .attr('height', bigGraph.width + (2 * bigGraph.margin));
            if (svgTotal.attr('previousValue')) {
                bigGraph.previousValue = svgTotal.attr('previousValue');
            }
            if (svgTotal.attr('previousRatio')) {
                bigGraph.previousRatio = svgTotal.attr('previousRatio');
            }

            var backgroundTotal =
                enterTotal.append('g')
                .attr('class', '_component')
                .attr('cursor', 'pointer')
                .on('click', onMouseClick);


            bigGraph
                .arc
                .endAngle(360 * (Math.PI / 180));

            backgroundTotal
                .append('rect')
                .attr('class', '_background')
                .attr('width', 1)
                .attr('height', bigGraph.width);

            backgroundTotal
                .append('path')
                .attr('transform', 'translate(' + bigGraph.width / 2 + ',' + bigGraph.width / 2 + ')')
                .attr('d', bigGraph.arc);

            backgroundTotal.append('text')
                .attr('class', '_label')
                .attr('transform', 'translate(' + bigGraph.width / 2 + ',' + (bigGraph.width + bigGraph.fontSize) + ')')
                //.text(_label);
                .text(data.graphMetaData.name);

            var g =
                svgTotal
                .select('g')
                .attr('transform', 'translate(' + _margin.left + ',' + _margin.top + ')');


            bigGraph.arc.endAngle(bigGraph._currentArc);
            enterTotal
                .append('g')
                .attr('class', '_arcs');

            var pathTotal =
                svgTotal
                .select('._arcs')
                .selectAll('._arc')
                .data([bigGraph.data.value]);

            pathTotal
                .enter()
                .append('path')
                .attr('class', '_arc')
                .attr('transform', 'translate(' + bigGraph.width / 2 + ',' + bigGraph.width / 2 + ')')
                .attr('d', bigGraph.arc);

            //Another pathTotal in case we exceed 100%
            var path2Total =
                svgTotal
                .select('._arcs')
                .selectAll('._arc2')
                .data([bigGraph.data.value]);

            path2Total
                .enter()
                .append('path')
                .attr('class', '_arc2')
                .attr('transform', 'translate(' + bigGraph.width / 2 + ',' + bigGraph.height / 2 + ')')
                .attr('d', bigGraph.arc2);


            enterTotal
                .append('g')
                .attr('class', '_labels')
                .attr('transform', 'translate(' + bigGraph.width / 2 + ',' + bigGraph.width / 2 + ')');
            var label =
                svgTotal
                .select('._labels')
                .selectAll('._label')
                .data([bigGraph.data.value]);

            label
                .enter()
                .append('text')
                .attr('class', '_label')
                //.attr('y', bigGraph.width / 2 + bigGraph.fontSize / 3)
                //.attr('x', bigGraph.width / 2)
                .attr('cursor', 'pointer')
                .text(data.graphMetaData.name)
                .style('font-size', bigGraph.fontSize + 'px')
                .on('click', onMouseClick);

            pathTotal.exit().transition().duration(500).attr('x', 1000).remove();
            var layout = function(svgTotal, graph) {
                var _value = graph.data.value;
                var _minValue = graph.data.minValue;
                var _maxValue = graph.data.maxValue;

                var returnEndAngle = function(e) {
                    var ratio = (e - _minValue) / (_maxValue - _minValue);
                    svgTotal.attr('previousValue', _value);
                    svgTotal.attr('previousRatio', ratio);
                    return Math.min(360 * ratio, 360) * Math.PI / 180;
                };

                var returnNumber = function(e) {
                    var ratio = (e - _minValue) / (_maxValue - _minValue);
                    return Math.round(ratio * 100);
                };

                var returnNumberPath2 = function(e) {
                    var ratio = (e - _minValue) / (_maxValue - _minValue);
                    if (ratio > 1) {
                        return Math.min(360 * (ratio - 1), 360) * Math.PI / 180;
                    } else {
                        return 0;
                    }
                };

                if (bigGraph.previousValue) {
                    /*
                    if (ratio > 1) {
                    */
                    pathTotal
                        .datum(returnEndAngle)
                        .transition()
                        .duration(_duration)
                        .ease('quad-in')
                        .attrTween('d', bigGraph.arcTween);
                    path2Total
                        .datum(returnNumberPath2)
                        .transition()
                        .delay(_duration)
                        .duration(_duration)
                        .ease('quad-out')
                        .attrTween('d', bigGraph.arcTween2);
                    /*
                    } else {
                        path2Total
                            .datum(0)
                            .transition()
                            .ease('quad-in')
                            .duration(_duration)
                            .attrTween('d', bigGraph.arcTween2);
                        pathTotal
                            .datum(returnEndAngle)
                            .transition()
                            .delay(_duration)
                            .duration(_duration)
                            .ease('quad-out')
                            .attrTween('d', bigGraph.arcTween);
                    }
                    */

                } else {
                    pathTotal
                        .datum(returnEndAngle)
                        .transition()
                        .duration(_duration)
                        .ease('quad-in')
                        .attrTween('d', bigGraph.arcTween);

                    path2Total
                        .datum(returnNumberPath2)
                        .transition()
                        .delay(_duration)
                        .ease('quad-out')
                        .duration(_duration)
                        .attrTween('d', bigGraph.arcTween2);


                }

                label
                    .datum(returnNumber)
                    .transition()
                    .duration(_duration)
                    .tween('text', function(e) {
                        return labelTween(e, bigGraph.currentValue);
                    });
            };
            layout(svgTotal, bigGraph);







            _.each(data.graphMediasData, function(dato, i) {
                var smallGraph = {
                    width: 0,
                    height: 0,
                    margin: 0,
                    arcData: null,
                    arc2Data: null,
                    currentArc: 0,
                    currentArc2: 0,
                    fontSize: 20,
                    division: 6,
                    currentValue: 0,
                    previousValue: null,
                    previousRatio: null,
                    arc: d3.svg.arc()
                        .startAngle(0 * (Math.PI / 180)),
                    arc2: d3.svg.arc()
                        .startAngle(0 * (Math.PI / 180))
                        .endAngle(0),
                    position: {
                        x: 0,
                        y: 0
                    },
                    data: {
                        value: dato.consolidated.roi.value,
                        minValue: 0,
                        maxValue: 100,
                        label: dato._meta.name
                    }
                };

                smallGraph.arcTween = function(a) {
                    var i = d3.interpolate(smallGraph.currentArc, a);
                    return function(t) {
                        smallGraph.currentArc = i(t);
                        return smallGraph.arc.endAngle(i(t))();
                    };
                };

                smallGraph.arcTween2 = function(a) {
                    var i = d3.interpolate(smallGraph.currentArc2, a);
                    return function(t) {
                        smallGraph.currentArc2 = i(t);
                        return smallGraph.arc2.endAngle(i(t))();
                    };
                };

                //CreandoMedidas Base para el grafico Pequeño
                smallGraph = measureSub(smallGraph);

                var enterSubs =
                    svgSubs
                    .enter()
                    .append('svg')
                    .attr('class', 'subs')
                    .append('g');

                // CREATING big graph
                svgSubs
                    .attr('width', smallGraph.width)
                    .attr('height', smallGraph.height);
                if (svgSubs.attr('previousValue')) {
                    smallGraph.previousValue = svgSubs.attr('previousValue');
                }
                if (svgSubs.attr('previousRatio')) {
                    smallGraph.previousRatio = svgSubs.attr('previousRatio');
                }

                var backgroundSubs =
                    enterSubs.append('g')
                    .attr('class', '_component')
                    .attr('cursor', 'pointer')
                    .on('click', onMouseClick);

                smallGraph
                    .arc
                    .endAngle(360 * (Math.PI / 180));

                backgroundSubs
                    .append('rect')
                    .attr('class', '_background')
                    .attr('width', 1)
                    .attr('height', smallGraph.width);

                backgroundSubs
                    .append('path')
                    .attr('transform', 'translate(' + smallGraph.width / 2 + ',' + smallGraph.width / 2 + ')')
                    .attr('d', smallGraph.arc);

                backgroundSubs
                    .append('text')
                    .attr('class', '_label')
                    .attr('transform', 'translate(' + smallGraph.width / 2 + ',' + (smallGraph.width + smallGraph.fontSize) + ')')
                    //.text(_label);
                    .text(data.graphMetaData.name);

                var gSubs = svgSubs.select('g')
                    .attr('transform', 'translate(' + _margin.left + ',' + _margin.top + ')');


                
                enterSubs
                    .append('g')
                    .attr('class', '_arcs');

                var pathSubs =
                    svgSubs
                    .select('._arcs')
                    .selectAll('._arc')
                    .data([smallGraph.data.value]);

                pathSubs
                    .enter()
                    .append('path')
                    .attr('class', '_arc')
                    .attr('transform', 'translate(' + smallGraph.width / 2 + ',' + smallGraph.height / 2 + ')')
                    .attr('d', smallGraph.arc);

                //Another pathSubs in case we exceed 100%
                var path2Subs =
                    svgSubs
                    .select('._arcs')
                    .selectAll('._arc2')
                    .data([smallGraph.data.value]);

                path2Subs
                    .enter()
                    .append('path')
                    .attr('class', '_arc2')
                    .attr('transform', 'translate(' + smallGraph.width / 2 + ',' + smallGraph.height / 2 + ')')
                    .attr('d', smallGraph.arc2);

                enterSubs
                    .append('g')
                    .attr('class', '_labels')
                    .attr('transform', 'translate(' + smallGraph.width / 2 + ',' + smallGraph.width / 2 + ')');
                var labelSub =
                    svgSubs
                    .select('._labels')
                    .selectAll('._label')
                    .data([smallGraph.data.value]);

                labelSub
                    .enter()
                    .append('text')
                    .attr('class', '_label')
                    //.attr('y', smallGraph.width / 2 + smallGraph.fontSize / 3)
                    //.attr('x', smallGraph.width / 2)
                    .attr('cursor', 'pointer')
                    .text(data.graphMetaData.name)
                    .style('font-size', smallGraph.fontSize + 'px')
                    .on('click', onMouseClick);


                pathSubs.exit().transition().duration(500).attr('x', 1000).remove();
                var layoutSub = function(svgSubs, graph) {
                    var _value = graph.data.value;
                    var _minValue = graph.data.minValue;
                    var _maxValue = graph.data.maxValue;

                    var returnEndAngle = function(e) {
                        var ratio = (e - _minValue) / (_maxValue - _minValue);
                        svgSubs.attr('previousValue', _value);
                        svgSubs.attr('previousRatio', ratio);
                        return Math.min(360 * ratio, 360) * Math.PI / 180;
                    };

                    var returnNumber = function(e) {
                        var ratio = (e - _minValue) / (_maxValue - _minValue);
                        return Math.round(ratio * 100);
                    };

                    var returnNumberPath2 = function(e) {
                        var ratio = (e - _minValue) / (_maxValue - _minValue);
                        if (ratio > 1) {
                            return Math.min(360 * (ratio - 1), 360) * Math.PI / 180;
                        } else {
                            return 0;
                        }
                    };

                    if (smallGraph.previousValue) {
                        /*
                        if (ratio > 1) {
                        */
                        pathSubs
                            .datum(returnEndAngle)
                            .transition()
                            .duration(_duration)
                            .ease('quad-in')
                            .attrTween('d', bigGraph.arcTween);
                        path2Subs
                            .datum(returnNumberPath2)
                            .transition()
                            .delay(_duration)
                            .duration(_duration)
                            .ease('quad-out')
                            .attrTween('d', bigGraph.arcTween2);
                        /*
                        } else {
                            path2Total
                                .datum(0)
                                .transition()
                                .ease('quad-in')
                                .duration(_duration)
                                .attrTween('d', bigGraph.arcTween2);
                            pathTotal
                                .datum(returnEndAngle)
                                .transition()
                                .delay(_duration)
                                .duration(_duration)
                                .ease('quad-out')
                                .attrTween('d', bigGraph.arcTween);
                        }
                        */

                    } else {
                        pathSubs
                            .datum(returnEndAngle)
                            .transition()
                            .duration(_duration)
                            .ease('quad-in')
                            .attrTween('d', bigGraph.arcTween);

                        path2Subs
                            .datum(returnNumberPath2)
                            .transition()
                            .delay(_duration)
                            .ease('quad-out')
                            .duration(_duration)
                            .attrTween('d', bigGraph.arcTween2);

                    }

                    labelSub
                        .datum(returnNumber)
                        .transition()
                        .duration(_duration)
                        .tween('text', function(e) {
                            return labelTween(e, smallGraph.currentValue);
                        });
                };

                function measureSub(ob) {

                    //calcular anchos
                    ob.height = ob.width = parseInt((canvasData.width - (ob.margin * 2)) / ob.division, 10);
                    if (ob.width % 2 !== 0) {
                        ob.width++;
                    }
                    //calcular Arcos
                    ob.arc.outerRadius(((ob.width / 2)));
                    ob.arc.innerRadius(((ob.width / 2) * 0.85));
                    ob.arc2.outerRadius(((ob.width / 2) * 0.85));
                    ob.arc2.innerRadius(((ob.width / 2) * 0.85 - ((ob.width / 2) * 0.15)));

                    console.log(ob.width / 2);
                    console.log((ob.width / 2) * 0.85);

                    return ob;
                }
                layoutSub(svgSubs, smallGraph);

            });





        });

        function onMouseClick(d) {
            if (typeof _mouseClick === 'function') {
                _mouseClick.call();
            }
        }
    }

    function measure(ob) {

        //calcular anchos
        ob.height = ob.width = parseInt((canvasData.width - (ob.margin * 2)) / ob.division, 10);
        if (ob.width % 2 !== 0) {
            ob.width++;
        }
        //calcular Arcos
        ob.arc.outerRadius(((ob.width / 2)));
        ob.arc.innerRadius(((ob.width / 2) * 0.85));
        ob.arc2.outerRadius(((ob.width / 2) * 0.85));
        ob.arc2.innerRadius(((ob.width / 2) * 0.85 - ((ob.width / 2) * 0.15)));

        console.log(ob.width / 2);
        console.log((ob.width / 2) * 0.85);

        return ob;
    }

    function labelTween(a, _currentValue) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);

        return function(t) {
            _currentValue = i(t);
            this.textContent = Math.round(i(t)) + '%';
        };
    }

    component.render = function() {
        component();
        return component;
    };

    component.data = function(_) {
        if (!arguments.length) return _data;
        _data = _;
        return component;
    };

    component.margin = function(_) {
        if (!arguments.length) return _margin;
        _margin = _;
        return component;
    };

    component._duration = function(_) {
        if (!arguments.length) return _duration;
        _duration = _;
        return component;
    };

    component.onClick = function(_) {
        if (!arguments.length) return _mouseClick;
        _mouseClick = _;
        return component;
    };

    return component;

};
