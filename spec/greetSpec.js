var g = require( "../src/greet").greet;

console.log( g() );

describe("greet", function(){

    it("should greet the given name", function(){
        expect( g("Joe") ).toEqual("Hello Joe!");
    });

    it("should greet to world", function(){
        expect( g() ).toEqual("Hello world!");
    });
});
