const NodeCache = require("node-cache");
const cache = new NodeCache();
const BaseCache = require("./base");

/**
 * 内存缓存
 * @return Promise
 * @author XT
 * @date 2020-08-05
 */
class MemoryCache extends BaseCache {

  constructor(args) {
    super(args);
    this.client = cache;
  }

  /**
   * 写入缓存
   * @param ttl 缓存秒数，0为永久
   */
  setStorage(key, value, ttl = 60) {
    this.client.set(key, value, ttl);
    return Promise.resolve(value);
  }

  /**
   * 读取缓存
   */
  getStorage(key) {
    return Promise.resolve(this.client.get(key))
  }

  //清除所有缓存(临时写法，后续需针对删除)
  clearAll() {
    this.client.del(this.client.keys());
    return Promise.resolve();
  }

}


module.exports = new MemoryCache();
