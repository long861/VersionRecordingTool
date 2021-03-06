const API_CODE = {
  SUCCESS: 200,//成功
  ARGS_MISSING: 4001,//入参缺失
  ARGS_TYPE_ERROR: 4002,//入参类型错误
  ARGS_UNKNOWN_ERROR: 4003,//入参未知错误
  DATA_NOT_FOUND: 4501,//未查询到数据
  DATA_INVALID: 4502,//数据不合法
  BUSINESS_ERROR: 4503,//业务逻辑错误
  REPEAT_REQUEST: 4504,//重复请求
  LOGIN_WX_SWITCH: 4505,//微信换绑的确认
  INVALID_CARD_NUMBER: 4506,//不合法的会员卡编号
  MEMBER_NOT_REGISTER: 4507,//会员未注册，用于小程序端提示携带手机号进行注册
  WECHAT_NOT_SUBSCRIBE: 4508,//微信小程序用户未关注公众号
  ACTIVITY_REWARD_STOCK_SHORTAGE: 4509, // 活动奖品库存不足
  SYS_ERROR: 500,//系统错误
  WITHOUT_TOKEN_OR_EXPIRED: 5001,//身份认证失败
  WITHOUT_API_PERMISSION: 5002,//API无权访问
  WITHOUT_STORE_PERMISSION: 5003,//门店数据无权访问
  INVALID_SIGN: 5004,//无效sign值
  INVALID_APP_ID: 5005,//无效的访问渠道
  TZX_888888_MEMBER: 5301,//天子星888888异常会员
}

module.exports = API_CODE;
