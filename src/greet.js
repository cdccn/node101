var greet = function( name ){

    if (name === undefined )
        return "Hello world!";
    else
        return "Hello " + name + "!";
};

module.exports.greet = greet;