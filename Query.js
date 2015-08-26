var lyricService = require('./LyricService.js');

var Query = function(searchTerm) {
    this.searchTerm = searchTerm;
};

Query.prototype.search = function(){
    lyricService.isValidLyric(this.searchTerm);
};


module.exports = Query;