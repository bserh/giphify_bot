// URLs grom telegram
const TELEGRAM_BASE_URL = 'https://api.telegram.org';
const TELEGRAM_MESSAGE_GIF_ENDPOINT = '/sendVideo';
const DEFAULT_GIF_URL = 'http://gph.is/1KuNTVa';

// URLs from giphy
const {GIPHY_PUBLIC_API_KEY} = require('./variables');

const GIPHY_BASE_URL = 'http://api.giphy.com';
const GIPHY_API_KEY_SUFIX = 'api_key=' + GIPHY_PUBLIC_API_KEY;
const GIPHY_SEARCH_ENDPOINT = '/v1/gifs/search';

module.exports = {
    // Giphy
    GIPHY_BASE_URL, GIPHY_API_KEY_SUFIX, GIPHY_SEARCH_ENDPOINT,

    // Telegram
    TELEGRAM_BASE_URL, TELEGRAM_MESSAGE_GIF_ENDPOINT, DEFAULT_GIF_URL
}