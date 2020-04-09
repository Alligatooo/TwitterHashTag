'use-strict';

require('dotenv').config();
let twitter;
let Twitter;
var config;


class Twitterwrapper
{

    static errorFunc(err, response, body) {
        
        writeContext();
    }

    static success (data) {
        var dataAsObject = JSON.parse(data);
        var concat = "";
        for (let i = 0; i < dataAsObject.statuses.length; i++) {
            var tweet = dataAsObject.statuses[i];
            concat += tweet.text + "<p>";
        }
        toWrite = concat;
        writeContext();
    }

    static handleRequest() {
        if (Twitter === undefined) {
            setUp();
        }
        twitter.getSearch({ 'q': toSearch, 'lang': 'de', 'count': 10 }, errorFunc, success);
    }
}

function setUp() {
    Twitter = require('twitter-node-client').Twitter;
    config = {
        "consumerKey": process.env.CONSUMER__KEY,
        "consumerSecret": process.env.CONSUMER__SECRET,
        "accessToken": process.env.ACCESS__TOKEN,
        "accessTokenSecret": process.env.ACCESS__TOKENSECRET,
        "callBackUrl": "https://google.com"
    };
    twitter = new Twitter(config);
}



//Search handle
function handleSearch(request, response) {

        console.log("In here: " + request.url);
    var toSearch = null;
    var toWrite = "Hashtag not entered or invalid";
    var query = url.parse(request.url, true).query;
    console.log(query);
    console.log(query.hashtag);

    if (query.hashtag) {
        toSearch = "#" + query.hashtag;
    }



    handleRequest();

    function writeContext() {
        response.send(toWrite.toString());
    }
}
exports.class = Twitterwrapper;
