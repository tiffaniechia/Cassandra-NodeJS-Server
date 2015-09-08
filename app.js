//CASSANDRA SETUP
var express = require('express');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');
var async = require('async');
var app = express();
app.use(bodyParser.json());

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function (err, result) {
    console.log('Connected.');
});

app.get('/metadata', function (req, res) {
    res.send(client.hosts.slice(0).map(function (node) {
        return {address: node.address, rack: node.rack, datacenter: node.datacenter}
    }));
});

app.post('/keyspace', function (req, res) {
    client.execute("CREATE KEYSPACE IF NOT EXISTS cassandra_spike WITH replication " +
        "= {'class' : 'SimpleStrategy', 'replication_factor' : 3};",
        afterExecution('Error: ', 'Keyspace created.', res));
});

function afterExecution(errorMessage, successMessage, res) {
    return function (err) {
        if (err) {
            console.log(errorMessage);
            return res.json(errorMessage);
        } else {
            res.json(successMessage);
        }
    }
}

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});


app.post('/tables', function (req, res) {
    async.parallel([
            function (next) {
                client.execute('CREATE TABLE IF NOT EXISTS cassandra_spike.users (' +
                    'username text PRIMARY KEY,' +
                    'password text,' +
                    ');',
                    next);
            },
            function (next) {
                client.execute('CREATE TABLE IF NOT EXISTS cassandra_spike.shouts (' +
                    'shout_id uuid PRIMARY KEY,' +
                    'username text,' +
                    'body text,' +
                    ');',
                    next);
            },

            function (next) {
                client.execute('CREATE TABLE IF NOT EXISTS cassandra_spike.usershouts (' +
                    'username text,' +
                    'body text,' +
                    'shout_id uuid,' +
                    'PRIMARY KEY (shout_id, username)' +
                    ');',
                    next);
            }
        ],
        afterExecution('Error: ', 'Tables created.', res));
});


app.post('/populate', function (req, res) {

    client.execute("INSERT INTO cassandra_spike.users(username, password) VALUES ('user1', 'password1');", [], function (err, res) {
    });
});

app.get('/users', function (req, res) {

    client.execute('SELECT * FROM cassandra_spike.users', [], function (err, result) {
        if (err) {
            res.status(404).send({msg: err});
        } else {
           
            res.json(result);
        }
    });
});


