/**
 * Created by areshytko on 13.01.17.
 */

import * as d3 from 'd3';
import { mustBeDefined } from '../util';


export function line(axes) {

    var xScale = axes.xScale();
    var yScale = axes.yScale();

    var xValue = mustBeDefined,
        yValue = mustBeDefined;

    var color = "black";

    function drawLine(selection) {
        selection.each(function (data) {
            d3.select(this).append('path')
                .attr("class", "line")
                .attr("d", d3.line().x( (d) => { return xScale(xValue(d)) })
                                    .y( (d) => { return yScale(yValue(d)) }))
                .attr("fill", "none")
                .attr("stroke", color);
        });
    }

    drawLine.x = function (x) {
        if (!arguments.length) return xValue;
        xValue = x;
        return drawLine;
    };

    drawLine.y = function (y) {
        if (!arguments.length) return yValue;
        yValue = y;
        return drawLine;
    };
    
    drawLine.xScale = function (xs) {
        if (!arguments.length) return xScale;
        xScale = xs;
        return drawLine;
    };

    drawLine.yScale = function (ys) {
        if (!arguments.length) return yScale;
        yScale = ys;
        return drawLine;
    };

    drawLine.color = function (c) {
        if (!arguments.length) return color;
        color = c;
        return drawLine;
    };

    return drawLine;
}