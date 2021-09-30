/**
 * 缓存基类
 * #remark 实现方式不固定（例如存内存、存文件、存redis），但保证暴露出Promise版的set get方法
 * @author XT
 * @date 2020年11月10日
 * @return Promise
 */
class BaseCache {
  constructor() {
    this.client = {};
  }

  //读取缓存
  getStorage(key) {
    return Promise.resolve();
  }

  //写入缓存
  setStorage(key, value, ttl = 60) {
    return Promise.resolve();
  }

  //清除所有缓存
  clearAll() {
    return Promise.resolve();
  }

  //获取所有key名
  keys(keyword = '') {
    return Promise.resolve([]);
  }

  //根据key名列表删除数据
  deleteByKeys() {
    return Promise.resolve();
  }

  //模糊删除数据
  fuzzyDeleteByStartKey() {
    return Promise.resolve();
  }

  //缓存当前方法数据
  cacheify({method, args = {}, key = "", ttl = 3600}) {
    if (typeof method !== "function") return Promise.resolve();
    if (!key) return Promise.resolve();
    return this.getStorage(key)
      .then((resultFromCache) => {
        if (!resultFromCache) return method(args);
        return Promise.resolve({dataFromCache: true, data: resultFromCache});
      })
      .then((result = {}) => {
        console.log({dataFromCache: result && result.dataFromCache});
        if (result && result.dataFromCache) return result.data;//拿到缓存数据直接返回
        if (!result || result.length === 0) return Promise.resolve(result);//数据为空，则无需缓存
        if (ttl === -1) return this.setStorage(key, result,);
        return this.setStorage(key, result, ttl);
      })
  }

  //清除缓存
  recache({result, keyName}) {
    return this.fuzzyDeleteByStartKey(keyName).then(() => {
      return Promise.resolve(result);
    })
  }
}


module.exports = BaseCache;
