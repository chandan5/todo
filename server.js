var express = require('express');
var bodyParser = require('body-parser');
var model = require('./model');
var bootstrap = require('./bootstrap');
const routes = require('./routes');


var app = express();


// parse application/json
app.use(bodyParser.json())

// add routes
app.use(routes);

bootstrap.connectDB()
    .then(function(){
        app.listen(8080);
        console.log("listening at port 8000");
    })
    .catch(function (err) {
        console.log(err);
        console.log("some problem with db connection");
    });
