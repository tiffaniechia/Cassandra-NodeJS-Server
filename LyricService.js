var urlService = require('./UrlService.js');

var parseContextFieldFromResponse = function (context) {
    return context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
};

var parseDOMElementFullLyrics = function (lyrics) {
    return lyrics.replace(/\n+/g, " ").replace(/[^a-zA-Z\s]/gi, '').toLowerCase();
};

var getFullLyricsFromDOM = function (body) {
    return body.match(/<pre[^>]*>([\s\S]*?)<\/pre>/)[0];
};

var isMatch = function(searchable, searchTerm) {
    return searchable.indexOf(searchTerm) !== 1;
};

var isValidLyric = function (searchTerm) {
    var results = urlService.getLyricSearchResults(searchTerm);
    var lyricSearchResults = JSON.parse(results);
    if (lyricSearchResults) {
        for (var responseIndex = 0; responseIndex < lyricSearchResults.length; responseIndex++) {
            var context = parseContextFieldFromResponse(lyricSearchResults[responseIndex].context);
            return isMatch(context, searchTerm);
        }
    }
};

var getFullLyricsFromAllSearchResults = function (searchTerm) {
    var allValidFullLyrics = [];
    var allResults = urlService.getLyricSearchResults(searchTerm);
    var lyricSearchResults = JSON.parse(allResults);
    if (lyricSearchResults) {
        for (responseDataIndex = 0; responseDataIndex < lyricSearchResults.length; responseDataIndex++) {
            if (lyricSearchResults[responseDataIndex].viewable) {
                request(lyricSearchResults[responseDataIndex].url, function (error, response, body) {
                    var lyrics = getFullLyricsFromDOM(body);
                    var parsedLyrics = parseDOMElementFullLyrics(lyrics);
                    if (isMatch(parsedLyrics, searchTerm)) {
                        allValidFullLyrics.add(lyrics);
                    }
                });
            }
        }
    }
};


var LyricService = {
    isValidLyric: isValidLyric
};


module.exports = LyricService;