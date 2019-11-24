'use strict';

const { Router } = require('express');
const api = require('./api');

const router = new Router();

const createApiEndpoint = fn => (req, res, next) => {
    Promise.resolve()
        .then(() => fn(req))
        .then(result => res.send(result))
        .catch(error => next(error));
};

router.get(
    '/all',
    createApiEndpoint(() => api.listAllMessages())
);

router.get(
    '/code/:messageCode',
    createApiEndpoint(({ params: { messageCode } }) => api.getMessageByCode(messageCode.toLowerCase()))
);

router.get(
    '/type/:messageType',
    createApiEndpoint(({ params: { messageType } }) => api.getMessagesByType(messageType.toLowerCase()))
);

module.exports = router;
