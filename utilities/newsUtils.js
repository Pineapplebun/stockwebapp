const https = require("https");
const fs = require("fs");
var apiKey = fs.readFileSync("./utilities/newsapi.txt");

module.exports = {
    getNews: getNews,
    getSources: getSources
}

// Return a set of top 20 popular news articles of a stock query that occur between two dates
// https://newsapi.org/v2/everything?q=amd+stock&from=2018-02-01&to=2018-02-30&sortby=popularity&apiKey=...
function getNews(req) {
    return new Promise(
        function(resolve, reject) {
            // do stuff here
            var url = `https://newsapi.org/v2/everything?q=${req.symbol}&from=${req.start}&to=${req.end}&sortby=popularity&apiKey=${apiKey}`
            https.get(url, (res) => {
                // data is requested is buffered
                let data = '';
                res.on('data', (chunk) => {data += chunk});
                res.on('end', () => {resolve(array(data))});
            })
            .on('error', (e) => {reject(Error(e));});
        })
}

// Return a set of sources to check against the graph
function getSources() {

}

function array(data) {
    try {
        let json = JSON.parse(data);
        return json["articles"]; // array
    } catch(e) {
        return Error(e);
    }
}
