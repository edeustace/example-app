var app, express, fs, port;

fs = require('fs');
var querystring = require('querystring');
var http = require('http');

express = require('express');
app = express();

var scores = {};

app.use(express.static(__dirname + '/'));

port = process.env.PORT || 8000;

app.listen(port, function () {
    return console.log("server started");
});