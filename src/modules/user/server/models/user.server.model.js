'use strict';

/**
 * 模块依赖
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _String = {
  type: String,
  default: "",
  trim: true
}

/**
 * 用户表结构
 */
const UserSchema = new Schema({
  mobile: {
    type: String,
    trim: true,
    unique: 'Mobile already exist.',
    required: 'Required mobile.',
  },

  /**
   * 用户名
   * 废弃字段，手机号登录
   * @deprecated
   */
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: 'Mobile already exist.',
    required: 'Required mobile.',
  },
  // 密码
  password: {
    type: String,
    default: ''
  },
  //真实姓名
  name: _String,
  //性别，男1，女2
  sex: _String,
  remark: _String,
  create_time:{
    type:Date,
    default:Date.now()
  },
  update_time:{
    type:Date,
    default:Date.now()
  }
}, {versionKey: false});

//创建联合索引，加速登录查询
UserSchema.index({mobile: 1, password: 1});

UserSchema.statics.selectOne = function (filters,show) {
  if(!show) show = {_id:1,name:1,mobile:1,username:1,sex:1,remark:1}
  return this.findOne(filters,show);
}
UserSchema.statics.addOne = function (data) {
  if (data.mobile) data.username = data.mobile;
  return this.create(data);
}

module.exports = mongoose.model('User', UserSchema);

