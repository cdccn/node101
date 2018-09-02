/**
 * Fake server that echoes any request and simulate a random process duration
 * Use it by calling the index.js
 */
var http = require("http");
var url = require("url");
var queryString = require("querystring");

function start(){
    function onRequest(request, response){

        var pathname = url.parse( request.url ).pathname;
        var query = url.parse( request.url ).query;
        var id = queryString.parse(query)["id"];

        var result = {
            "pathname" : pathname,
            "id":id,
            "value": Math.floor( Math.random() * 100)  
        };

        // wait a bit 
        setTimeout( function(){
            response.writeHead(200, {"Content-Type": "application/json"})
            response.end(JSON.stringify(result));
        } , 500 + Math.floor(Math.random() * 500 ) );
    }

    http.createServer( onRequest ).listen(8888 , function(){
        console.log("Fake server listening on 8888");
    } );
}

exports.start = start;