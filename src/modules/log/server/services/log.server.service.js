'use strict'
let LogSccessModel = require("../models/log_success.server.model");
let LogFailModel = require("../models/log_fail.server.model");
exports.logSuccess = async (content) => {
  return LogSccessModel.add(content)
    .then((data) => {
      Promise.resolve(data);
    })
    .catch((error) => {
      Promise.resolve(error);
    });
};
exports.logFail = async (content) => {
  return LogFailModel.add(content)
    .then((data) => {
      Promise.resolve(data);
    })
    .catch((error) => {
      return;
    });
};