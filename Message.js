var lyricController = require('./LyricController.js');

var Message = function(searchTerm) {
    this.searchTerm = searchTerm;
};

Message.prototype.isValid = function(){
    lyricController.isValidLyric(this.searchTerm);
};


module.exports = Message;