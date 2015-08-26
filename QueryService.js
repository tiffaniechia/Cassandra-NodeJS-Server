var express = require('express');
var request = require('request');

var parseContextFieldFromResponse = function (context) {
    return context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "");
};

var parseSearchTermForQuery = function (searchTerm) {
    return searchTerm.toLowerCase().split(" ").join("%20");
};

var getLyricValidity = function (searchTerm) {
    var searchQueryString = parseSearchTermForQuery(searchTerm);
    var responseDataIndex = 0;
    request('http://api.lyricsnmusic.com/songs?api_key=9a4d95c72ea279e77ef7f1773010a9&lyrics=' + searchQueryString, function (err, res, body) {
        var lyricSearchResults = JSON.parse(body);
        if (body) {
            for (responseDataIndex; responseDataIndex < lyricSearchResults.length; responseDataIndex++) {
                var context = parseContextFieldFromResponse(lyricSearchResults[responseDataIndex].context);
                if (context.indexOf(searchTerm) !== -1) {
                    return true;
                }

            }

        }
    });
};

var QueryService = {
    getLyricValidity: getLyricValidity
};


module.exports = QueryService;