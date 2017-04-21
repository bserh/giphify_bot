// Define server
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
const AXIOS = require('axios');
const SERVER_PORT = 3000;

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));


// Finally, start our server
app.listen(SERVER_PORT, function() {
    console.log('Telegram giphyfy bot listening on port 3000!');
});