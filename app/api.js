'use strict';

const {types, db} = require('./database');

exports.listAllMessages = () => db.get('messages').value();
exports.getMessageByCode = code => db.get('messages').filter({code}).value();
exports.getMessagesByType = key => {
    const messageType = types[key] ? types[key] : key; 
    return db.get('messages').filter({messageType}).value();
};