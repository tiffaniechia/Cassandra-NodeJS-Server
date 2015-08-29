var lyricController = require('./LyricController.js');
var Message = require('./Message.js');
var ChatRoom = require('./ChatRoom.js');
var LyricBehaviour = require('./MessageBehaviours/LyricBehaviour.js');
var NonLyricBehaviour = require('./MessageBehaviours/NonLyricBehaviour.js');
var ValidMessageStatus = require('./Statuses/ValidMessageStatus.js');
var InvalidMessageStatus = require('./Statuses/InvalidMessageStatus.js');


var User = function (parameters) {
    this.name = parameters.name;
    this.location = parameters.location;
    this.status = "";
    this.chatRooms = [];
};

User.prototype.getStatusMessage = function(){
    return this.status;
};

//TODO: rethink setter
User.prototype.postStatusMessage = function(content){
    this.status = lyricController.isValidLyric(content) ? new Message({content: content, behaviour: LyricBehaviour, status: ValidMessageStatus}) : new Message({content: content, behaviour: NonLyricBehaviour, status: InvalidMessageStatus});
};

User.prototype.getChatRooms = function(){
  return this.chatRooms;
};

User.prototype.createChatRoom = function (otherUser) {
    var newChatRoom = new ChatRoom({ toUser: this, fromUser: otherUser});
    this.chatRooms.unshift(newChatRoom);
    otherUser.chatRooms.unshift(newChatRoom);
};

module.exports = User;