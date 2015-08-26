var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var Query = require('../Query.js');
var lyricService = require('../LyricService.js');

describe('Query', function() {
    describe('#init', function () {
        it('initialize with query', function () {
            var query = new Query('blank space');
            query.searchTerm.should.equal('blank space');

        });
    });

    describe('#isValidLyric', function () {
        it('should call Service with search', function () {
            sinon.spy(lyricService, 'isValidLyric');
            var query = new Query('blank space');
            query.search();
            lyricService.isValidLyric.should.have.been.calledWith('blank space');
        });
    });
});