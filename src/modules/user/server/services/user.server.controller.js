'use strict';
let userModel = require("../models/user.server.model");
let Token = require("../../../common/server/services/auth/Token");
let unit = require("../../../common/server/services/unit/unit");
let API_CODE = require("../../../common/server/services/base/api_code");
exports.login = async (filters) => {
    let userInfo = await userModel.selectOne(filters);

    if (!userInfo) {
        unit.throwError(API_CODE.DATA_INVALID, `登录失败，手机号或密码有误`);
    }
    const {_id, name, mobile} = userInfo;

    const token = new Token({
        body: {user_id: _id, name, mobile}
    });
    await token.clear();//使已存在的token失效；
    await token.init();//初始化一个新的token值；
    return userInfo;
}
exports.add = async (data) => {
    let {mobile} = data;
    let userInfo = await userModel.selectOne({mobile});
    if (userInfo) unit.throwError(this.API_CODE.DATA_INVALID, `手机号已被注册，请检查手机号`);
    let result = await userModel.addOne(data);
    return {user_id: result._id};
}

exports.signOut = async (data) => {
    let {user_id} = data;
    const token = new Token({body: {user_id}});
    return token.clear();
}
