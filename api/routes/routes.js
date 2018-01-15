'use strict';

const {Router} = require('express');
const {expressHelpers: {createApiEndpoint: _}} = require('@welldone-software/node-toolbelt');
const api = require('../controller/controller');

const router = new Router();

router.get(
    '/all',
    _(() => api.listAllMessages())
);

router.get(
    '/code/:messageCode',
    _(({params: {messageCode}}) => api.getMessageByCode(messageCode.toLowerCase()))
);

router.get(
    '/type/:messageType',
    _(({params: {messageType}}) => api.getMessagesByType(messageType.toLowerCase()))
);

module.exports = router;
