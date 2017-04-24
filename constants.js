// URLs grom telegram
const TELEGRAM_BASE_URL = 'https://api.telegram.org';
const TELEGRAM_MESSAGE_PHOTO_ENDPOINT = '/sendPhoto';
const DEFAULT_PHOTO_URL = 'http://media.salemwebnetwork.com/cms/CROSSCARDS/17343-im-sorry-pug.jpg';

// URLs from giphy
const {GIPHY_PUBLIC_API_KEY} = require('./variables');

const GIPHY_BASE_URL = 'http://api.giphy.com';
const GIPHY_API_KEY_SUFIX = 'api_key=' + GIPHY_PUBLIC_API_KEY;
const GIPHY_SEARCH_ENDPOINT = '/v1/gifs/search';

module.exports = {
    // Giphy
    GIPHY_BASE_URL, GIPHY_API_KEY_SUFIX, GIPHY_SEARCH_ENDPOINT,

    // Telegram
    TELEGRAM_BASE_URL, TELEGRAM_MESSAGE_PHOTO_ENDPOINT, DEFAULT_PHOTO_URL
}