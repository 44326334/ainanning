/* eslint-disable */
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
let domain = DOMAIN;
let result = {};
// axios.defaults.baseURL = DOMAIN
// let token = BASE_URL
// store.commit('addToken',token)
axios.interceptors.request.use(
  function(config) {
    // config.headers.Authorization = store.state.user.token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    Mint.Indicator.close();
    if(response.data.code === 0){
      result.code = '0';
      result.message = '返回成功';
    }else {
      Mint.Toast(response.data.message);
    }
    return response;
  },
  error => {
    Mint.Indicator.close();
    if (error && error.response) {
      console.log(error)
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          Mint.Toast('请求错误');
          break;
        case 401:
          error.message = '未授权，请登录';
          Mint.Toast('未授权，请登录');
          break;
        case 403:
          error.message = '拒绝访问';
          Mint.Toast('拒绝访问');
          break;
        case 404:
          error.message = `请求地址出错`;
          Mint.Toast('请求地址出错');
          break;
        case 408:
          error.message = '请求超时';
          Mint.Toast('请求超时');
          break;
        case 500:
          error.message = '服务器内部错误';
          Mint.Toast('服务器内部错误');
          break;
        case 501:
          error.message = '服务未实现';
          Mint.Toast('服务未实现');
          break;
        case 502:
          error.message = '网关错误';
          Mint.Toast('网关错误');
          break;
        case 503:
          error.message = '服务不可用';
          Mint.Toast('服务不可用');
          break;
        case 504:
          error.message = '网关超时';
          Mint.Toast('网关超时');
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          Mint.Toast('HTTP版本不受支持');
          break;
        default:
      }
    }else {
      Mint.Toast(error);
    }
    return Promise.reject(error);
  }
);


export const getDomain = () => {
  return domain;
};
export const setDomain = $domain => {
  domain = $domain;
};
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase();
  let keys = Object.keys(queryParameters);
  let queryUrl = url;
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters);
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axios[method](queryUrl, body, config);
  } else if (method === 'get') {
    return axios[method](
      queryUrl,
      {
        params: form
      },
      config
    );
  } else {
    return axios[method](queryUrl, qs.stringify(form), config);
  }
};
/*==========================================================
 *                    Api Documentation
 ==========================================================*/
/**
 * 生成订单
 * request: createOrderFromH5UsingPOST
 * url: createOrderFromH5UsingPOSTURL
 * method: createOrderFromH5UsingPOST_TYPE
 * raw_url: createOrderFromH5UsingPOST_RAW_URL
 * @param mobile - 手机号
 * @param code - 手机验证码
 * @param num - 购买数量
 * @param seller - seller
 */
