const API_CODE = require("./api_code");

/**
 * 业务错误处理函数
 */
class ErrorHandler {
  constructor(error) {
    this.code = API_CODE.SYS_ERROR;
    this.message = '';
    this.data = null;
    if (error.hasOwnProperty("code")) this.code = error.code;
    if (error.hasOwnProperty("message")) this.message = error.message;
    if (error.hasOwnProperty('data')) this.data = error.data;
    try {
      const _error = JSON.parse(error.message);
      if (_error.hasOwnProperty("code")) this.code = _error.code;
      if (_error.hasOwnProperty("message")) this.message = _error.message;
      if (_error.hasOwnProperty('data')) this.data = _error.data;
    } catch (e) {
    }
  }
}

module.exports = ErrorHandler;
