var queryService = require('./QueryService.js');

var Query = function(searchTerm) {
    this.searchTerm = searchTerm;
};

Query.prototype.search = function(){
    queryService.getLyricValidity(this.searchTerm);
};


module.exports = Query;