'use strict';
const mongoose = require('mongoose');
const codeLetterToType = {
    'c': 'conventions',
    'e': 'error',
    'f': 'fatal',
    'i': 'information', // TODO: is it though?
    'r': 'refactor',
    'rp': 'recommendation', // TODO: is it though?
    'w': 'warning',
};

let PylintMessageSchema = new mongoose.Schema({
    code: String,
    messageType: {
        type: String,
        enum: Object.values(codeLetterToType)
    },
    pageUrl: String,
    messageContent: String
});

module.exports = {
    model: mongoose.model('Message', PylintMessageSchema),
    types: codeLetterToType
};