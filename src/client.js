"use strict";

var request = require("request");


/**
 * 
 * Without Async lib, it is a mess to get 2 async results
 * 
 */
var name, status;
var firstFinished, secondFinished = false;

request.get( "http://localhost:8888/getUserName?id=1234" ,
    function(err , res , body){
        var result = JSON.parse(body);
        name = result.value;
        markeFinished( 1 );
    }
);

request.get( "http://localhost:8888/getUserStatus?id=1234" , 
    function(err,res,body){
        var result = JSON.parse(body);
        status = result.value;
        markeFinished(2);
    }
);

function markeFinished( nb ){
    
    if ( nb === 1 )
        firstFinished = true;
    else if ( nb === 2 )
        secondFinished = true;
    
    if( firstFinished && secondFinished )
        console.log("Name is " + name + " and status is " + status );
}


/**
 * 
 * Now let's use asynct to make beautiful parallel calls
 * 
 */
var async = require("async");

var getUserName = function(callback){
    request.get( "http://localhost:8888/getUserName?id=1234" ,
        function(err , res , body){
            var result = JSON.parse(body);
            name = result.value;
            callback( err , name );
        });
};


var getUserStatus = function(callback){
    request.get( "http://localhost:8888/getUserStatus?id=1234" , 
        function(err,res,body){
            var result = JSON.parse(body);
            status = result.value;
            callback( err , status);
        }
    );
};

async.parallel( [ getUserStatus , getUserStatus ] , function(err,res){
    console.log("Name is " + res[0] + " and status is " + res[1] );
});

    
