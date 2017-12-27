'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const codeLetterToType = {
    'c': 'conventions?',
    'e': 'error',
    'f': 'format',
    'i': 'information',
    'r': 'refactor',
    'rp': 'recommendation',
    'w': 'warning',
};

var PylintMessageSchema = new Schema({
    code: {
        type: String,
        // required: 'Enter code'
    },
    messageType: {
        type: String,
        enum: Object.values(codeLetterToType), //TODO: remove default?
        default: ['Default']
    },
    pageUrl: {
        type: String,
        // required: 'Enter url'
    },
    messageContent: String,
    hasPage: Boolean
});

module.exports = {
    model: mongoose.model('Message', PylintMessageSchema),
    types: codeLetterToType
};