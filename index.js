var Hapi = require('hapi');
var Joi = require('joi');
var Fs = require('fs');

// Create a server with a host and port
var server = Hapi.createServer('localhost', 8000);

// Define the route
var getHelloConfig = {
    handler: function (request, reply) {
        reply({ greeting: 'hello ' + request.query.name });
    },
    validate: {
        query: { name: Joi.string(2).min(1).required() } 
    }
};

var helloPostHandler = function(request, reply) {
    //console.log("rawPayload: " + request.rawPayload);
    console.log("Received POST from " + request.payload.name + "; id=" + (request.payload.id || 'anon'));

    if (request.payload.uploadFile) {
        var f = request.payload.uploadFile;
        console.log("uploadFile " + f.originalFilename + " (" + f.size + " bytes) at " + f.path);
        console.log("that you should persist to storage and remove from temp folder");
        // Use fs for this one: http://nodejs.org/api/fs.html
        Fs.unlink(f.path, function (err) {
            if (err) throw err;
                console.log('successfully deleted ' + f.path);
        });
    }

    reply({ 
        greeting: 'POST hello to ' + request.payload.name
    });
}

var postHelloConfig = {
    handler: helloPostHandler, 
    validate: { 
        payload: { 
            name: Joi.string().min(1).required(), 
            id: Joi.number().min(100).max(999999999),
            uploadFile: Joi.object().optional()
    } }
};

// Add the routes
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
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: { path: './public', listing: false, index: true }
        }
    }
]);

// Start the server
server.start();