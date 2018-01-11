const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('scraper/data.json');
const db = low(adapter);

db.defaults({
    messages: []
}).write();

const codeLetterToType = {
    'c': 'conventions',
    'e': 'error',
    'f': 'fatal',
    'i': 'information',
    'r': 'refactor',
    'w': 'warning',
};

module.exports = {
    db: db,
    types: codeLetterToType
};