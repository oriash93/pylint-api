const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const allMessages = [];
const outputFilename = 'output.json';
const baseUrl = 'http://pylint-messages.wikidot.com';
const allCodesUrl = baseUrl + '/all-codes';
const codeTypes = require('../api/models/pylintModel').types;

function parseAllCodesPage(data) {
    let $ = cheerio.load(data);
    $('p a[href*="messages:"]').each(function () {
        let html = $(this);
        let codeParts = html.text().match(/([A-Za-z]+)([0-9]+)/);
        let item = {
            code: codeParts[0],
            messageType: codeTypes[codeParts[1].toLowerCase()],
            pageUrl: html.attr('href'),
            messageContent: '',
            hasPage: !html.hasClass('newpage')
        };
        allMessages.push(item);
    });
}

function parseCodePage(data) {
    let $ = cheerio.load(data);
    let html = $('h2#toc0').next('div.code').find('code');
    return html.text();
}

function handleMessage(data) {
    const messageData = parseCodePage(data);
    return messageData;
}

function writeToFile() {
    fs.writeFile(outputFilename, JSON.stringify(allMessages, null, 4), function (err) {});
}

async function main() {
    const codesResponse = await request(allCodesUrl, function (error, response, body) {
        parseAllCodesPage(body);
        allMessages.forEach(async function (message) {
            if (message.hasPage) {
                let codePageUrl = baseUrl + message.pageUrl;
                const codePageResponse = await request(codePageUrl, function (error, response, body) {
                    message.messageContent = handleMessage(body);
                    writeToFile();
                });
            } else {
                writeToFile();
            }
        });
    });
}

main().catch(e => console.error(e));