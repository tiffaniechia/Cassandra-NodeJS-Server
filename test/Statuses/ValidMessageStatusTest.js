var chai = require('chai');
chai.should();

var ValidMessageStatus = require('../../src/Statuses/ValidMessageStatus.js');

describe('Message', function () {
    describe('#popUpMessage', function () {
        var validMessageStatus = new ValidMessageStatus();
        it('should display an error message', function () {
            validMessageStatus.popUpMessage().should.equal("Success! Your lyric message has been posted!");
        });
    });
});