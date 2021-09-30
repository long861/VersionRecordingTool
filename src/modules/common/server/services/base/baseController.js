const API_CODE = require("./api_code");
const Result = require("./resultStructure");
const APILog = require("./apiLog");
const ErrorHandler = require("./ErrorHandler");

const mongoose = require("mongoose");

class BaseController {
  constructor() {
    this.API_CODE = API_CODE;
    this.log = true;//默认开启日志记录
    this.api_channel = null;
    this.record_result_to_log = false;//是否记录出参到日志中
  }

  /**
   * 获取请求入参（聚合query和body的数据）
   * @param req
   */
  args(req) {
    if (!req.hasOwnProperty('request_time')) req.request_time = new Date().getTime();
    //remark:此处可统一记录接口入参
    let args = Object.assign(req.query, req.body);
    let result = JSON.parse(JSON.stringify(args));
    if (req.headers.setting_type) {
      result.setting_type = req.headers.setting_type;
    }

    return result;
  }

  throwError(code = API_CODE.SYS_ERROR, message = "网络繁忙，请稍后重试", data = null) {
    throw new Error(JSON.stringify({ code, message, data }))
  }


  /**
   * 断言：断定数值在枚举中，为合法枚举
   * @param value 当前值，例如1
   * @param enums 枚举列表，例如[1,2,3]
   * @param message 不满足时的提示信息
   */
  inEnums(value, enums = {}, message) {
    const values = Object.values(enums);
    if (!values.includes(value))
      return this.throwError(API_CODE.ARGS_MISSING, message || '入参信息有误');
  }

  /**
   * 断言：断言数据存在（不为null&不为undefined&不为空）
   * @param attribute 当前值
   * @param message 数据不存在时的提示信息
   */
  isExist(attribute, message = '入参信息有误') {
    if (!attribute || typeof attribute === "undefined" || attribute === '')
      return this.throwError(API_CODE.ARGS_MISSING, message);
  }
  /**
   * 断言：断言字符串为合法手机号
   * @param mobile 手机号字符串
   */
  isMobile(mobile) {
    this.isExist(mobile, '手机号不可为空');//断言存在
    if (!/^[1][3456789][0-9]{9}$/.test(mobile))
      return this.throwError(API_CODE.ARGS_MISSING, '手机号码格式有误，请确认后重新输入');
  }
  /**
   * 断言：断言为布尔类型的 真
   * @param attribute
   * @param message
   */
  isTruthy(attribute, message = "未知异常") {
    if (!attribute || typeof attribute === "undefined" || attribute === '' || attribute === false)
      return this.throwError(API_CODE.DATA_INVALID, message);
  }

  /**
 * 断言：断言数组存在且长度大于0
 * @param array 数组，例如[1,2,3]
 * @param message 不存在时的提示信息
 */
  isValuableArray(array = [], message = "未查询到对应信息") {
    if (!array || array.length === 0)
      return this.throwError(API_CODE.DATA_NOT_FOUND, message);
  }

  /**
   * 断言：断言参数是数字类型
   * @param obj
   * @param message
   * @returns {boolean}
   */
  isNumber(obj, message = '参数类型错误') {
    if (typeof obj !== 'number' || isNaN(obj)) {
      return this.throwError(API_CODE.ARGS_TYPE_ERROR, message);
    }
  }

  /**
   * 断言：断言参数是正整数类型
   * @param val
   * @param message
   * @returns {boolean}
   */
  isPositiveInteger(val, message = '参数类型错误') {
    if (/^[0-9]*[1-9][0-9]*$/.test(val)) {
      return this.throwError(API_CODE.ARGS_TYPE_ERROR, message);
    }
  }
  /**
    * 断言：断言为布尔类型的 真
    * @param attribute
    * @param message
    */
  isTruthy(attribute, message = "未知异常") {
    if (!attribute || typeof attribute === "undefined" || attribute === '' || attribute === false)
      return this.throwError(API_CODE.DATA_INVALID, message);
  }

