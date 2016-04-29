/**
 * Created by spark on 4/29/2016.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public2'));

app.get('/', function(req, res){
    res.send('hello world');
});

app.get('/getSomeJson', function(req, res){
    res.send({message: "Hello World"});
});

app.listen(3000);