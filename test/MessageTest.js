var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var Message = require('../Message.js');
var lyricController = require('../LyricController.js');
var NonLyricBehaviour = require('../NonLyricBehaviour.js');
var LyricBehaviour = require('../LyricBehaviour.js');
var InvalidMessageStatus = require('../InvalidMessageStatus.js');
var ValidMessageStatus = require('../ValidMessageStatus.js');

describe('Message', function () {
    var lyricMessage, nonLyricMessage;
    describe('#init', function () {
        before(function () {
            lyricMessage = new Message({
                content: "I'm so hot, make a dragon wanna retire man",
                behaviour: LyricBehaviour,
                status: ValidMessageStatus
            });

            nonLyricMessage = new Message({
                content: "this is not a lyric",
                behaviour: NonLyricBehaviour,
                status: InvalidMessageStatus
            });
        });
        it('initialize with message content', function () {
            lyricMessage.content.should.equal("I'm so hot, make a dragon wanna retire man");
            nonLyricMessage.content.should.equal("this is not a lyric");
        });
        it('initialize with message corresponding behaviour', function () {
            lyricMessage.behaviour.should.be.instanceof(LyricBehaviour);
            nonLyricMessage.behaviour.should.be.instanceof(NonLyricBehaviour);
        });
        it('initialize with message corresponding status', function () {
            lyricMessage.status.should.be.instanceof(ValidMessageStatus);
            nonLyricMessage.status.should.be.instanceof(InvalidMessageStatus);

        });
    });

    describe('#isValidLyric', function () {
        it('should call isValidLyric with searchTerm', function () {
            sinon.spy(lyricController, 'isValidLyric');
            lyricMessage.isValid();
            lyricController.isValidLyric.should.have.been.calledWith("I'm so hot, make a dragon wanna retire man");
        });
    });
});