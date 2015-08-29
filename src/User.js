var lyricController = require('./LyricController.js');
var Message = require('./Message.js');
var LyricBehaviour = require('./MessageBehaviours/LyricBehaviour.js');
var NonLyricBehaviour = require('./MessageBehaviours/NonLyricBehaviour.js');
var ValidMessageStatus = require('./Statuses/ValidMessageStatus.js');
var InvalidMessageStatus = require('./Statuses/InvalidMessageStatus.js');


var User = function (parameters) {
    this.name = parameters.name;
    this.location = parameters.location;
    this.status = "";
};

User.prototype.getStatusMessage = function(){
    return this.status;
};

User.prototype.postStatusMessage = function(content){
    this.status = lyricController.isValidLyric(content) ? new Message({content: content, behaviour: LyricBehaviour, status: ValidMessageStatus}) : new Message({content: content, behaviour: NonLyricBehaviour, status: InvalidMessageStatus});
};

module.exports = User;