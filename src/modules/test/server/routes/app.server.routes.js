'use strict';

module.exports = function (application) {

  let test = require('../controllers/test.server.controller');

  application.route('/test').get(test.getTestInfo);
};
