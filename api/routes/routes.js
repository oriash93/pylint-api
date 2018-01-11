'use strict';

module.exports = function (app) {
    const messagesList = require('../controller/controller');

    app.route('/all')
        .get(messagesList.list_all_messages);

    app.route('/code/:messageCode')
        .get(messagesList.get_message_by_code);

    app.route('/type/:messageType')
        .get(messagesList.get_messages_by_type);
};