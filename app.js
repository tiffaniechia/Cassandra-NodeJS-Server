var express = require('express');
var request = require('request');
var app = express();

var urlService = require('./UrlService.js');
var lyricService = require('./LyricService.js');
var message = require('../Message.js');

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});

app.get('/fullLyrics', function (req, res) {
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
    //lyricsService.isValidLyric(searchTerm)
});

//CASSANDRA SETUP

//var bodyParser = require('body-parser');
//var cassandra = require('cassandra-driver');

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







