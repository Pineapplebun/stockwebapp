const axios = require("axios"),
  apiKey = process.env.NEWS_API;

module.exports = {
  getNewsData,
}

function getNewsData(msg) {
  return axios.get(`https://newsapi.org/v2/everything?q=${msg.symbol}&from=${msg.start}&to=${msg.end}&sortby=popularity&apiKey=${apiKey}`);
}

