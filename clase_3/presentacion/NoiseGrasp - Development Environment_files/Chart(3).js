horizontalBarChart = {}
horizontalBarChart.draw = function(parent) {

    var _data = null,
        chartWidth = 300,
        barHeight = 20,
        gapBetweenGroups = 10,
        spaceForLabels = 150,
        spaceForLegend = 150;

    _selection = d3.select(parent);

    function component() {
        _selection.each(function(data) {
            console.log(_selection)
            console.log(data)
                // Zip the series data together (first values, second values, etc.)
            var zippedData = [];
            for (var i = 0; i < _data.labels.length; i++) {
                for (var j = 0; j < _data.series.length; j++) {
                    zippedData.push(_data.series[j].values[i]);
                }
            }
            groupHeight = barHeight * _data.series.length || 1;

            // Color scale
            var color = d3.scale.category20();
            var chartHeight = barHeight * zippedData.length + gapBetweenGroups * _data.labels.length;
            var x = d3.scale.linear()
                .domain([0, d3.max(zippedData)])
                .range([0, chartWidth]);

            var y = d3.scale.linear()
                .range([chartHeight + gapBetweenGroups, 0]);

            var yAxis = d3.svg.axis()
                .scale(y)
                .tickFormat('')
                .tickSize(0)
                .orient("left");

            // Specify the chart area and dimensions
            var chart = thechartlocation.select(".chart")
                .attr("width", spaceForLabels + chartWidth + spaceForLegend)
                .attr("height", chartHeight);

            // Create bars
            var bar = chart.selectAll("g")
                .data(zippedData)
                .enter().append("g")
                .attr("transform", function(d, i) {
                    return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / _data.series.length))) + ")";
                });

            // Create rectangles of the correct width
            bar.append("rect")
                .attr("fill", function(d, i) {
                    return color(i % _data.series.length);
                })
                .attr("class", "bar")
                .attr("width", x)
                .attr("height", barHeight - 1);

            // Add text label in bar
            bar.append("text")
                .attr("x", function(d) {
                    return x(d) - 3;
                })
                .attr("y", barHeight / 2)
                .attr("fill", "red")
                .attr("dy", ".35em")
                .text(function(d) {
                    return d;
                });

            // Draw labels
            bar.append("text")
                .attr("class", "label")
                .attr("x", function(d) {
                    return -10;
                })
                .attr("y", groupHeight / 2)
                .attr("dy", ".35em")
                .text(function(d, i) {
                    if (i % _data.series.length === 0)
                        return _data.labels[Math.floor(i / _data.series.length)];
                    else
                        return ""
                });

            chart.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")")
                .call(yAxis);

            // Draw legend
            var legendRectSize = 18,
                legendSpacing = 4;

            var legend = chart.selectAll('.legend')
                .data(_data.series)
                .enter()
                .append('g')
                .attr('transform', function(d, i) {
                    var height = legendRectSize + legendSpacing;
                    var offset = -gapBetweenGroups / 2;
                    var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
                    var vert = i * height - offset;
                    return 'translate(' + horz + ',' + vert + ')';
                });

            legend.append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', function(d, i) {
                    return color(i);
                })
                .style('stroke', function(d, i) {
                    return color(i);
                });

            legend.append('text')
                .attr('class', 'legend')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function(d) {
                    return d.label;
                });
        })

    }


    component.render = function() {
        component();
        return component;
    }
    component.data = function(_) {
        if (!arguments.length) return _data;
        _data = _;
        return component;
    }
    component.chartWidth = function(_) {
        if (!arguments.length) return chartWidth;
        chartWidth = _;
        return component;
    }
    component.barHeight = function(_) {
        if (!arguments.length) return barHeight;
        barHeight = _;
        return component;
    }
    component.groupHeight = function(_) {
        if (!arguments.length) return groupHeight;
        groupHeight = _;
        return component;
    }
    component.gapBetweenGroups = function(_) {
        if (!arguments.length) return gapBetweenGroups;
        gapBetweenGroups = _;
        return component;
    }
    component.spaceForLabels = function(_) {
        if (!arguments.length) return spaceForLabels;
        spaceForLabels = _;
        return component;
    }
    component.spaceForLegend = function(_) {
        if (!arguments.length) return spaceForLegend;
        spaceForLegend = _;
        return component;
    }

    component.onClick = function(_) {
        if (!arguments.length) return _mouseClick;
        _mouseClick = _;
        return component;
    }

    return component;
}
