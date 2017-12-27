const express = require('express');
const app = express();
const port = process.env.PORT || 27017;
const mongoose = require('mongoose');
const PylintMessage = require('./api/models/pylintModel').model;
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PylintDb', {
    useMongoClient: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const routes = require('./api/routes/pylintRoutes');
routes(app);

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    });
});

app.listen(port);
console.log('Pylint RESTful API server started on: ', port);