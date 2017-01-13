/**
 * Created by areshytko on 13.01.17.
 */

var figureGrid = require('../src/figure').figureGrid;
var expect = require('chai').expect;


describe("figureGrid of 2 by 2 equally sized figures", function () {

    var grid;

    beforeEach(function () {
       grid = figureGrid(2, 2);
    });

    it("should have default values to be present", function() {

        expect(grid).not.to.null;

        expect(grid.figureHeight()).to.be.undefined;
        expect(grid.figureWidth()).to.be.undefined;

        expect(grid.padding()).to.equal(5);

        expect(grid.border()).to.deep.equal({"left" : 10, "top": 10, "bottom": 10, "right": 10});

    });


    it("should have proper height and width", function () {

        expect(grid.height()).to.equal(25);  // 1 padding + top and bottom borders
        expect(grid.width()).to.equal(25);  // 1 padding + left and right borders

        [10, 5].forEach( (w, i) => grid.rows()[0][i].width(w) );

        expect(grid.width()).to.equal(25 + 15);

        [1, 3].forEach( (h, i) => grid.rows()[i][0].height(h) );

        expect(grid.height()).to.equal(25 + 4);

    });


    it("should provide figure by id", function () {

        expect(grid.getFigureById('figure.1.1').id()).to.be.equal('figure.1.1');
        expect(() => grid.getFigureById('non existent')).to.throw(Error);

    });


    it("should provide proper figure iterators", function () {

        expect(Array.from(grid.byRows()).length).to.equal(4);
        expect(Array.from(grid.byColumns()).length).to.equal(4);

    });


    it("should place figures properly", function () {

        grid.figureHeight(20)
            .figureWidth(40)
            .padding(15)
            .border(Object.assign({}, grid.border(), { 'left' : 5, 'top': 0 }))
            .arrange();

        expect(grid.rows()[0][1].posX()).to.equal(5 + 40 + 15); // left border + figure + padding
        expect(grid.rows()[1][1].posY()).to.equal(0 + 20 + 15); // top border + figure + padding
    });
});