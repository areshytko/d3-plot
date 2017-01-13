/**
 * Created by areshytko on 13.01.17.
 */

import * as d3 from 'd3';


export function line(axes) {

    var xScale = axes.xScale();
    var yScale = axes.yScale();

    var xValue, yValue;

    function drawLine(selection) {
        selection.each(function (data) {
            d3.select(this).append('path')
                .attr("class", "line")
                .attr("d", d3.line().x( (d) => { return xScale(xValue(d)) })
                                    .y( (d) => { return yScale(yValue(d)) }))
                .attr("fill", "none")
                .attr("stroke", "black");
        });
    }

    drawLine.x = (x) => {
        if (!arguments.length) return xValue;
        xValue = x;
        return drawLine;
    };

    drawLine.y = (y) => {
        if (!arguments.length) return yValue;
        yValue = y;
        return drawLine;
    };
    
    drawLine.xScale = (xs) => {
        if (!arguments.length) return xScale;
        xScale = xs;
        return drawLine;
    };

    return drawLine;
}