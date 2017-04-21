// Define server
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Define rest client
const AXIOS = require('axios');
// The port is being used by server
const SERVER_PORT = 3000;

// API keys
const GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
const {GIPHYFY_TELEGRAM_BOT_API_KEY} = require('constants');

// URL Endpoints
const TELEGRAM_BASE_URL = 'https://api.telegram.org';
const GIPHY_BASE_URL = 'http://api.giphy.com';
const GIPHY_API_KEY_SUFIX = 'api_key=' + GIPHY_PUBLIC_API_KEY;
const GIPHY_SEARCH_ENDPOINT = '/v1/gifs/search';

const BOT_INCOMING_MESSAGE_ENDPOINT = '/new-message';

// For parsing application/json
app.use(bodyParser.json());
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

//This is the route the API will call
app.post(BOT_INCOMING_MESSAGE_ENDPOINT, function (req, res) {
    const {message} = req.body;

    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
    if (!message) {
        // In case a message is not present => do nothing and return an empty response
        return res.end();
    }

    var searchString = message.text.replace(/\s+/g, '+');
    var url = GIPHY_BASE_URL + GIPHY_SEARCH_ENDPOINT + '?q=' + searchString + '&' + GIPHY_API_KEY_SUFIX;

    AXIOS.get(url).then(response => {
        console.log(response);

        // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
        AXIOS.post(TELEGRAM_BASE_URL + '/bot' +  + '/sendMessage', {
            chat_id: message.chat.id,
            text: 'Got it'
        }).then(response => {
            // We get here if the message was successfully posted
            console.log('Message posted');
            res.end('ok');
        }).catch(err => {
            // ...and here if it was not
            console.log('Error :', err);
            res.end('Error :' + err);
        });
    }).catch(error => {
        // Log the error
        console.log(error);
        res.end('Error :' + err);
    });
});

// Finally, start our server
app.listen(SERVER_PORT, function() {
    console.log('Telegram giphyfy bot listening on port 3000!');
});