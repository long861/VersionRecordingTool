let sha1 = require('sha1');
let urlencode = require('urlencode');

module.exports = {
    sortSign,
    strSign,
    getUrl,
    // httpTzxApi,
    getSign,
    getTzxParams,
}
let app = {
    app_id: "201900010315",
    app_auth_token: "e10adc3949ba59abbe56e057f20f883e",
    tenancy_id: "banutest",
    version: "1.0",
    store_id: 0,
    AppKey: "banuAppKey"
}
function keysrt(key, desc) {
    return function (a, b) {
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}

function sortSign(data) {
    const objSort = {};
    Object.keys(data).sort().forEach(function (key) {
        objSort[key] = data[key];
    });
    return objSort;
}

function strSign(data) {
    let strData = '';
    for (let key of Object.keys(data)) {
        strData = `${strData}${key}${data[key]}`
    }
    return strData;
}

function getUrl(host, href, params) {
    let url = `${host}${href}?`;
    for (let key of Object.keys(params)) {
        url = `${url}${key}=${params[key]}&`;
    }
    if (url.lastIndexOf("&") == url.length - 1) {
        url = url.substring(0, url.length - 1);
    }
    return url;
}
function getSign(busData, systemData) {
    let t = Math.round(Date.now() / 1000);
    let businessDataSort = this.sortSign(busData);
    let businessDateStr = this.strSign(businessDataSort);
    let signData = { "data": businessDateStr, "t": t }
    let systemDataAll = Object.assign(signData, systemData);
    let signDataSort = this.sortSign(systemDataAll);
    let signDataStr = this.strSign(signDataSort);
    signDataStr = `${app.AppKey}${signDataStr}`;
    let sign = sha1(signDataStr).toUpperCase();
    //对业务数据进行url编码
    let dataArr = urlencode(JSON.stringify([busData]));
    return { dataArr, sign };
}

function getTzxParams(busData,store_id) {
    let store_id_use;
    if (!store_id) {
        store_id_use = 0;
    } else {
        store_id_use = store_id;
    }
    let t = Math.round(Date.now() / 1000);
    let systemData = {
        "app_id": app.app_id,
        "app_auth_token": app.app_auth_token,
        "tenancy_id": app.tenancy_id,
        "version": app.version,
        "store_id": store_id_use
    }
    let { dataArr, sign } = this.getSign(busData, systemData);
    let params = {
        sign,
        t,
        store_id: store_id_use,
        data: dataArr,
        app_id: app.app_id,
        tenancy_id: app.tenancy_id,
        app_auth_token: app.app_auth_token,
        version: app.version
    }
    return params;
}
