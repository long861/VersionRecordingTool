'use strict'
const crypto = require("crypto");
const encode = (str) => {
  return crypto.createHash('md5').update(str).digest("hex")
}

/**
 * 密码类
 * @author XT
 * @date 2020年12月02日
 */
class Password {
  constructor(password = '') {
    this.password = password;
  }

  //获取默认密码
  get defaultPassword() {
    return this._encode("123456");
  }

  //加密规则：2遍MD5加密后，执行字符串倒序
  _encode(str) {
    str = encode(str);
    str = encode(str);
    str = str.split('').reverse().join('');
    return str;
  }

  //用户输入的密码是默认密码（可用于提醒用户重置密码）
  get isDefaultPassword() {
    return this.password === this.defaultPassword;
  }

  //是否为合法的密码，必须为32位，因为使用的是MD5 32位加密
  get isValidPassword() {
    return this.password && this.password.length === 32;
  }

}

module.exports = Password;
