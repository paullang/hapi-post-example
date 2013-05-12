var Hapi = require('hapi');
var Joi = require('joi');


// Create a server with a host and port
var server = Hapi.createServer('localhost', 8000);

// Define the route
var getHelloConfig = {
    handler: function (request) {
        request.reply({ greeting: 'hello ' + request.query.name });
    },
    validate: {
        query: {
            name: Joi.Types.String().required()
        }
    }
};

var helloPostHandler = function(request) {
    request.reply({ greeting: 'POST hello to ' + request.payload.name });
}

var postHelloConfig = {
    handler: helloPostHandler, 
    validate: { payload: { name: Joi.Types.String().required() } }
};

// Add the route
server.route([{
        method: 'GET',
        path: '/hello',
        config: getHelloConfig
    },
    {
        method: 'POST',
        path: '/hello',
        config: postHelloConfig
    }
    ,
    {
       method: 'POST',
        path: '/hello2',
        handler: helloPostHandler
    }
]);

// Start the server
server.start();