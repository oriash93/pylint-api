const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const port = process.env.PORT || 27017;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(routes);

app.use(function (req, res) {
    res.status(404).send({url: `${req.originalUrl} not found`});
});

app.listen(port, ()=> 
    console.log(`Pylint RESTful API server started on port ${port}`)
);