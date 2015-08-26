var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var Query = require('../Query.js');
var queryService = require('../QueryService.js');


describe('QueryService', function() {
    describe('#getLyricValidity', function () {
        it('should return true if search term is a valid lyric', function () {
            //stub response
            var searchTerm = 'blank space';
            var answer = queryService.getLyricValidity(searchTerm);

            answer.should.equal(true);



        });
    });


});