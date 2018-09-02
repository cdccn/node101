//
// basic callbacks
//
console.log("hello");
setTimeout( function(){console.log("world");} , 1000 );

var fs = require("fs");
fs.stat("/etc/passwd", function(err,stats){ console.dir(stats);} );

//
// use of emitters
//
stream = fs.createReadStream( "/etc/passwd");

// stream is a emitter, we can attach listeners to it
stream.on( "data" , function(data){
    console.log("I have received data : " + data);
});

stream.on ( "end", function(){
    console.log("End of file has been reached");
});
