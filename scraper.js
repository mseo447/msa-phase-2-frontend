function init() {
    
    const request = require('superagent');
    const { parse } = require('node-html-parser');

    const scraper = () => {
        return request
        .get(["http://localhost:3000/"])
        .then(res => res.text)
        .then(parse)
        .then(console.log);
    };

    scraper();

    module.exports = { scraper };
    
}

init();