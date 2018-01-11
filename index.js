const express = require('express');
const app = express();
const port = process.env.PORT || 27017;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const routes = require('./api/routes/routes');
routes(app);

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    });
});

app.listen(port);
console.log('Pylint RESTful API server started on: ', port);