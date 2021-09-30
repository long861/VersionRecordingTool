// class ResultStructure {
//   constructor({ success = true, data = null, message = "", code = 200, request_id = '' }) {
//     this.code = code || data.code;
//     this.message = message || data.message;
//     this.data = data ? data.data : null;
//     this.success = success;
//     this.request_id = request_id;
//   }
// }

// module.exports = ResultStructure;

class ResultStructure {
  constructor({success = true, data = null, message = "", code = 200, request_id = ''}) {
    this.code = code;
    this.message = message || "请求成功";
    this.data = data;
    this.success = success;
    this.request_id = request_id;
  }
}

module.exports = ResultStructure;

