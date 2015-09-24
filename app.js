var express = require('express');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');
var _ = require('lodash');
var q = require('q');
var app = express();
app.use(bodyParser.json());

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});

client.connect(function (err, result) {
    console.log('Connected.');
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});

app.get('/metadata', function (req, res) {
    res.send(client.hosts.slice(0).map(function (node) {
        return {address: node.address, rack: node.rack, datacenter: node.datacenter}
    }));
});

app.get('/users', function (req, res) {
    client.execute('SELECT * FROM cassandra_base.users', [], function (err, result) {
        if (err) {
            res.status(404).send({msg: err});
        } else {
            res.json(result);
        }
    });
});


var urlService = require('./src/UrlService.js');

app.get('/lyrics', function (req, res) {

    var parseContextFieldFromResponse = function (context) {
        return context.replace(/em>+/g, "").replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
    };
    var parseSearchTerm = function (searchTerm) {
        return searchTerm.replace(/[^a-zA-Z\s]/gi, "").toLowerCase();
    };
    var isMatch = function (searchable, searchTerm) {
        return searchable.indexOf(searchTerm) !== -1;
    };
    var searchTerm = parseSearchTerm('hello');
    urlService.getLyricSearchResults(searchTerm, function (err, result) {
        var lyricSearchResults = JSON.parse(result);
        var isFound = _.find(lyricSearchResults, function (r) {
            return isMatch(parseContextFieldFromResponse(r.context), searchTerm);
        });
        res.send({result: isFound !== undefined})
    });

});