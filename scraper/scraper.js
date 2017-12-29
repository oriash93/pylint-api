const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const allMessages = [];
const outputFilename = 'scraper/data.json';
const baseUrl = 'http://pylint-messages.wikidot.com';
const allCodesUrl = baseUrl + '/all-codes';
const messageUrl = baseUrl + '/messages:';
const codeTypes = require('../api/models/pylintModel').types;

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
        allMessages.push(item);
    });
}

function writeToFile() {
    fs.writeFile(outputFilename, JSON.stringify(allMessages, null, 4), function (err) {});
}

async function main() {
    const codesResponse = await request(allCodesUrl, function (error, response, body) {
        parseAllCodesPage(body);
        writeToFile();
    });
}

main().catch(e => console.error(e));