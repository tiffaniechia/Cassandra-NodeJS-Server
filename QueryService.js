var urlService = require('./UrlService.js');

var parseContextFieldFromResponse = function (context) {
    return context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
};

var isValidLyric = function (searchTerm) {
    var results = urlService.getLyricSearchResults(searchTerm);
    var lyricSearchResults = JSON.parse(results);
    if (results) {
        for (var responseDataIndex = 0; responseDataIndex < lyricSearchResults.length; responseDataIndex++) {
            var context = parseContextFieldFromResponse(lyricSearchResults[responseDataIndex].context);
            if (context.indexOf(searchTerm) !== -1) {
                return true;
            }
        }
    }
};

var QueryService = {
    isValidLyric: isValidLyric
};


module.exports = QueryService;