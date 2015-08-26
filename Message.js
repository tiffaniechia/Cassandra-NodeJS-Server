var lyricService = require('./LyricService.js');

var Message = function(searchTerm) {
    this.searchTerm = searchTerm;
};

Message.prototype.isValid = function(){
    lyricService.isValidLyric(this.searchTerm);
};


module.exports = Message;