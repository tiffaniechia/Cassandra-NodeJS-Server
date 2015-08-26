var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var Message = require('../Message.js');
var lyricService = require('../LyricService.js');

describe('Message', function() {
    describe('#init', function () {
        it('initialize with message', function () {
            var query = new Message('blank space');
            query.searchTerm.should.equal('blank space');

        });
    });

    describe('#isValidLyric', function () {
        it('should call isValidLyric with searchTerm', function () {
            sinon.spy(lyricService, 'isValidLyric');
            var message = new Message('blank space');
            message.isValid();
            lyricService.isValidLyric.should.have.been.calledWith('blank space');
        });
    });
});