export const createOrderFromH5UsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/api/mweb/createorder'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile']
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['num'] !== undefined) {
    queryParameters['num'] = parameters['num']
  }
  if (parameters['seller'] !== undefined) {
    queryParameters['seller'] = parameters['seller']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const createOrderFromH5UsingPOST_RAW_URL = function() {
  return '/api/mweb/createorder'
}
export const createOrderFromH5UsingPOST_TYPE = function() {
  return 'post'
}
export const createOrderFromH5UsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/api/mweb/createorder'
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile']
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code']
  }
  if (parameters['num'] !== undefined) {
    queryParameters['num'] = parameters['num']
  }
  if (parameters['seller'] !== undefined) {
    queryParameters['seller'] = parameters['seller']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取卡券
 * request: getCouponUsingGET
 * url: getCouponUsingGETURL
 * method: getCouponUsingGET_TYPE
 * raw_url: getCouponUsingGET_RAW_URL
 * @param orderNo - 订单号
 */
export const getCouponUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/api/getcoupon';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters['orderNo'] !== undefined) {
    queryParameters['orderNo'] = parameters['orderNo'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('get', domain + path, body, queryParameters, form, config);
};
export const getCouponUsingGET_RAW_URL = function() {
  return '/api/getcoupon';
};
export const getCouponUsingGET_TYPE = function() {
  return 'get';
};
export const getCouponUsingGETURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/getcoupon';
  if (parameters['orderNo'] !== undefined) {
    queryParameters['orderNo'] = parameters['orderNo'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * 查询购买记录
 * request: queryUsingGET
 * url: queryUsingGETURL
 * method: queryUsingGET_TYPE
 * raw_url: queryUsingGET_RAW_URL
 * @param mobile - 购买手机号
 * @param code - 手机验证码
 */
export const queryUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/api/query';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('get', domain + path, body, queryParameters, form, config);
};
export const queryUsingGET_RAW_URL = function() {
  return '/api/query';
};
export const queryUsingGET_TYPE = function() {
  return 'get';
};
export const queryUsingGETURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/query';
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * 发送手机验证码
 * request: senSmsUsingGET
 * url: senSmsUsingGETURL
 * method: senSmsUsingGET_TYPE
 * raw_url: senSmsUsingGET_RAW_URL
 * @param mobile - 手机号
 */
export const senSmsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/api/sendsms';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('get', domain + path, body, queryParameters, form, config);
};
export const senSmsUsingGET_RAW_URL = function() {
  return '/api/sendsms';
};
export const senSmsUsingGET_TYPE = function() {
  return 'get';
};
export const senSmsUsingGETURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/api/sendsms';
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * 校验卡券有效性
 * request: checkCouponsUsingGET
 * url: checkCouponsUsingGETURL
 * method: checkCouponsUsingGET_TYPE
 * raw_url: checkCouponsUsingGET_RAW_URL
 * @param mobile - 下单手机号
 * @param coupon - 卡券编号
 */
export const checkCouponsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/consumer/verify';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters['coupon'] !== undefined) {
    queryParameters['coupon'] = parameters['coupon'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('get', domain + path, body, queryParameters, form, config);
};
export const checkCouponsUsingGET_RAW_URL = function() {
  return '/consumer/verify';
};
export const checkCouponsUsingGET_TYPE = function() {
  return 'get';
};
export const checkCouponsUsingGETURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/consumer/verify';
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters['coupon'] !== undefined) {
    queryParameters['coupon'] = parameters['coupon'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * 核销
 * request: consumeUsingPOST
 * url: consumeUsingPOSTURL
 * method: consumeUsingPOST_TYPE
 * raw_url: consumeUsingPOST_RAW_URL
 * @param orderMobile - 下单手机号
 * @param coupon - 卡券编号
 * @param province - 省或直辖市
 * @param city - 市
 * @param district - 行政区县
 * @param mobile - 快递手机号
 * @param name - 收货人姓名
 * @param address - 详细地址
 */
export const consumeUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/consumer/consume';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters['orderMobile'] !== undefined) {
    queryParameters['orderMobile'] = parameters['orderMobile'];
  }
  if (parameters['coupon'] !== undefined) {
    queryParameters['coupon'] = parameters['coupon'];
  }
  if (parameters['province'] !== undefined) {
    queryParameters['province'] = parameters['province'];
  }
  if (parameters['city'] !== undefined) {
    queryParameters['city'] = parameters['city'];
  }
  if (parameters['district'] !== undefined) {
    queryParameters['district'] = parameters['district'];
  }
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name'];
  }
  if (parameters['address'] !== undefined) {
    queryParameters['address'] = parameters['address'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('post', domain + path, body, queryParameters, form, config);
};
export const consumeUsingPOST_RAW_URL = function() {
  return '/consumer/consume';
};
export const consumeUsingPOST_TYPE = function() {
  return 'post';
};
export const consumeUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/consumer/consume';
  if (parameters['orderMobile'] !== undefined) {
    queryParameters['orderMobile'] = parameters['orderMobile'];
  }
  if (parameters['coupon'] !== undefined) {
    queryParameters['coupon'] = parameters['coupon'];
  }
  if (parameters['province'] !== undefined) {
    queryParameters['province'] = parameters['province'];
  }
  if (parameters['city'] !== undefined) {
    queryParameters['city'] = parameters['city'];
  }
  if (parameters['district'] !== undefined) {
    queryParameters['district'] = parameters['district'];
  }
  if (parameters['mobile'] !== undefined) {
    queryParameters['mobile'] = parameters['mobile'];
  }
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name'];
  }
  if (parameters['address'] !== undefined) {
    queryParameters['address'] = parameters['address'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * error
 * request: errorUsingGET
 * url: errorUsingGETURL
 * method: errorUsingGET_TYPE
 * raw_url: errorUsingGET_RAW_URL
 */
export const errorUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/error';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('get', domain + path, body, queryParameters, form, config);
};
export const errorUsingGET_RAW_URL = function() {
  return '/error';
};
export const errorUsingGET_TYPE = function() {
  return 'get';
};
export const errorUsingGETURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/error';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * error
 * request: errorUsingHEAD
 * url: errorUsingHEADURL
 * method: errorUsingHEAD_TYPE
 * raw_url: errorUsingHEAD_RAW_URL
 */
export const errorUsingHEAD = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/error';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('head', domain + path, body, queryParameters, form, config);
};
export const errorUsingHEAD_RAW_URL = function() {
  return '/error';
};
export const errorUsingHEAD_TYPE = function() {
  return 'head';
};
export const errorUsingHEADURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/error';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * error
 * request: errorUsingPOST
 * url: errorUsingPOSTURL
 * method: errorUsingPOST_TYPE
 * raw_url: errorUsingPOST_RAW_URL
 */
