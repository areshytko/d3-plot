/**
 * Created by areshytko on 09.01.17.
 *
 * Creates axis, default scale, and axis
 *
 */

import * as d3 from 'd3';
import { figure } from './figure';


export function axesCartesian(fig) {

    if (!arguments.length){
        fig = figure();
    }

    var xScale = d3.scaleLinear()
          .range([0, fig.width()]);

    var yScale = d3.scaleLinear()
          .range([fig.height(), 0]);

    var axisBottom = d3.axisBottom()
                       .scale(xScale);

    var axisLeft = d3.axisLeft()
                     .scale(yScale);

    var axisRight = d3.axisLeft()
        .scale(yScale)
        .tickFormat("")
        .tickSize(fig.width());

    var axisTop = d3.axisBottom()
        .scale(xScale)
        .tickFormat("")
        .tickSize(fig.height());

    function axes(selection) {
        selection.each(function (data) {
            if (axisRight) {
                d3.select(this).append('g')
                    .attr("class", "axis axis-right")
                    .attr("transform", `translate(${fig.width()}, 0)`)
                    .call(axisRight);
            }
            if (axisTop) {
                d3.select(this).append('g')
                    .attr("class", "axis axis-top")
                    .call(axisTop);
            }
            if (axisBottom) {
                d3.select(this).append('g')
                    .attr("class", "axis axis-bottom")
                    .attr("transform", `translate(0, ${fig.height()})`)
                    .call(axisBottom);
            }
            if (axisLeft) {
                d3.select(this).append('g')
                    .attr("class", "axis axis-left")
                    .call(axisLeft);
            }
        });
    }

    axes.xScale = function (x) {
        if (!arguments.length) return xScale;
        xScale = x.range([0, fig.width()]);
        if (axisBottom) axisBottom.scale(xScale);
        if (axisTop) axisTop.scale(xScale);
        return axes;
    };

    axes.yScale = function (y) {
        if (!arguments.length) return yScale;
        yScale = y.range([fig.height(), 0]);
        if (axisLeft) axisLeft.scale(yScale);
        if (axisRight) axisRight.scale(yScale);
        return axes;
    };
    
    axes.figure = function (f) {
        if (!arguments.length) return fig;
        fig = f;
        return axes;
    };

    axes.bottom = function (axis) {
        if (!arguments.length) return axisBottom;
        if (axis && !axis.scale()) axis.scale(xScale);
        axisBottom = axis;
        return axes;
    };

    axes.top = function (axis) {
        if (!arguments.length) return axisTop;
        if (axis && !axis.scale()) axis.scale(xScale);
        axisTop = axis;
        return axes;
    };

    axes.left = function (axis) {
        if (!arguments.length) return axisLeft;
        if (axis && !axis.scale()) axis.scale(yScale);
        axisLeft = axis;
        return axes;
    };

    axes.right = function (axis) {
        if (!arguments.length) return axisRight;
        if (axis && !axis.scale()) axis.scale(yScale);
        axisRight = axis;
        return axes;
    };
    
    return axes
}