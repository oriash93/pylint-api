'use strict';

const codeTypes = require('../../database/db').types;
const db = require('../../database/db').db;

exports.list_all_messages = function (req, res) {
    let messages = db.get('messages').value();
    res.send(messages);
};

exports.get_message_by_code = function (req, res) {
    let messages = db.get('messages')
        .filter({
            code: req.params.messageCode.toLowerCase()
        })
        .value();
    res.send(messages);
};

exports.get_messages_by_type = function (req, res) {
    let key = req.params.messageType.toLowerCase();
    let type = key;
    if (codeTypes[key])
        type = codeTypes[key];
    let messages = db.get('messages')
        .filter({
            messageType: type
        }).value();
    res.send(messages);
};