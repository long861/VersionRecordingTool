'use strict';
let _ = require('lodash');
let userServers = require("../../services/user.server.controller");
let BaseController = require("../../../../common/server/services/base/baseController");
let Password = require("../../services/Password");


class userController extends BaseController {
    async login(req,res){
        try {
            const {mobile, password} = this.args(req);
            this.isMobile(mobile);
            this.isExist(password, "密码不可为空");
            //密码规则校验，验证是否为合规的密码，不验证是否为正确的密码
            const _password = new Password(password);
            if (!_password.isValidPassword)
                this.throwError(this.API_CODE.ARGS_TYPE_ERROR, "登录失败，手机号或密码有误");
            const result = await userServers.login({mobile, password});
            return this.success(res, result, "登陆成功");

        }catch(e){
            console.log("e",e)
            return this.fail(res, e);
        }
    }

    async add(req,res){
        try {
            const {mobile, password,username} = this.args(req);
            this.isMobile(mobile);
            this.isExist(password, "密码不可为空");
            this.isExist(username, "昵称不可为空");
            //密码规则校验，验证是否为合规的密码，不验证是否为正确的密码
            const _password = new Password(password);
            if (!_password.isValidPassword)
                this.throwError(this.API_CODE.ARGS_TYPE_ERROR, "注册失败，密码格式有误");
            const result = await userServers.add({mobile, password,username});

            return this.success(res, result, "用户创建成功");
        }catch(e){
            return this.fail(res, e);
        }
    }
    async signOut(req,res){
        try {
            const {user_id} = this.args(req);
            this.isExist(user_id, "密码不可为空");
            const result = await userServers.signOut({user_id});

            return this.success(res, result, "用户创建成功");
        }catch(e){
            return this.fail(res, e);
        }
    }

}

module.exports = new userController();
