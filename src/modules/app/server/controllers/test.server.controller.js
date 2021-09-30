'use strict';
let mongoose = require('mongoose');
let axios = require('axios');
let sha1 = require('sha1');
let unit = require('./unit');
let _ = require('underscore');
// let crypto = require('crypto');
// let urlencode = require('urlencode');
let host = "http://saas.banu.cn";
let app = {
    app_id: "201900010315",
    app_auth_token: "e10adc3949ba59abbe56e057f20f883e",
    tenancy_id: "banutest",
    version: "1.0",
    store_id: 0,
    AppKey: "banuAppKey"
}
//查询会员
exports.getSign = function (req, res) {
    console.log('====test getSignTest', req.body);
    let t = Math.round(Date.now() / 1000);
    let busData = { "mobil": "13027734660" };
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": app.store_id
    }
    let href = "/crmapi/customer_info/find";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: app.store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: "file", data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error getSign', error);
        return res.json({ code: 500, message: 'error', error });

    })
}

//创建会员
exports.addCustomer = function (req, res) {
    console.log('====test addCustomer', req.body);
    let busData = req.body;
    busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    // let busData = { "mobil": "13027734660" };
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_info/add";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error getSign', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}
//修改会员
exports.updateCustomer = function (req, res) {
    console.log('====test updateCustomer', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_info/update";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error updateCustomer', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}


//****************积分*************** */
//积分变现换算
exports.creditCash = function (req, res) {
    console.log('====test creditCash', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_credit_cash/find";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error creditCash', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}
//会员积分消费查询
exports.creditCheck = function (req, res) {
    console.log('====test creditCheck', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_credit_consume/check";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error creditCheck', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//会员积分增加
exports.creditAdd = function (req, res) {
    console.log('====test CreditAdd', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_credit/add";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error CreditAdd', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}


//撤销积分增加
exports.creditUpdate = function (req, res) {
    console.log('====test creditUpdate', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_credit/update";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error creditUpdate', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}


//积分增加查询

exports.creditAddCheck = function (req, res) {
    console.log('====test creditAddCheck', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_credit/check";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==newData.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error creditAddCheck', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//积分消费

exports.creditUse = function (req, res) {
    console.log('====test creditUse', req.body);
    let busData = req.body;
    let href = "/crmapi/customer_credit_consume/add";
    let store_id = null;
    // let store_id = '12';
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==creditUse.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error creditUse', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

// 撤销积分消费
exports.creditUseBack = function (req, res) {
    console.log('====test creditUseBack', req.body);
    let busData = req.body;
    let href = "/crmapi/customer_credit_consume/update";
    let store_id = null;
    // let store_id = '12';
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==creditUseBack.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error creditUseBack', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}



//基础资料
//基础信息查询

exports.baseInfoFind = function (req, res) {
    console.log('====test baseInfoFind', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/base_info/find";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==baseInfoFind.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error baseInfoFind', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//优惠卷

//优惠卷查询
exports.tzxCouponsFind = function (req, res) {
    console.log('====test tzxCouponsFind', req.body);
    let busData = req.body;
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    busData.state = "2"
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_coupons/find";

    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsFind.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsFind', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//查询优惠卷状态
exports.tzxCouponsFindByDate = function (req, res) {
    console.log('====test tzxCouponsFindByDate', req.body);
    // let busData = req.body;
    let busData ={
        report_date:"2020-07-16",
        state:"1"
    }
    console.log('====busData',busData)
    // busData.add_chanel = "PT15";
    let store_id;
    if (!busData.store_id) {
        store_id = 0;
    } else {
        store_id = busData.store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/customer_coupons/findbydate";
    // busData.mobil="13027734660"
    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsFindByDate.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsFindByDate', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//商城活动卷查询
exports.tzxCouponsFindActive = function (req, res) {
    console.log('====test tzxCouponsFindActive', req.body);
    let busData = req.body;
    let href = "/crmapi/activity/find";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsFindActive.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsFindActive', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//商城优惠卷查询
exports.tzxCouponsFindTicket = function (req, res) {
    console.log('====test tzxCouponsFindTicket', req.body);
    let busData = req.body;
    let href = "/crmapi/coupons/getAllTicketForBuy";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsFindTicket.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsFindTicket', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}
//优惠卷详情查询 通过id值
exports.tzxCouponsFindById = function (req, res) {
    console.log('====test tzxCouponsFindById', req.body);
    let busData = req.body;
    let href = "/crmapi/coupons/getTicketById";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsFindById.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsFindById', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}



//优惠卷验证

exports.tzxCouponsCheck = function (req, res) {
    console.log('====test tzxCouponsCheck', req.body);
    // let busData = req.body;
    let href = "/crmapi/customer_coupons/check";
    let store_id = "12";
    let couponslist_obj = [{ "coupons_code": "000000594535" }];
    console.log('====couponslist_obj', couponslist_obj)
    let couponslist = JSON.stringify(couponslist_obj);
    console.log('=====couponslist', couponslist)
    let billdetails_obj = [{
        item_id: "17",
        item_unit_id: "17",
        item_price: "35",
        item_count: 1,
        real_amount: 78,
    },{
        item_id: "15",
        item_unit_id: "15",
        item_price: "78",
        item_count: 1,
        real_amount: 78,
    }]
    let billdetails = JSON.stringify(billdetails_obj);
    let busData = {
        chanel: "WX02",
        bill_money: '113',
        bill_code: '1220200701000019',
        billdetails: billdetails,
        couponslist: couponslist,
    };
    console.log('====test tzxCouponsCheck busData', busData);

    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsCheck.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsCheck', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//优惠卷使用
exports.tzxCouponsUpdate = function (req, res) {
    console.log('====test tzxCouponsUpdate', req.body);
    // let busData = req.body;
    let href = "/crmapi/customer_coupons/update";
    let store_id = '12';
    // let store_id = null;
    let couponslist_obj = [{ "coupons_code": "000000594535" }];
    console.log('====couponslist_obj', couponslist_obj)
    let couponslist = JSON.stringify(couponslist_obj);
    console.log('=====couponslist', couponslist)
    let billdetails_obj = [{
        item_id: "17",
        item_unit_id: "17",
        item_price: "35",
        item_count: 1,
        real_amount: 78,
    },{
        item_id: "15",
        item_unit_id: "15",
        item_price: "78",
        item_count: 1,
        real_amount: 78,
    }
    ]
    let billdetails = JSON.stringify(billdetails_obj);
    let business_date = new Date().getTime();
    let busData = {
        chanel: "WX02",
        bill_money: '113',
        bill_code: '1220200701000019',
        discount_amount: 78,
        business_date: business_date,
        billdetails: billdetails,
        couponslist: couponslist,
    };
    console.log('====test tzxCouponsCheck busData', busData);

    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsCheck.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsCheck', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}




//优惠卷发放

exports.tzxCouponsAdd = function (req, res) {
    console.log('====test tzxCouponsAdd', req.body);
    let busData = req.body;
    let href = "/crmapi/customer_coupons/add";
    // let store_id = null;
    let store_id = '12';
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsAdd.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsAdd', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//占用优惠卷
exports.tzxCouponsPlace = function (req, res) {
    console.log('====test tzxCouponsPlace', req.body);
    let busData = req.body;
    let href = "/crmapi/coupons/placeTicketOrder";
    // let store_id = null;
    let store_id = '12';
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsPlace.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsPlace', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//撤销优惠卷发放
exports.tzxCouponsCancel = function (req, res) {
    console.log('====test tzxCouponsCancel', req.body);
    let busData = req.body;
    // let couponslist_old = [{"coupons_code":"000000243230"}];
    // let couponslist = JSON.stringify(couponslist_old);
    // let busData = {
    //     chanel: "WX02",
    //     couponslist: couponslist,
    //     last_operator: "admin",
    //     remark: "发放数量错误"
    // }
    let href = "/crmapi/customer_coupons/cancel";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsCancel.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxCouponsCancel', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//积分购买优惠卷

exports.tzxCouponsBuyByCredit = function (req, res) {
    console.log('====test tzxCouponsBuyByCredit', req.body);
    let busData = req.body;
    let href = "/crmapi/coupons/useCreditBuyTicket";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxCouponsBuyByCredit.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }
    }).catch((error) => {
        console.log('=====error tzxCouponsBuyByCredit', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}
//微信点单
//桌位订单查询
exports.tzxOrderFind = function (req, res) {
    console.log('====test tzxOrderFind', req.body);
    let busData = req.body;
    let store_id = 12;
    let href = "/crmapi/order/find";
    // let store_id = null;
    // if(busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData,store_id);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxOrderFind.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxOrderFind', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//开台

exports.tzxOrderInit = function (req, res) {
    console.log('====test tzxOrderInit', req.body);
    let busData = req.body;
    let href = "/crmapi/order/init";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxOrderInit.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }
    }).catch((error) => {
        console.log('=====error tzxOrderInit', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}

//加菜

exports.tzxOrderAdd = function (req, res) {
    console.log('====test tzxOrderAdd', req.body);
    let busData = req.body;
    busData.order_list.order_name = "20200620110000003";
    // busData.order_list.order_name = "13027734660";
    busData.order_item[0].number = 2;
    busData.order_item[0].price = busData.order_item[0].price  * 2;
    busData.order_list.total_money = busData.order_item[0].price  * 2;
    busData.order_list.actual_pay = busData.order_item[0].price  * 2;
    console.log('====test tzxOrderAdd==========', busData);

    let order_list = busData.order_list;
    order_list = JSON.stringify(order_list);
    
    let order_item = busData.order_item;
    order_item = JSON.stringify(order_item);
    busData.order_list = order_list;
    busData.order_item = order_item;
    console.log('====test tzxOrderAdd33333==========', busData);

    let href = "/crmapi/order/add";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    // let params = unit.getTzxParams(busData);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxOrderAdd.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, msg: 'file', data: newData.data });
        }
    }).catch((error) => {
        console.log('=====error tzxOrderAdd', error);
        return res.json({ code: 500, msg: '系统错误', error });

    })
}
//锁台
exports.tzxOrderLock = function (req, res) {
    console.log('====test tzxOrderLock', req.body);
    let busData = req.body;
    let store_id = 12;
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/order/lock";
    // busData.store_id = store_id;
    // let busData = {
    //     "customer_id":33,"open_id":"oWuBCwnFUXtTnKbnAy2O3PEz5YCQ","table_code":"8"
    // }
    console.log('===========test------busData', busData)
    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxOrderLock.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxOrderLock', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}


//解锁

exports.tzxOrderUnLock = function (req, res) {
    console.log('====test tzxOrderUnLock', req.body);
    let busData = req.body;
    let store_id = 12;
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id
    }
    let href = "/crmapi/order/unlock";
    // busData.store_id = store_id;
    // let busData = {
    //     "customer_id":33,"open_id":"oWuBCwnFUXtTnKbnAy2O3PEz5YCQ","table_code":"8"
    // }
    console.log('===========test------busData', busData)
    let { dataArr, sign } = unit.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxOrderUnLock.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }

    }).catch((error) => {
        console.log('=====error tzxOrderUnLock', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}


//结账
exports.tzxOrderFinish = function (req, res) {
    console.log('====test tzxOrderFinish', req.body);
    // let busData = req.body;
    let pay_list_item = [{
        pay_amount: 26,
        pay_type: "wechat_pay",
        pay_name: "微信支付",
        pay_id: "6",
    }, {
        pay_amount: 78,
        pay_type: "coupons",
        pay_name: "优惠券",
        pay_id: "2",
    }];
    //   let pay_list_arr = [pay_list_item];
    let pay_list = JSON.stringify(pay_list_item);
    let busData = {
        store_id: '12',
        table_code: "20",
        bill_num: "1220200701000015",
        mobil: "13027734660",
        pay_list
    }
    console.log('====busData', busData)
    let href = "/crmapi/order/finish";
    let store_id = null;
    if (busData.store_id) store_id = busData.store_id;
    let params = unit.getTzxParams(busData, store_id);
    let url = unit.getUrl(host, href, params);
    console.log('====url', url)
    axios.post(url, { headers: { 'contenttType': 'application/json;charset=UTF-8', "dataType": "json" } }).then((newData) => {
        console.log('==tzxOrderFinish.data', newData.data)
        if (newData.data.code == 0) {
            return res.json({ code: 200, message: 'success', data: newData.data });
        } else {
            return res.json({ code: 1, message: 'file', data: newData.data });
        }
    }).catch((error) => {
        console.log('=====error tzxOrderFinish', error);
        return res.json({ code: 500, message: '系统错误', error });

    })
}