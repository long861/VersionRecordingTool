const cache = require("../../../../../../config/lib/cache");
const unit = require("../unit/unit");
const API_CODE = require("../base/api_code");

/**
 * Token类
 * @remark 登录成功后颁发token，后续请求时携带
 * @author XT
 * @date 2020年12月02日
 */
class Token {

  /**
   * 构造函数
   * @param body token内容体
   * @param ttl 过期时间
   * @param token token值，不存在则uuid创建
   */
  constructor({ body = {}, ttl = 6 * 3600, token = '' }) {
    this.body = body;
    this.token = token || unit.getUUID();
    this.ttl = ttl;
    this.user_id = body.user_id;
  }

  //获取Token值
  get value () {
    return this.token;
  }

  //该用户允许访问的API列表
  get allowed_apis () {
    return this.body && this.body.hasOwnProperty('apis') ? this.body.apis : [];
  }

  //该用户允许访问的门店列表
  get allowed_stores () {
    return this.body && this.body.hasOwnProperty('stores') ? this.body.stores : [];
  }

  //该用户所属的默认门店，默认开放，不需要配置
  get default_store () {
    return this.body && this.body.hasOwnProperty('store_id') ? this.body.store_id : "";
  }

  //角色类型，对应枚举中的1 普通 ，2超级管理员，3开发人员
  get role_type () {
    return this.body && this.body.hasOwnProperty('role_type') ? this.body.role_type : "";
  }

  //缓存key
  get _cacheKey () {
    return `AUTH:TOKEN:${this.token}`
  }

  //清除已登录的token信息（挤掉另一端用户）
  clear () {
    //若已存在token，则删除token（挤掉已登录的设备）;
    return cache.getStorage(`AUTH:USER:${this.user_id}`).then((userCache) => {
      if (userCache) return cache.deleteByKeys([`AUTH:TOKEN:${userCache}`]);
      return Promise.resolve();
    });
  }

  //初始化写入新的token
  init () {
    return Promise.all([
      cache.setStorage(`AUTH:TOKEN:${this.token}`, this.body, this.ttl),
      cache.setStorage(`AUTH:USER:${this.user_id}`, this.token, this.ttl)
    ]);
  }

  /**
   * Token解密
   * @return Promise
   */
  decode () {
    return cache.getStorage(this._cacheKey).then((result = null) => {
      if (result && result.hasOwnProperty('user_id')) {
        this.body = result;
        return Promise.resolve(result);
      }
      return Promise.reject({ code: API_CODE.WITHOUT_TOKEN_OR_EXPIRED, message: "WITHOUT_TOKEN_OR_EXPIRED" })
    })
  }
}

module.exports = Token;
