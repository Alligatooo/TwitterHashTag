'use-strict'
//Libs
var express = require('express');
var app = express();

var port = process.env.port || 3000;

const url = require('url');
const fs = require('fs');
var twitter = require('./TwitterHandle.js');

app.get("/?hashtag",
    function (req, res) {
        console.log("something");
        twitter.handleSearch(req, res);
    });


//Server handling
app.get('/', function (request, response) {

    var handlePageView = function (request1, response1) {
        fs.readFile(__dirname + "/Frontpage.html", function (error, data) {
            console.log(data.toString());
            response1.send(data.toString());
            console.log("Data sent");
        });
    };
    handlePageView(request, response);
    response.end();
});

//Listen to the given port
var server = app.listen(port, () => {
    console.log('Listening at: ' + port);
}

);
