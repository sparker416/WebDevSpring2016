var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var assignment = require('./public/assignment/server/app.js');

var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.bodyParser({ uploadDir: './public/uploads', keepExtensions: true }));
app.use(multer());

app.listen(port, ipaddress);

assignment(app);

/*
var express = require('express');


var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.bodyParser({ uploadDir: './public/uploads', keepExtensions: true }));
app.use(multer());

var games = [
    {
        _id: "000",
        name: "Risk",
        userId: 123,
        counter: 1,
        dateLastPlayed: new Date(10, 4, 2016)
    },
    {
        _id: "010",
        name: "Monopoly",
        userId: 123,
        counter: 2,
        dateLastPlayed: new Date()
    },
    {
        _id: "020",
        name: "Clue",
        userId: 234,
        counter: 1,
        dateLastPlayed: new Date()
    }
];

app.get("/rest/game", function(req, res)
{
    res.send(games);
});

app.get("/rest/game/:id", function(req, res)
{
    var index = req.params["id"];
    res.send(games[index]);
});

app.delete("/rest/game/:id", function(req, res)
{
    var index = req.params["id"];
    games.splice(index, 1);
    res.json(games);
});

app.post("/rest/game", function(req, res)
{
   var game = req.body;
    games.push(game);
    res.json(games);
});

app.put("/rest/game/:id", function(req, res)
{
    var index = req.params["id"];
    games[index].counter++;
    games[index].dateLastPlayed = new Date();
    res.json(games);
});

app.listen(port, ipaddress);
    */