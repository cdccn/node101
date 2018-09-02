"use strict";

var FileSizeWatcher = require("../src/FileSizeWatcher");
var exec = require("child_process").exec;

describe( "FileSizeWatcher", function(){

    var watcher;

    afterEach( function(){
        if( watcher != undefined )
            watcher.stop();
    });


    it("should fire a \"grew\" event when the file grew in size", function(done){

        var path = "/var/tmp/filesizewatcher.test";
        exec("rm -f " + path + " ; touch " + path , function(){
            
            console.log("let's start watching");
            
            watcher = new FileSizeWatcher( path );

            watcher.on("grew" , function(gain){
                console.log("The file has grown");
                expect(gain).toBe(5);
                done();
            });

            // this will make the file grew by 5 bytes
            exec( "echo \"test\" > " + path , function(){});
        });
    });
});