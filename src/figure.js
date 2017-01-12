/**
 * Created by areshytko on 09.01.17.
 *
 * Modifies given g container with positioning, size, margins
 *
 */

import * as d3 from 'd3';


export function figure() {
    
    var posX = 0, posY = 0, width, height;
    
    function _figure(selection) {
        selection.each(function (data) {
            d3.select(this)
                .attr("transform", `translate(${posX}, ${posY})`)
                  .append('rect')
                  .attr("width", width)
                  .attr("height", height)
                  .attr("fill", '#F5F5DC')
                  .attr("class", "plot")
        });
    }
    
    _figure.posX = function (x) {
        if (!arguments.length) return posX;
        posX = x;
        return _figure;
    };
    
    _figure.posY = function (y) {
        if (!arguments.length) return posY;
        posY = y;
        return _figure;
    };
    
    _figure.width = function (w) {
        if (!arguments.length) return width;
        width = w;
        return _figure;
    };
    
    _figure.height = function (h) {
        if (!arguments.length) return height;
        height = h;
        return _figure;
    };
    
    return _figure
}


export function figureGrid() {
    var rowNum, columnNum, order;

    function makeFigures() {

    }

    makeFigures.rows = function (n) {

    };

    makeFigures.columns = function (n) {

    };

    makeFigures.order = function (ord) {

    }
}