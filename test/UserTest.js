var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var User = require('../src/User.js');
var Message = require('../src/Message.js');
var ChatRoom = require('../src/ChatRoom.js');
var lyricController = require('../src/LyricController.js');

describe('User', function () {
    var user;
    describe('#init', function () {
        user = new User({
            name: "first, last",
            location: "current location"
        });
        it('should initialize with name, location', function () {
            user.name.should.equal("first, last");
            user.location.should.equal("current location");
        });
        it('should initialize with empty status message', function () {
            user.getStatusMessage().should.equal("");
        });
    });

    describe("#postStatusMessage", function () {
        before(function () {
            sinon.stub(lyricController, 'isValidLyric', function(){return true});
            user.postStatusMessage("i could try and fix you");
        });
        it("should check if it is a valid lyric", function () {
            lyricController.isValidLyric.should.have.been.calledWith("i could try and fix you");
        });
        it("should create corresponding message object", function () {
            user.getStatusMessage().should.be.instanceof(Message);
        });
    });

    describe("#getChatRooms", function(){
        it("should fetch chat rooms ", function(){
            user.getChatRooms().should.be.instanceof(Array);
        });
    });

    describe("#createChatRoom", function(){
        it("should create a new chat room with chosen user", function(){
            user.createChatRoom(new User({ name: "other user", location: "current location"}));
            var chatRooms = user.getChatRooms();
            chatRooms[0].should.be.instanceof(ChatRoom);
        });
    });

});