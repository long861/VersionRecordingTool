'use strict';

const controller = require("../controllers/user/user.server.controller");
module.exports = function (app) {

  let controller = require('../controllers/user/user.server.controller');


  app.route('/api/user/login')
      //用户登录
      .post((req, res, next) => controller.login(req, res, next));
  app.route('/api/user')
      //用户登录
      .post((req, res, next) => controller.add(req, res, next));

  app.route('/api/user/:user_id')
      //用户退出
      .delete((req, res, next) => controller.signOut(req, res, next));
};
