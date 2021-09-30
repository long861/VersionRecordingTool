'use strict';
let _ = require('lodash');
let testServers = require("../services/test.server.controller");
exports.getTestInfo = function (req, res) {
    let result = testServers.getTestInfo();
    return res.json({ code: 200, message: "success", data: result });
}