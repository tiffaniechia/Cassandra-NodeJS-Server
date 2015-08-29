var chai = require('chai');
chai.should();

var NonLyricBehaviour = require('../src/MessageBehaviours/NonLyricBehaviour.js');

describe('NonLyricBehaviour', function () {
    describe('#displayContent', function () {
        var nonLyricBehaviour = new NonLyricBehaviour("hello, is it me you're looking for");
        it('should display empty string', function () {
            nonLyricBehaviour.displayContent().should.equal("");
        });
    });
});