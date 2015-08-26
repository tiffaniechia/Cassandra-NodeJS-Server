var express = require('express');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');
var request = require('request');

var app = express();

//var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
//client.connect(function (err, result) {
//    console.log('Connected.');
//});

//app.use(bodyParser.json());
//app.set('json spaces', 2);
//
//app.get('/metadata', function (req, res) {
//    res.send(client.hosts.slice(0).map(function (node) {
//        return {address: node.address, rack: node.rack, datacenter: node.datacente
//    }));
//});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});

app.get('/fullLyrics', function (req, res) {
    // api returns non-consecutive word matches - returns results that matches any permutations of the search
        // example: 'I heaven sheep' would yield results even though there are no lyrics with these 3 consecutive words together
        // it would return results that matches 'I', 'heaven', 'sheep' or any permutations it can find

    // to get full lyrics, first it checks for these matches
    // find if lyric body is viewable
    // gets the DOM from the url if viewable
    // returns if the full lyric matches the search (currently just adds to count)
    var count = 0;
    request('http://api.lyricsnmusic.com/songs?api_key=9a4d95c72ea279e77ef7f1773010a9&lyrics=blank%20space', function (err, res, body) {
        var lyricSearchResults = JSON.parse(body);
        if (body) {
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
    });

});


app.get('/lyricsMatch', function (req, res) {
    //just checks for matches from context parameter in response
    // response returns a 'context' in which the API server picks out the phrase which it thinks matches the search best
    // response wraps the 'matches' in '<em>' tags
    // parsing this response it will return if the context matches the search.
    //also currently just returns a count
    var count = 0;
    request('http://api.lyricsnmusic.com/songs?api_key=9a4d95c72ea279e77ef7f1773010a9&lyrics=blank%20space', function (err, res, body) {
        var lyricSearchResults = JSON.parse(body);
        if (body) {
            for (i = 0; i < lyricSearchResults.length; i++) {
                var context = lyricSearchResults[i].context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "");
                if (context.indexOf('blank space') !== -1) {
                    count++;
                    console.log(count);
                }

            }

        }
    });

});








