var express = require('express'),
    app = express(),
    port = process.env.PORT || 27017,
    mongoose = require('mongoose'),
    PylintMessage = require('./api/models/pylintModel').model, //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PylintDb');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var routes = require('./api/routes/pylintRoutes'); //importing route
routes(app); //register the route

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
});


app.listen(port);

console.log('Pylint RESTful API server started on: ', port);