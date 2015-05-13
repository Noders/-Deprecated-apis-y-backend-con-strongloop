'use strict';
var d3 = d3;
var _ = _;
var areaChartModal = {};
areaChartModal.draw = function(parent) {

    var _data = null,
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var _selection = d3.select(parent[0]);

    function component() {
        _selection.each(function() {
            width =
                parseInt(d3.select(_selection.node().parentNode.parentNode.parentNode).style('width'), 10) - margin.left - margin.right;

            var parseDate = d3.time.format('%d-%b-%y').parse;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            var area = d3.svg.area()
                .x(function(d) {
                    return x(d.date);
                })
                .y0(height)
                .y1(function(d) {
                    return y(d.close);
                });

            var svg = _selection.append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            d3.tsv('/lib/custom/charts/areaChart/data_small.tsv', function(error, data) {
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.close = +d.close;
                });
                x.domain(d3.extent(data, function(d) {
                    return d.date;
                }));
                y.domain([0, d3.max(data, function(d) {
                    return d.close;
                })]);

                svg.append('path')
                    .datum(data)
                    .attr('class', 'area')
                    .attr('d', area);

                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis)
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 6)
                    .attr('dy', '.71em')
                    .style('text-anchor', 'end')
                    .text('Price ($)');
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

    return component;
};
