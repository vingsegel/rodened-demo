var http = require('http');
var express = require("express");
var RED = require("node-red");
//var user = process.env.USER1;
// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/",
    httpNodeRoot: "/api",
    //userDir: "/data/",
    editorTheme: {
    page: {
            title: "Rodened",
            //favicon: " ",
            //css: " ",
            //scripts: [ "/absolute/path/to/custom/script/file", "/another/script/file"]
        },
        header: {
            title: "Rodened",
            image: null, //"https://www.rodened.com/images/rodened_vit_b.png",            
            url: "http://rodened.com" // optional url to make the header text/image a link to this url
        },
        deployButton: {
            type:"simple",
            label:"Save",
            icon: null // "/absolute/path/to/deploy/button/image" or null to remove image
        },   
    projects: {
        enabled: false
    }
},
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8000);

// Start the runtime
RED.start();
