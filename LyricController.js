var _ = require('lodash');
var urlService = require('./UrlService.js');

var parseContextFieldFromResponse = function (context) {
    return context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
};

var parseSearchTerm = function(searchTerm){
    return searchTerm.replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
};

var isMatch = function (searchable, searchTerm) {
    return searchable.indexOf(searchTerm) !== -1;
};

var isValidLyric = function (searchTerm) {
    var searchTerm = parseSearchTerm(searchTerm);
    var results = urlService.getLyricSearchResults(searchTerm);
    var lyricSearchResults = JSON.parse(results);
    var isFound = _.find(lyricSearchResults, function (result) {
        return isMatch(parseContextFieldFromResponse(result.context), searchTerm);
    });
    return isFound !== undefined;
};

var LyricController = {
    isValidLyric: isValidLyric
};


module.exports = LyricController;