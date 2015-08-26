var urlService = require('./UrlService.js');

var parseContextFieldFromResponse = function (context) {
    return context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
};

var isValidLyric = function (searchTerm) {
    var results = urlService.getLyricSearchResults(searchTerm);
    var lyricSearchResults = JSON.parse(results);
    if (lyricSearchResults) {
        for (var responseDataIndex = 0; responseDataIndex < lyricSearchResults.length; responseDataIndex++) {
            var context = parseContextFieldFromResponse(lyricSearchResults[responseDataIndex].context);
            if (context.indexOf(searchTerm) !== -1) {
                return true;
            }
        }
    }
};

var getFullLyricsFromAllSearchResults = function (searchTerm) {
    var allResults = urlService.getLyricSearchResults(searchTerm);
    var count = 0;
    var lyricSearchResults = JSON.parse(allResults);
    if (lyricSearchResults) {
        for (responseDataIndex = 0; responseDataIndex < lyricSearchResults.length; responseDataIndex++) {
            if (lyricSearchResults[responseDataIndex].viewable) {
                request(lyricSearchResults[responseDataIndex].url, function (e, r, d) {
                    var lyrics = d.match(/<pre[^>]*>([\s\S]*?)<\/pre>/)[0];
                    if (lyrics.replace(/\n+/g, " ").replace(/[^a-zA-Z\s]/gi, '').indexOf('blank space') != -1) {
                        count++;
                        console.log(count);
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