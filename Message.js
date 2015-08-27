var lyricController = require('./LyricController.js');


var Message = function(parameters) {
    this.content = parameters.content;
    this.behaviour = new parameters.behaviour;
    this.status = new parameters.status;
};

Message.prototype.isValid = function(){
    lyricController.isValidLyric(this.content);
};


module.exports = Message;