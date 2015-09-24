var _ = require('lodash');
var urlService = require('./UrlService.js');
var q = require('q');

var parseContextFieldFromResponse = function (context) {
    return context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
};

var parseSearchTerm = function (searchTerm) {
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

var isValidLyric1 = function(result, searchTerm){
    var lyricSearchResults = JSON.parse(result);
    var isFound = _.find(lyricSearchResults, function (r) {
        return isMatch(parseContextFieldFromResponse(r.context), searchTerm);
    });
    return isFound !== undefined;
};

var LyricController = {
    isValidLyric1: isValidLyric1,
    isValidLyric: isValidLyric,
    parseSearchTerm: parseSearchTerm
};


module.exports = LyricController;