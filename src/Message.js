var lyricController = require('./LyricController.js');

var Message = function (parameters) {
    this.content = parameters.content;
    this.behaviour = new parameters.behaviour(this.content);
    this.status = new parameters.status;
};

Message.prototype.getContent = function (){
    return this.content;
};

module.exports = Message;