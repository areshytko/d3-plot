/**
 * Created by areshytko on 09.01.17.
 *
 * Modifies given g container with positioning, size, margins
 *
 */

import * as d3 from 'd3';
import { zip } from './util';


export function figure(id) {

    if (!id) id = "figure";
    
    var posX = 0, posY = 0, width, height;

    var background = '#F5F5DC';
    
    function fig(selection) {
        selection.each(function (data) {
            d3.select(this)
                .attr("transform", `translate(${posX}, ${posY})`)
                  .append('rect')
                  .attr("width", width)
                  .attr("height", height)
                  .attr("fill", background)
                  .attr("class", "plot")
        });
    }
    
    fig.posX = function (x) {
        if (!arguments.length) return posX;
        posX = x;
        return fig;
    };
    
    fig.posY = function (y) {
        if (!arguments.length) return posY;
        posY = y;
        return fig;
    };
    
    fig.width = function (w) {
        if (!arguments.length) return width;
        width = w;
        return fig;
    };
    
    fig.height = function (h) {
        if (!arguments.length) return height;
        height = h;
        return fig;
    };

    fig.id = function (i) {
        if (!arguments.length) return id;
        id = i;
        return fig;
    };

    fig.background = function (b) {
        if (!arguments.length) return background;
        background = b;
        return fig;
    };
    
    return fig
}


export function figureGrid(columnNum, rowNum) {

    var figures = new Array(rowNum);

    for (let y = 0; y < rowNum; ++y){
        let row = new Array(columnNum);
        for (let x = 0; x < columnNum; ++x) {
            row[x] = figure(`figure.${y}.${x}`)
        }
        figures[y] = row;
    }

    var borders = {"left" : 10, "top": 10, "bottom": 10, "right": 10};
    var padding = 5;

    var figHeight, figWidth;

    function grid(selection) {
        selection.each(function (data) {

            grid.arrange(fig => d3.select(this)
                                    .append('g')
                                    .call(fig));

        });
    }

    grid.arrange = (visitor) => {
        /*
         * Arranges all plot on initialization phase (may be needed if some other initialization depends on figure position
         * Optional visitor(figure) may be applied on a properly positioned figure during arrangement
         */
        let y = borders.top;
        for (let row = 0; row < rowNum; ++row)
        {
            let x = borders.left;
            for (let col = 0; col < columnNum; ++col)
            {
                let fig = figures[row][col];

                if (!fig.height()) fig.height(figHeight);
                if (!fig.width()) fig.width(figWidth);

                fig.posX(x)
                   .posY(y);

                if (visitor) visitor(fig);

                x += fig.width() + padding;
            }
            y += d3.max(figures[row].map(({ height }) => height() )) + padding;
        }

    };

    grid.width = () => d3.max(grid.rows().map( (row) => d3.sum(row.map( ({ width }) => width() ))))
            + padding * (columnNum - 1)
            + borders.left
            + borders.right;

    grid.height = () => d3.max(grid.columns().map( (col) => d3.sum(col.map( ({ height }) => height() ))))
            + padding * (rowNum - 1)
            + borders.top
            + borders.bottom;

    grid.rows = function () {
        return figures;
    };

    grid.columns = function () {
        return zip(grid.rows())
    };

    grid.byRows = function* () {
        for (let y = 0; y < rowNum; ++y)
        for (let x = 0; x < columnNum; ++x) {
            yield figures[y][x];
        }
    };

    grid.byColumns = function*() {
        for (let x = 0; x < columnNum; ++x)
        for (let y = 0; y < rowNum; ++y) {
            yield figures[y][x];
        }
    };

    grid.figureHeight = function (h) {
        if (!arguments.length) return figHeight;
        figHeight = h;
        return grid;
    };

    grid.figureWidth = function (w) {
        if (!arguments.length) return figWidth;
        figWidth = w;
        return grid;
    };

    grid.getFigureById = function (id) {
        for (let fig of grid.byRows()) if (fig.id() === id) return fig;
        throw Error(`No figure with given id: ${id}`);
    };

    grid.padding = function (p) {
        if (!arguments.length) return padding;
        padding = p;
        return grid;
    };

    grid.border = function (b) {
        if (!arguments.length) return borders;
        borders = b;
        return grid;
    };

    return grid;
}