export const errorUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/error';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('post', domain + path, body, queryParameters, form, config);
};
export const errorUsingPOST_RAW_URL = function() {
  return '/error';
};
export const errorUsingPOST_TYPE = function() {
  return 'post';
};
export const errorUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/error';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * error
 * request: errorUsingPUT
 * url: errorUsingPUTURL
 * method: errorUsingPUT_TYPE
 * raw_url: errorUsingPUT_RAW_URL
 */
export const errorUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/error';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('put', domain + path, body, queryParameters, form, config);
};
export const errorUsingPUT_RAW_URL = function() {
  return '/error';
};
export const errorUsingPUT_TYPE = function() {
  return 'put';
};
export const errorUsingPUTURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/error';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * error
 * request: errorUsingDELETE
 * url: errorUsingDELETEURL
 * method: errorUsingDELETE_TYPE
 * raw_url: errorUsingDELETE_RAW_URL
 */
export const errorUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/error';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config);
};
export const errorUsingDELETE_RAW_URL = function() {
  return '/error';
};
export const errorUsingDELETE_TYPE = function() {
  return 'delete';
};
export const errorUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/error';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * error
 * request: errorUsingOPTIONS
 * url: errorUsingOPTIONSURL
 * method: errorUsingOPTIONS_TYPE
 * raw_url: errorUsingOPTIONS_RAW_URL
 */
export const errorUsingOPTIONS = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/error';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('options', domain + path, body, queryParameters, form, config);
};
export const errorUsingOPTIONS_RAW_URL = function() {
  return '/error';
};
export const errorUsingOPTIONS_TYPE = function() {
  return 'options';
};
export const errorUsingOPTIONSURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/error';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * error
 * request: errorUsingPATCH
 * url: errorUsingPATCHURL
 * method: errorUsingPATCH_TYPE
 * raw_url: errorUsingPATCH_RAW_URL
 */
export const errorUsingPATCH = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/error';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('patch', domain + path, body, queryParameters, form, config);
};
export const errorUsingPATCH_RAW_URL = function() {
  return '/error';
};
export const errorUsingPATCH_TYPE = function() {
  return 'patch';
};
export const errorUsingPATCHURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/error';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * payNotify
 * request: payNotifyUsingPOST
 * url: payNotifyUsingPOSTURL
 * method: payNotifyUsingPOST_TYPE
 * raw_url: payNotifyUsingPOST_RAW_URL
 * @param notifyData - notifyData
 * @param map - map
 */
