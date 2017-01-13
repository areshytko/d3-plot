/**
 * Created by areshytko on 10.01.17.
 */

var figure = require('./figure').figure;
var figureGrid = require('./figure').figureGrid;
var axesCartesian = require('./axes').axesCartesian;
var line = require('./geom/line').line;

module.exports = {
    "figure": figure,
    "figureGrid": figureGrid,
    "axesCartesian": axesCartesian,
    "line": line
};
