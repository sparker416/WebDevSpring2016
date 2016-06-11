var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var assignment = require('./public/assignment/server/app.js');
var project = require('./public/project/server/app.js');

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
project(app);