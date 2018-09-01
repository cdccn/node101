console.log("hello");
setTimeout( function(){console.log("world");} , 1000 );


var fs = require("fs");
fs.stat("/etc/passwd", function(err,stats){ console.dir(stats);} );