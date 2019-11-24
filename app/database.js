const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('app/scraper/data.json');
const db = low(adapter);

db.defaults({
    messages: []
}).write();

const types = [
    'conventions',
    'error',
    'fatal',
    'information',
    'refactor',
    'warning'
].reduce((acc, t) => {
    acc[t[0]] = t;
    return acc;
}, {});

module.exports = { db, types };