export const payNotifyUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/pay/notify';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters['notifyData'] !== undefined) {
    body = parameters['notifyData'];
  }
  if (parameters['notifyData'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: notifyData'));
  }
  if (parameters['map'] !== undefined) {
    queryParameters['map'] = parameters['map'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('post', domain + path, body, queryParameters, form, config);
};
export const payNotifyUsingPOST_RAW_URL = function() {
  return '/pay/notify';
};
export const payNotifyUsingPOST_TYPE = function() {
  return 'post';
};
export const payNotifyUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/pay/notify';
  if (parameters['map'] !== undefined) {
    queryParameters['map'] = parameters['map'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * receive
 * request: receiveUsingGET
 * url: receiveUsingGETURL
 * method: receiveUsingGET_TYPE
 * raw_url: receiveUsingGET_RAW_URL
 * @param code - code
 * @param state - state
 */
export const receiveUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/receive';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code'];
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'));
  }
  if (parameters['state'] !== undefined) {
    queryParameters['state'] = parameters['state'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('get', domain + path, body, queryParameters, form, config);
};
export const receiveUsingGET_RAW_URL = function() {
  return '/wx/receive';
};
export const receiveUsingGET_TYPE = function() {
  return 'get';
};
export const receiveUsingGETURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/receive';
  if (parameters['code'] !== undefined) {
    queryParameters['code'] = parameters['code'];
  }
  if (parameters['state'] !== undefined) {
    queryParameters['state'] = parameters['state'];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * checkOpenId
 * request: checkOpenIdUsingGET
 * url: checkOpenIdUsingGETURL
 * method: checkOpenIdUsingGET_TYPE
 * raw_url: checkOpenIdUsingGET_RAW_URL
 */
export const checkOpenIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/redirect';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('get', domain + path, body, queryParameters, form, config);
};
export const checkOpenIdUsingGET_RAW_URL = function() {
  return '/wx/redirect';
};
export const checkOpenIdUsingGET_TYPE = function() {
  return 'get';
};
export const checkOpenIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/redirect';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * checkOpenId
 * request: checkOpenIdUsingHEAD
 * url: checkOpenIdUsingHEADURL
 * method: checkOpenIdUsingHEAD_TYPE
 * raw_url: checkOpenIdUsingHEAD_RAW_URL
 */
export const checkOpenIdUsingHEAD = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/redirect';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('head', domain + path, body, queryParameters, form, config);
};
export const checkOpenIdUsingHEAD_RAW_URL = function() {
  return '/wx/redirect';
};
export const checkOpenIdUsingHEAD_TYPE = function() {
  return 'head';
};
export const checkOpenIdUsingHEADURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/redirect';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * checkOpenId
 * request: checkOpenIdUsingPOST
 * url: checkOpenIdUsingPOSTURL
 * method: checkOpenIdUsingPOST_TYPE
 * raw_url: checkOpenIdUsingPOST_RAW_URL
 */
export const checkOpenIdUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/redirect';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('post', domain + path, body, queryParameters, form, config);
};
export const checkOpenIdUsingPOST_RAW_URL = function() {
  return '/wx/redirect';
};
export const checkOpenIdUsingPOST_TYPE = function() {
  return 'post';
};
export const checkOpenIdUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/redirect';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * checkOpenId
 * request: checkOpenIdUsingPUT
 * url: checkOpenIdUsingPUTURL
 * method: checkOpenIdUsingPUT_TYPE
 * raw_url: checkOpenIdUsingPUT_RAW_URL
 */
export const checkOpenIdUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/redirect';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('put', domain + path, body, queryParameters, form, config);
};
export const checkOpenIdUsingPUT_RAW_URL = function() {
  return '/wx/redirect';
};
export const checkOpenIdUsingPUT_TYPE = function() {
  return 'put';
};
export const checkOpenIdUsingPUTURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/redirect';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * checkOpenId
 * request: checkOpenIdUsingDELETE
 * url: checkOpenIdUsingDELETEURL
 * method: checkOpenIdUsingDELETE_TYPE
 * raw_url: checkOpenIdUsingDELETE_RAW_URL
 */
export const checkOpenIdUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/redirect';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config);
};
export const checkOpenIdUsingDELETE_RAW_URL = function() {
  return '/wx/redirect';
};
export const checkOpenIdUsingDELETE_TYPE = function() {
  return 'delete';
};
export const checkOpenIdUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/redirect';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * checkOpenId
 * request: checkOpenIdUsingOPTIONS
 * url: checkOpenIdUsingOPTIONSURL
 * method: checkOpenIdUsingOPTIONS_TYPE
 * raw_url: checkOpenIdUsingOPTIONS_RAW_URL
 */
export const checkOpenIdUsingOPTIONS = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/redirect';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('options', domain + path, body, queryParameters, form, config);
};
export const checkOpenIdUsingOPTIONS_RAW_URL = function() {
  return '/wx/redirect';
};
export const checkOpenIdUsingOPTIONS_TYPE = function() {
  return 'options';
};
export const checkOpenIdUsingOPTIONSURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/redirect';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
/**
 * checkOpenId
 * request: checkOpenIdUsingPATCH
 * url: checkOpenIdUsingPATCHURL
 * method: checkOpenIdUsingPATCH_TYPE
 * raw_url: checkOpenIdUsingPATCH_RAW_URL
 */
export const checkOpenIdUsingPATCH = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config;
  let path = '/wx/redirect';
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request('patch', domain + path, body, queryParameters, form, config);
};
export const checkOpenIdUsingPATCH_RAW_URL = function() {
  return '/wx/redirect';
};
export const checkOpenIdUsingPATCH_TYPE = function() {
  return 'patch';
};
export const checkOpenIdUsingPATCHURL = function(parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/wx/redirect';
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  let keys = Object.keys(queryParameters);
  return (
    domain +
    path +
    (keys.length > 0
      ? '?' +
        keys
          .map(key => key + '=' + encodeURIComponent(queryParameters[key]))
          .join('&')
      : '')
  );
};
