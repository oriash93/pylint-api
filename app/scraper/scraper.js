const cheerio = require('cheerio');
const request = require('request');
const { db, types } = require('../database');

const baseUrl = 'http://pylint-messages.wikidot.com';
const allCodesUrl = `${baseUrl}/all-codes`;
const messageUrl = `${baseUrl}/messages:`;

const parseLineToMessage = (line) => {
    const code = line.slice(0, 5).toLowerCase();
    return {
        code,
        messageType: types[code[0]],
        pageUrl: `${messageUrl}${code}`,
        messageContent: line.slice(7)
    };
};

const parseAllCodesPage = data => {
    const $ = cheerio.load(data);
    const paragraph = $('div#page-content p:nth-child(2)');
    paragraph.text().split('\n')
        .map(parseLineToMessage)
        .forEach((message) => db.get('messages').push(message).write());
};

db.get('messages').remove().write();
request(allCodesUrl, (error, response, body) => {
    if (error) {
        console.log(error);
        return;
    }
    parseAllCodesPage(body);
});
