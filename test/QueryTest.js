var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var Query = require('../Query.js');
var queryService = require('../QueryService.js');
//var app = require();

describe('Query', function() {
    describe('#init', function () {
        it('initialize with query', function () {
            var query = new Query('blank space');
            query.searchTerm.should.equal('blank space');

        });
    });

    describe('#isValidLyric', function () {
        it('should call Service with search', function () {
            sinon.spy(queryService, 'getLyricValidity');
            var query = new Query('blank space');
            query.search();
            queryService.getLyric.should.have.been.calledWith('blank space');
        });


    });
});