// Define server
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
const axios = require('axios');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));