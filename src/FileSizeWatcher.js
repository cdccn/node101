"use strict";

var fs = require("fs");

var FileSizeWatcher = function( path ){
    var self = this;

    self.callbacks = {};

    if ( /^\//.test(path) === false )
    {
        //!!!!!!!!
        // This is very important : since the callback is not set yet (we are in the
        // constructor), we need to tell Node to execute the callback in the next loop
        // we do that with process.nextTick
        //!!!!!!!!
        process.nextTick( function(){
            self.callbacks["error"]("Path does not start with a slash");
        });
        return;
    }

    fs.stat( path , function(err,stats){
        self.lastfilesize = stats.size;
    });

    self.interval = setInterval(
        function(){
            fs.stat(path, function(err, stats) {
                if(stats.size > self.lastfilesize)
                {
                    self.callbacks["grew"](stats.size - self.lastfilesize);
                    self.lastfilesize = stats.size;
                }
                else if( stats.size < self.lastfilesize)
                {
                    self.callbacks["shrank"](self.lastfilesize - stats.size);
                    self.lastfilesize = stats.size;
                }
            });
        } , 1000 );
    console.log("Ready to watch " + path);
};

FileSizeWatcher.prototype.on = function(eventType, callback){
    console.log("Set a listener on " + eventType );
    this.callbacks[eventType] = callback;
};

FileSizeWatcher.prototype.stop = function(){
    clearInterval(this.interval);
};

module.exports = FileSizeWatcher;