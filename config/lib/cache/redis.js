const Redis = require('ioredis');
const config = require('../../config');
const chalk = require("chalk");
const BaseCache = require("./base");

class RedisDB extends BaseCache {
  constructor(args) {
    super(args);
    this.client = new Redis(config.redis);
    this.client.on('ready', this._success);
    this.client.on('error', this._error);
  }

  _success(res) {
    console.log(chalk.green('Redis: Success'));
  }

  _error(err) {
    console.log(chalk.red('Redis: Fail'));
    console.log(err);
  }

  // @param ttl 缓存秒数
  setStorage(key, _value, ttl = 60) {
    let value = _value;
    // set's key to value 100 and expires it after 10 seconds
    if (typeof value !== "string") value = JSON.stringify(value);
    if (ttl === -1) this.client.set(key, value)
    else this.client.set(key, value, "EX", ttl);
    return Promise.resolve(_value);
  }

  getStorage(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, function (err, result) {
        try {
          result = JSON.parse(result);
        } catch (e) {
        }
        return resolve(result);
      });
    })
  }

  clearAll() {
    //清除redis缓存（临时处理）
    return this.client.flushdb();
  }

  keys(keyword = '') {
    return this.client.keys(keyword);
  }

  deleteKey(key) {
    return this.client.del(key);
  }

  deleteByKeys(keys) {
    if (!keys || keys.length === 0) return Promise.resolve();
    const del = (key) => {
      return this.client.del(key)
        .then((result) => Promise.resolve(result))
        .catch((error) => Promise.resolve(null))
    };
    return Promise.all(keys.map(key => del(key)));
  }

  //通过开始字母模糊删除，例如传入FOODS，则会删除FOODS:tudou FOODS:xihongshi 等菜品
  fuzzyDeleteByStartKey(startKey) {
    return this.keys(`${startKey}:*`)
      .then((keys) => {
        return this.deleteByKeys(keys);
      })
      .catch((error) => {
        console.log("fuzzyDeleteByStartKey error");
        console.log(error.message);
        return Promise.resolve();
      })
  }

  //获取某个key的剩余过期秒数
  getTTLByKey(key){
    return this.client.ttl(key);
  }

  // hash set
  hashSet(key, subKey, value) {
    if (typeof value !== 'string') value = JSON.stringify(value);
    return this.client.hset(key, subKey, value);
  }

  // hash hgetall
  hashGetAll(key) {
    return this.client.hgetall(key);
  }

  // hash del
  hashDel(key, subKey) {
    return this.client.hdel(key, subKey).then(result => {
      return result;
    })
  }
}

module.exports = new RedisDB();
