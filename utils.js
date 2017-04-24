function getRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildGiphySearchURL(searchKeyword) {
    const {GIPHY_BASE_URL, GIPHY_SEARCH_ENDPOINT, GIPHY_API_KEY_SUFIX} = require('./constants');
    return GIPHY_BASE_URL + GIPHY_SEARCH_ENDPOINT + '?q=' + searchKeyword + '&' + GIPHY_API_KEY_SUFIX;
}

module.exports = {
    getRandomIntFromRange, buildGiphySearchURL
}