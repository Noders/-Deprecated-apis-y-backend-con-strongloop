'use strict';
var d3 = d3;
var _ = _;
var lineChart = {};
lineChart.draw = function(parent) {

    var _data = null,
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50,
            bootstrap: 60
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var _selection = d3.select(parent[0]);

    function component() {
        _selection.each(function() {
            width =
                parseInt(d3.select(_selection.node().parentNode.parentNode.parentNode.parentNode).style('width'), 10) - margin.left - margin.right - margin.bootstrap;

            var data = [{
                'sale': '202',
                'year': '2000'
            }, {
                'sale': '215',
                'year': '2002'
            }, {
                'sale': '179',
                'year': '2004'
            }, {
                'sale': '199',
                'year': '2006'
            }, {
                'sale': '134',
                'year': '2008'
            }, {
                'sale': '176',
                'year': '2010'
            }];

            var vis =
                _selection.select('.chart').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            var xScale = d3.scale.linear().range([margin.left, width - margin.right]).domain([2000, 2010]),
                yScale = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([134, 215]),
                xAxis = d3.svg.axis()
                .scale(xScale),
                yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');

            vis.append('svg:g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
                .call(xAxis);
            vis.append('svg:g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + (margin.left) + ',0)')
                .call(yAxis);

            var lineGen = d3.svg.line()
                .x(function(d) {
                    return xScale(d.year);
                })
                .y(function(d) {
                    return yScale(d.sale);
                })
                .interpolate('basis');

            var path =
                vis
                .append('svg:path')
                .attr('d', lineGen(data))
                .attr('stroke', 'green')
                .attr('stroke-width', 2)
                .attr('fill', 'none');

            var totalLength = path.node().getTotalLength();


            path
                .attr('stroke-dasharray', totalLength + ' ' + totalLength)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .delay(2250)
                .duration(750)
                .ease('ease-in')
                .attr('stroke-dashoffset', 0)

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
