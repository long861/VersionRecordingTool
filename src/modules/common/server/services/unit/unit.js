
const BaseController = require("../base/baseController");
const API_CODE = require('../base/api_code');
let moment = require('moment');
const uuid = require('uuid-v4');
module.exports = {
    /** 判断手机号是否合法 */
    isPhone,
    /** 时间格式转化 */
    dateFormat,
    /** 抛出异常 */
    throwError,
    objectIncludeKeys,
    isDate,
    getUUID
}


/**
 *
 * @param {*} phone 手机号
 * 判断手机号是否合法
 */

function isPhone(phone) {
    if (!phone) BaseController.throwError(API_CODE.ARGS_UNKNOWN_ERROR, "手机号不存在");
    let pattern = /^1[1234567890]\d{9}$/;
    if (!pattern.test(phone)) BaseController.throwError(API_CODE.ARGS_UNKNOWN_ERROR, "手机号不合法");
}

//********* 格式化时间 */
/**
 *
 * @param date 时间
 * @param type 格式，例如：'YYYY-DD-MM'
 * @returns
 */
function dateFormat(date, type) {
    date = (type) ? moment(new Date(date)).format(type) : new Date(date);
    return date;
}

function throwError(code = API_CODE.SYS_ERROR, message = "网络繁忙，请稍后重试", data = null) {
    throw new Error(JSON.stringify({ code, message, data }));
}


//********* 判断object中包含多个key值 */
/**
 *
 * @param obj object对象
 * @param keys 键值对key的数组 例如：["name","age","sex"]
 * @returns
 */
function objectIncludeKeys(obj, keys) {
    let ishas = true;
    for (let i; i < keys.length; i++) {
        if (!obj[keys[i]]) return isHas = false;
    }
    return ishas;
}



/**
 * 断言：断言参数是日期类型
 * @param str
 * @param message
 * @returns {boolean}
 */
function isDate(str, message = '参数类型错误') {
    if (typeof str === "string") {
        if ((new Date(str)).toString() === "Invalid Date") return this.throwError(API_CODE.ARGS_TYPE_ERROR, message);
        return new Date(str);
    }
}


function getUUID(){
    return uuid().toString().replace(/-/g, '');
}
