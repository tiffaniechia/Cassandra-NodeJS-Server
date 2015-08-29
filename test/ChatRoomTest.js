var chai = require('chai');
chai.should();

var ChatRoom = require('../src/ChatRoom.js');
var User = require('../src/User.js');

describe('ChatRoom', function () {
    describe('#init', function () {
        var chatRoom = new ChatRoom({
            fromUser: 'from user',
            toUser: 'to user'
        });
        it('should initialize with toUser and fromUser', function () {
            chatRoom.toUser.should.equal('to user');
            chatRoom.fromUser.should.equal('from user');
        });
    });
});