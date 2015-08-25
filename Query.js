var queryService = require('./QueryService.js');

var Query = function(searchTerm) {
    this.searchTerm = searchTerm;
};

Query.prototype.search = function(){
    queryService.getQueryValidity(this.searchTerm);


};


module.exports = Query;