// Define server
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var {getRandomIntFromRange} = require('./utils');

// Define rest client
const AXIOS = require('axios');
// The port is being used by server
const SERVER_PORT = 3000;

// API keys
const GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
const GIPHYFY_TELEGRAM_BOT_API_KEY = '325544497:AAHsO21Qx2mBWq6INJ85OszFY_amDp9Lh2w';

// URL Endpoints
const TELEGRAM_BASE_URL = 'https://api.telegram.org';
const TELEGRAM_MESSAGE_PHOTO_ENDPOINT = '/sendPhoto';
const DEFAULT_PHOTO_URL = 'http://media.salemwebnetwork.com/cms/CROSSCARDS/17343-im-sorry-pug.jpg';

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
    const message = req.body;

    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
    if (!message) {
        // In case a message is not present => do nothing and return an empty response
        return res.end();
    }

    var searchString = message.text.trim().replace(/\s+/g, '+');
    var url = GIPHY_BASE_URL + GIPHY_SEARCH_ENDPOINT + '?q=' + searchString + '&' + GIPHY_API_KEY_SUFIX;

    AXIOS.get(url).then(response => {
        var gifs = response.data;

        var photoUrl = DEFAULT_PHOTO_URL;
        var caption = 'Sorry, we didn\'t find funny gif for you :(';
        if(gifs.length > 0) {
            var gifToShow = gifs[getRandomIntFromRange(0, gifs.length - 1)];
            photoUrl = gifToShow.images.downsized_medium.url.toString();
            caption = gifToShow.images.downsized_medium.url.toString();
        }
        // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
        AXIOS.post(TELEGRAM_BASE_URL + '/bot' + GIPHYFY_TELEGRAM_BOT_API_KEY + TELEGRAM_MESSAGE_PHOTO_ENDPOINT, {
            chat_id: message.chat.id,
            photo: photoUrl,
            caption: caption
        }).then(response => {
            // We get here if the message was successfully posted
            console.log('Message posted');
            res.end('ok');
        }).catch(err => {
            // ...and here if it was not
            res.end('Error: ' + err);
        });
    }).catch(error => {
        // Log the error
        res.end('From Giphy :' + error);
    });
});

// Finally, start our server
app.listen(SERVER_PORT, function() {
    console.log('Telegram giphyfy bot listening on port 3000!');
});