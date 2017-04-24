function getRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildGiphySearchURL(searchKeyword) {
    const {GIPHY_BASE_URL, GIPHY_SEARCH_ENDPOINT, GIPHY_API_KEY_SUFIX,
        GIPHY_RANDOM_ENDPOINT, RANDOM_KEYWORD_COMMAND} = require('./constants');

    if(searchKeyword === RANDOM_KEYWORD_COMMAND) {
        return GIPHY_BASE_URL + GIPHY_RANDOM_ENDPOINT + '?' + GIPHY_API_KEY_SUFIX;
    }

    return GIPHY_BASE_URL + GIPHY_SEARCH_ENDPOINT + '?q=' + searchKeyword + '&' + GIPHY_API_KEY_SUFIX;
}

module.exports = {
    getRandomIntFromRange, buildGiphySearchURL
}