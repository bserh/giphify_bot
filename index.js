// Define server and its requisites
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// Import useful functions from utils module
var {getRandomIntFromRange, buildGiphySearchURL} = require('./utils');

// The port is being used by server
const SERVER_PORT = 3000;

// Define rest client
const AXIOS = require('axios');

// Telegram imports
const {TELEGRAM_BASE_URL, TELEGRAM_MESSAGE_GIF_ENDPOINT, DEFAULT_GIF_URL} = require('./constants');
const {GIPHYFY_TELEGRAM_BOT_API_KEY} = require('./variables');

// Rest enpoints
const BOT_INCOMING_MESSAGE_ENDPOINT = '/new-message';

// Prepare body parsers
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

    var searchString = message.text.trim().replace(/\s+/g, '+'),
        giphySearchURL = buildGiphySearchURL(searchString),
        // Defaults
        gifURL = DEFAULT_GIF_URL,
        caption = 'Sorry, I didn\'t find funny gif for you :(';

    AXIOS.get(giphySearchURL).then(response => {
        var gifs = response.data.data;

        if(gifs.length > 0) {
            var gifToShow = gifs[getRandomIntFromRange(0, gifs.length - 1)];

            // Override data
            gifURL = gifToShow.images.downsized_medium.url.toString();
            caption = gifToShow.images.downsized_medium.url.toString();
        }

        // Send random gif from the first page(from 25 gifs retrieved) of response data
        sendGifToTelegram(message.chat.id, gifURL, caption, res);
    }).catch(error => {
        // Send defaults
        sendGifToTelegram(message.chat.id, gifURL, caption, res);
    });
});

function sendGifToTelegram(chatId, gifUrl, gifCaption, res) {
    // Remember to use your own API token instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
    AXIOS.post(TELEGRAM_BASE_URL + '/bot' + GIPHYFY_TELEGRAM_BOT_API_KEY + TELEGRAM_MESSAGE_GIF_ENDPOINT, {
        chat_id: chatId,
        video: gifUrl,
        caption: gifCaption
    }).then(response => {
        // We get here if the message was successfully posted
        console.log('Message posted');
        res.end('ok');
    }).catch(err => {
        // ...and here if it was not
        res.end('Error: ' + err);
    });
}

// Finally, start our server
app.listen(SERVER_PORT, function() {
    console.log('Telegram giphyfy bot listening on port 3000!');
});