var chai = require('chai');
chai.should();

var User = require('../src/User.js');

describe('User', function () {
    describe('#init', function () {
        var user = new User({
            name: "first, last",
            location: "current location",
        });
        it('should initialize with name, location', function () {
            user.name.should.equal("first, last");
            user.location.should.equal("current location");
        });
        it('should initialize with empty status message', function () {
            user.getStatusMessage().should.equal("");
        });
    });
});