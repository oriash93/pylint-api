'use strict';

const mongoose = require('mongoose');
const PylintMessage = mongoose.model('Message');
const codeTypes = require('../models/pylintModel').types;

exports.list_all_messages = function (req, res) {
    PylintMessage.find({}, function (err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });
};

exports.get_message_by_code = function (req, res) {
    PylintMessage.find({
        code: req.params.messageCode
    },
    function (err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });
};

exports.get_messages_by_type = function (req, res) {
    let key = req.params.messageType.toLowerCase();
    let type = key;
    if (codeTypes[key])
        type = codeTypes[key];

    PylintMessage.find({
        messageType: type
    },
    function (err, messages) {
        if (err)
            res.send(err);
        res.json(messages);
    });
};