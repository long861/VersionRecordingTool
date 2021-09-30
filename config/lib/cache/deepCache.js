const Redis = require("./redis");
const MemCache = require("./nodecache");
const MemTTL = 10 * 60;//内存缓存，最多只存10分钟

/**
 * 深度缓存类，可实现二级缓存
 * @author XT
 * @date 2021-08-29
 */
class DeepCache {

  static cacheify({method, args = {}, key, ttl}) {
    if (typeof method !== "function") return Promise.resolve();
    if (!key) return Promise.resolve();
    return MemCache.getStorage(key)
      .then((resultFromMem) => {
        if (!resultFromMem) return Redis.getStorage(key);
        return Promise.resolve({dataFromCache: true, data: resultFromMem});
      })
      .then((resultFromRedis) => {
        if (resultFromRedis && resultFromRedis.dataFromCache) return Promise.resolve(resultFromRedis);//拿到缓存数据直接返回
        if (resultFromRedis) {
          MemCache.setStorage(key, resultFromRedis, MemTTL);
          return Promise.resolve({dataFromCache: true, data: resultFromRedis});
        }
        return method(args);
      })
      .then((result = {}) => {
        if (result && result.dataFromCache) return Promise.resolve(result.data);//拿到缓存数据直接返回
        if (!result || result.length === 0) return Promise.resolve(result);//数据为空，则无需缓存
        //内存缓存，最多只存10分钟，因为二级缓存会有无法清除的问题
        if (ttl === -1) Promise.all([MemCache.setStorage(key, result, MemTTL), Redis.setStorage(key, result)]);
        else Promise.all([MemCache.setStorage(key, result, MemTTL), Redis.setStorage(key, result, ttl)]);
        return Promise.resolve(result);
      });
  }

  static deleteKey(key) {
    return Promise.all([Redis.deleteKey(key), MemCache.clearAll()]);
  }


  static recache({result, keyName}) {
    return Promise.all([Redis.deleteKey(keyName), MemCache.clearAll()]).then(() => {
      return Promise.resolve(result);
    })
  }

  static fuzzyDeleteByStartKey(startKey) {
    return Promise.all([Redis.fuzzyDeleteByStartKey(startKey), MemCache.clearAll()]);
  }
}


module.exports = DeepCache;
