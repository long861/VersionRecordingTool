const LogService = require("../../../../log/server/services/log.server.service");

class APILog {
  constructor({
    method = '',
    url = "",
    args = null,
    result = null,
    request_time = 0,
    ip = '',
    api = '',
    headers = {},
    channel = "",
    record_result_to_log,
  }) {
    let response_time = new Date().getTime();
    let { success = true, data = {}, message = "", code = 200, request_id = '' } = result;
    data = record_result_to_log ? result : null;
    this.content = {
      api,
      ip,
      method,
      url,
      args,
      headers,
      code, message, success, request_id, data,
      request_time,//请求时间戳
      response_time,//相应时间戳
      channel
    }
  }


  async logSuccess() {
    try {
      return LogService.logSuccess(this.content);
    } catch (e) {
    }
  }
  async logFail() {
    try {
      return LogService.logFail(this.content);
    } catch (e) {
    }
  }
}

module.exports = APILog;
