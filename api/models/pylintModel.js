'use strict';
const mongoose = require('mongoose');
const codeLetterToType = {
    'c': 'conventions', // TODO: is it though?
    'e': 'error',
    'f': 'format',
    'i': 'information',
    'r': 'refactoring',
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
    messageContent: String,
    hasPage: Boolean
});

module.exports = {
    model: mongoose.model('Message', PylintMessageSchema),
    types: codeLetterToType
};