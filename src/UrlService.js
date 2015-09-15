var request = require('request');
var q = require('q');
var API_KEY = '9a4d95c72ea279e77ef7f1773010a9';

var parseSearchTermForQuery = function (searchTerm) {
    return searchTerm.toLowerCase().split(" ").join("%20");
};

var getLyricSearchResults = function (searchTerm) {
    var deferred = q.defer();
    var searchQueryString = parseSearchTermForQuery(searchTerm);
    request('http://api.lyricsnmusic.com/songs?api_key=' + API_KEY + '&lyrics=' + searchQueryString, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //return body;

            deferred.resolve(body);
            //return body;
        }
    });
    return deferred.promise;
};

var UrlService = {
    getLyricSearchResults: getLyricSearchResults
};


module.exports = UrlService;