  /**
   * 成功返回
   * @param res
   * @param data
   * @param message
   * @param channel 渠道
   */
  success(res, data = {}, message = "", channel) {
    const result = new Result({
      data, message, request_id: mongoose.Types.ObjectId()
    });
    if (!this.log) return res.send(result);//不需要记录日志的情况下，则提前返回
    this.record_result_to_log = true;
    let log = new APILog(analysisResReturnLogStructure(res, result, channel, this.record_result_to_log));
    log.logSuccess();//remark:此处可统一记录日志/请求结果/请求耗时
    return res.send(result);
  }

  /**
   * 失败返回
   * @param res
   * @param error
   * @param channel 渠道
   * @returns {boolean|void}
   *
   */
  fail(res, error = {}, channel) {
    this.record_result_to_log = true;
    const _error = new ErrorHandler(error);
    let { code, data, message } = _error;
    const result = new Result({
      code, data, message, success: false, request_id: mongoose.Types.ObjectId()
    });
    if (!this.log) return res.send(result);//不需要记录日志的情况下，则提前返回
    let log = new APILog(analysisResReturnLogStructure(res, result, channel, this.record_result_to_log));
    res.send(result);
    return log.logFail();
  }
  logSuccessCreate(res, data = {}, message = "", channel) {
    const result = new Result({
      data, message, request_id: mongoose.Types.ObjectId()
    });
    this.record_result_to_log = true;
    let log = new APILog(getLogInfoByThirdPartySuccessRes(res, result, channel, this.record_result_to_log));
    log.logSuccess();//remark:此处可统一记录日志/请求结果/请求耗时
  }


  apiCatchLogCreate(error={}, channel,request_time) {
    this.record_result_to_log = true;
    let log = new APILog(thirdCatch(error, channel, request_time, this.record_result_to_log));
    log.logFail();//remark:此处可统一记录日志/请求结果/请求耗时
  }
}

function getLogInfoByThirdPartySuccessRes(response, result, channel, record_result_to_log) {
  try {
    let { method, headers } = response.request;
    let { request_time, body={}, query={} } = response.thirdPartyInfo;
    let args = Object.assign(query, body);
    let clientIP = getClientIp(response.request)|| "127.0.0.1";
    let url = response.config.url;
    let api = response.request._redirectable._options.pathname;
    return { method, api, url, args, ip: clientIP, result, headers, data: result.data, request_time, channel, record_result_to_log };
  } catch (e) {
    throw new Error(e);
  }
}

//分析response并返回日志记录需要用到的字段
function analysisResReturnLogStructure(res = {}, result = {}, channel, record_result_to_log = false) {
  try {
    let { method, originalUrl, baseUrl, body={}, query={}, request_time, route = {}, headers = {} } = res.req;
    let args = Object.assign(query, body);
    const clientIP = getClientIp(res.req) ;
    let api = baseUrl + (route.path === "/" ? "" : route.path);//分路由需要拼接前缀，根路由需要去除/
    if (api === "*") api = originalUrl.split("?")[0];//未进入任何路由，被前置拦截
    return {
      method,
      url: originalUrl,
      args,
      request_time,
      ip: clientIP,
      result,
      api,
      headers,
      channel,
      data: result,
      record_result_to_log
    };
  } catch (e) {
    return { result };
  }
}

function getClientIp(req) {
  try {
    let ip = "";
    if(req.headers) ip = req.headers['x-forwarded-for'];
    if(req.connection && req.connection.remoteAddress)  ip = req.connection.remoteAddress;
    if( req.ip) ip =  req.ip;
    return ip;
  } catch (e) {
    return ""
  }
}



function thirdCatch(error,channel,request_time,record_result_to_log=false){
  let response_time = new Date().getTime();
  let {url,headers}=error.config;
  let {method,path,data={},query={}} = error.request;
  let args = Object.assign(query,data) || {};
  error.code = error.response.status;
  let result = thirdCatchErrorMessage(error);
  return {
    method,
    api:path,
    headers,
    url,
    result,
    args,
    code: result.code,
    message: result.message,
    ip: "127.0.0.1",
    request_time,
    response_time,
    channel,
    record_result_to_log
  };
}
function thirdCatchErrorMessage(error){
  let _error = new ErrorHandler(error);
  let { code, message, data } = _error;
  if (!code) code = API_CODE.SYS_ERROR;
  if (!message) message = "系统错误";
  return { code, message, data };
}
module.exports = BaseController;
