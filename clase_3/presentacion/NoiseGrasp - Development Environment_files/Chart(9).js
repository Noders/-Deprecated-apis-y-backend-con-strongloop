'use strict';
var d3 = d3;
var stackedHorizontalBarChart = {};
stackedHorizontalBarChart.draw = function(parent) {
    var _data = null,
        chartWidth = 300,
        barHeight = 28,
        _mouseClick = function() {},
        _selection = d3.select(parent);

    function component() {
        _selection.each(function(data) {
            var parentColumn = _selection.node().parentNode.parentNode.parentNode;
            var parentHeight = parseInt(d3.select(_selection.node().parentNode.parentNode.parentNode).style('height'), 10);
            var chartPadding = (parentHeight - barHeight) / 2;
            // Zip the series data together (first values, second values, etc.)
            var zippedData = [
                _data.graphData.inversion
            ];

            // Color scale
            var color = d3.scale.category20();

            // Specify the chart area and dimensions
            var chart = _selection.append('svg')
                .attr('width', '100%')
                .attr('height', barHeight);

            var chart_X = parseInt(chart.style('width'), 10);
            var chart_Y = parseInt(chart.style('height'), 10);
            var width_ = _data.graphData.inversion;
            var percentage = _data.graphData.inversion * 100 / _data.graphTotalData.inversion;
            var x = d3
                .scale
                .linear()
                .domain([0, _data.graphTotalData.inversion])
                .range([0, chart_X]);

            // Create bars
            var canvas = chart.selectAll('g')
                .data(zippedData)
                .enter()
                .append('g')
                .attr('transform', function(d, i) {
                    return 'translate(0,0)'; // + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / zippedData.length))) + ')';
                }).on('mouseover', function(d) {})
                .on('mouseout', function(d) {});

            // Create rectangles of the correct width

            canvas.append('rect')
                .attr('class', 'bar_appended')
                .attr('width', '0')
                .attr('height', barHeight)
                .attr('top', chartPadding)
                .transition()
                .duration(600)
                .delay(200)
                .attr('width', chart_X);
                
            canvas.append('rect')
                .attr('class', 'bar')
                .attr('width', '0')
                .attr('height', barHeight)
                .attr('top', chartPadding)
                .transition()
                .duration(500)
                .delay(200)
                .attr('width', function(d) {
                    return x(d);
                });


        });
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
    component.chartWidth = function(_) {
        if (!arguments.length) return chartWidth;
        chartWidth = _;
        return component;
    };
    component.barHeight = function(_) {
        if (!arguments.length) return barHeight;
        barHeight = _;
        return component;
    };
    component.onClick = function(_) {
        if (!arguments.length) return _mouseClick;
        _mouseClick = _;
        return component;
    };



    return component;
};
