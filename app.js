var express = require('express');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');

var app = express();

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function (err, result) {
    console.log('Connected.');
});

app.use(bodyParser.json());
app.set('json spaces', 2);

app.get('/metadata', function (req, res) {
    res.send(client.hosts.slice(0).map(function (node) {
        return {address: node.address, rack: node.rack, datacenter: node.datacenter}
    }));
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});