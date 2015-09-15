var express = require('express');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');
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


var lyricController = require('./src/LyricController.js');
var urlService = require('./src/UrlService.js');
app.get('/lyrics', function(req, res){
    console.log(lyricController.isValidLyric1('hello'));
    res.send({result: lyricController.isValidLyric1('hello')});

});