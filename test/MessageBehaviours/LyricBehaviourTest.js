var chai = require('chai');
chai.should();

var LyricBehaviour = require('../../src/MessageBehaviours/LyricBehaviour.js');

describe('LyricBehaviour', function () {
    describe('#displayContent', function () {
        var lyricBehaviour = new LyricBehaviour("hello, is it me you're looking for");
        it('should display content as per given', function () {
            lyricBehaviour.displayContent().should.equal("hello, is it me you're looking for");
        });
    });
});