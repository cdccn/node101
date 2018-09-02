//
// Spec for emitter behavior in node.js
//
fs = require("fs");

var readData = function( data ){
    console.log("Read data : " + data );
};

var endOfFile = function(){
    console.log("End of file reached");
};

describe("Emitter", function()
{
    it ( "should raise an exception in case of file not found if no listener is set to error" , 
        function(){
            var exceptionThrowed = false;
            try {    
                stream = fs.createReadStream("/file/not/found.txt");
                stream.on( "data" , readData );
                stream.on( "end" , endOfFile );
            }
            catch( ex )
            {
                console.log("exception " + ex);
                exceptionThrowed = true;
                expect( exceptionThrowed ).toBe( true );
            }
            finally
            {
                
            }
        }
    );


    it ( "should NOT raise an exception in case of file not found if no listener is set to error" , 
    function(){
        try {        
            stream = fs.createReadStream("/file/not/found.txt");
            stream.on( "data" , readData );
            stream.on( "end" , endOfFile );
            console.log("a");
            stream.on( "error" , function(){
                console.log("error : " + err );
                expect( true ).toBe( true );
            });
        }
        catch( ex )
        {
            expect( true ).toBe(false);
        }
    }
);
    
});