/**
 * 
 * Basic use cases of objects in Javascript / node
 * 
 */

// with objects
console.log("Emulate OOP with custom objects");
var makeCar = function() {
    var car = {};

    car.honk  = function() { console.log("honk honk");};
    car.drive = function() { console.log("vroom");};

    return car;
};

var cars = [];
for(  i = 0 ; i < 10 ; i++)
    cars.push( makeCar() );
cars.forEach( function(c){ c.honk(); } );


// with a pseudo constructor 
// note the function are created and stored in mem for each objects
console.log("Emulate OOP with pseudo constructor and this");
var Car = function() {
    this.honk  = function() { console.log("honk honk");};
    this.drive = function() { console.log("vroom");};
}

var cars = [];
for(  i = 0 ; i < 10 ; i++)
    cars.push( new Car() );
cars.forEach( function(c){ c.honk(); } );

// with prototyping done manually
// a better mem management here since the function is stored only once
console.log("OOP with prototyping done manually");

Car = function(){};
Car.prototype.honk = function(){console.log("honk from prototype");};

var c1 = new Car();
var c2 = new Car();
c1.honk();
c2.honk();

// now the official way
console.log("OOP with native Object.create method");

var vehicule = {};
vehicule.drive = function(){ console.log("vroom");};

var car = Object.create( vehicule );
car.honk = function(){ console.log("honk honk");};

var c1 = Object.create( car );
c1.honk();
c1.drive();