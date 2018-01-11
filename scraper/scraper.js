const cheerio = require('cheerio');
const request = require('request');
const db = require('../database/database').db;

const allMessages = [];
const outputFilename = 'scraper/data.json';
const baseUrl = 'http://pylint-messages.wikidot.com';
const allCodesUrl = baseUrl + '/all-codes';
const messageUrl = baseUrl + '/messages:';
const codeTypes = require('../database/database').types;

function parseAllCodesPage(data) {
    let $ = cheerio.load(data);
    let paragraph = $('div#page-content p:nth-child(2)');
    var lines = paragraph.text().split('\n');
    lines.forEach(function (line) {
        let code = line.slice(0, 5).toLowerCase();
        let item = {
            code: code,
            messageType: codeTypes[code[0]],
            pageUrl: messageUrl + code,
            messageContent: line.slice(7)
        };
        db.get('messages')
            .push(item)
            .write();
    });
}

async function main() {
    db.get('messages')
        .remove()
        .write();

    const codesResponse = await request(allCodesUrl, function (error, response, body) {
        parseAllCodesPage(body);
    });
}

main().catch(e => console.error(e));