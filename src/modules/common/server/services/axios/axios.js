// 引入axios库
const axios = require('axios');

module.exports = {
  /** axios GET请求封装 */
  get: async (url, params) => {
    return axios.get(url, {params: params});
  },
  /** axios POST请求封装 */
  post: async (url, params) => {
    return axios.post(url, params);
  },
  /** axios PUT请求封装 */
  put: async (url, params) => {
    return axios.put(url, params);
  },
  /** axios DELETE请求封装 */
  delete: async (url, params) => {
    return axios.delete(url, params);
  }

};
