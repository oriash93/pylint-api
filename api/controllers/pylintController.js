'use strict';

var mongoose = require('mongoose'),
    PylintMessage = mongoose.model('Message');

var codeTypes = require('../models/pylintModel').types;

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
    var key = req.params.messageType.toLowerCase();
    var type = key;
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