const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('scraper/data.json');
const db = low(adapter);

db.defaults({
    messages: []
}).write();

exports.db = db;