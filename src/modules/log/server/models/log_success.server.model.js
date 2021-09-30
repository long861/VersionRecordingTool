'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const _String = {
  type: String,
  default: null
}
const LogSuccessSchema = new Schema({
  method: _String,
  api: _String,
  url: _String,
  args: {
    type: {},
    default: null
  },//失败存入参//success可不存
  //请求headers
  headers: {
    type: {},
    default: null
  },
  code: _String,
  message: _String,
  success: {
    type: Boolean,
    default: true
  },
  data: {
    type: {},
    default: null
  },
  request_time: _String,
  response_time: _String,
  ip: _String,
  //请求耗时
  duration: {
    type: Number,
    default: 0
  },
  //接口请求渠道
  channel: _String,
  //成功日志仅存储7天
  create_time: {
    type: Date,
    default: Date.now,
    expires: 3600 * 24 * 7    //string,以秒为单位
  },
  update_time: {
    type: Date,
    default: Date.now
  }
});


LogSuccessSchema.statics.add = function (data) {
  data.duration = data.response_time - data.request_time;
  let logInfo = new LogSuccess(data);
  return this.create(logInfo)

}
let LogSuccess = mongoose.model("LogSuccess", LogSuccessSchema, "log_success");
module.exports = LogSuccess;
