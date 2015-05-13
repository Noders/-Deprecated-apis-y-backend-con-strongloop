'use strict';
var d3 = d3;
var _ = _;
var stackedHorizontalBarChartEstrategia = {};
stackedHorizontalBarChartEstrategia.draw = function(parent) {
    var _data = null,
        chartWidth = 300,
        barHeight = 28,
        labelHeight = 28,
        labelPadding = 10,
        gapBetweenGroups = 8,
        _mouseClick = function() {},
        _selection = d3.select(parent);

    function component() {
        _selection.each(function(data) {
            var parentHeight = parseInt(d3.select(_selection.node().parentNode.parentNode.parentNode).style('height'), 10);

            _data = _.sortBy(_data, function(item) {
                return item.value;
            }).reverse();
            var valueArray = _.pluck(_data, 'value');
            var max = _.max(valueArray);
            var cantidad = valueArray.length;


            // Specify the chart area and dimensions
            var chart = _selection.append('svg')
                .attr('width', '100%')
                .attr('height', cantidad * (barHeight + labelPadding + labelPadding + gapBetweenGroups) + 10 * cantidad);

            var chart_X = parseInt(chart.style('width'), 10) - 50;
            var chart_Y = parseInt(chart.style('height'), 10);

            var x = d3
                .scale
                .linear()
                .domain([0, max])
                .range([0, chart_X]);



            // Create bars
            var canvas = chart.selectAll('g')
                .data(_data)
                .enter()
                .append('g')
                .attr('transform', function(d, i) {
                    return 'translate(0,' +
                        (i * (barHeight + labelHeight + labelPadding) +
                            gapBetweenGroups * (0.5 + Math.floor(i / cantidad))) +

                        ')';
                }).on('mouseover', function(d) {})
                .on('mouseout', function(d) {});

            // Create rectangles of the correct width
            var width = 0;

            canvas.append('rect')
                .attr('class', 'bar_appended')
                .attr('width', '0')
                .attr('height', barHeight)
                .attr('y', labelPadding + labelHeight)
                .transition()
                .duration(600)
                .delay(200)
                .attr('width', function(d) {
                    return x(max);
                });
            canvas.append('rect')
                .attr('class', 'bar')
                .attr('width', '0')
                .attr('height', barHeight)
                .attr('y', labelPadding + labelHeight)
                .transition()
                .duration(600)
                .delay(200)
                .attr('width', function(d) {
                    return x(d.value);
                });


            canvas.append('text')
                .attr('class', 'text')
                .attr('x', '4')
                .attr('y', labelHeight)
                .text(function(d) {
                    return d.title;
                });

            canvas.append('text')
                .attr('class', 'text')
                .attr('x', chart_X + 6)
                .attr('y', labelHeight + labelPadding + barHeight - 11)
                .text(function(d) {
                    return (d.value * 100 / max + '').substring(0, 5) + '%';
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
