var sinon = require("sinon");
var chai = require('chai');
chai.should();
var Query = require('../Query.js');

describe('Query', function() {
    describe('#init', function () {
        it('initialize with query', function () {
            var query = new Query('blank space');
            query.searchTerm.should.equal('blank space');
        });
    });
});