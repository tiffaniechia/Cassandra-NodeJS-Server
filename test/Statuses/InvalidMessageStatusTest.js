var chai = require('chai');
chai.should();

var InvalidMessageStatus = require('../../src/Statuses/InvalidMessageStatus.js');

describe('Message', function () {
    describe('#popUpMessage', function () {
        var invalidMessageStatus = new InvalidMessageStatus();
        it('should display an error message', function () {
            invalidMessageStatus.popUpMessage().should.equal("Oh no, that isn't a lyric! Please try again.");
        });
    });
});