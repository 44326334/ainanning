/* eslint-disable */
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
let domain = CONSUME;
let result = {};

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
      console.log(error);
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
    } else {
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
 * errorHtml
 * request: errorHtmlUsingGET
 * url: errorHtmlUsingGETURL
 * method: errorHtmlUsingGET_TYPE
 * raw_url: errorHtmlUsingGET_RAW_URL
 */
export const errorHtmlUsingGET = function(parameters = {}) {
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
export const errorHtmlUsingGET_RAW_URL = function() {
  return '/error';
};
export const errorHtmlUsingGET_TYPE = function() {
  return 'get';
};
export const errorHtmlUsingGETURL = function(parameters = {}) {
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
 * errorHtml
 * request: errorHtmlUsingHEAD
 * url: errorHtmlUsingHEADURL
 * method: errorHtmlUsingHEAD_TYPE
 * raw_url: errorHtmlUsingHEAD_RAW_URL
 */
export const errorHtmlUsingHEAD = function(parameters = {}) {
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
export const errorHtmlUsingHEAD_RAW_URL = function() {
  return '/error';
};
export const errorHtmlUsingHEAD_TYPE = function() {
  return 'head';
};
export const errorHtmlUsingHEADURL = function(parameters = {}) {
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
 * errorHtml
 * request: errorHtmlUsingPOST
 * url: errorHtmlUsingPOSTURL
 * method: errorHtmlUsingPOST_TYPE
 * raw_url: errorHtmlUsingPOST_RAW_URL
 */
export const errorHtmlUsingPOST = function(parameters = {}) {
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
export const errorHtmlUsingPOST_RAW_URL = function() {
  return '/error';
};
export const errorHtmlUsingPOST_TYPE = function() {
  return 'post';
};
export const errorHtmlUsingPOSTURL = function(parameters = {}) {
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
 * errorHtml
 * request: errorHtmlUsingPUT
 * url: errorHtmlUsingPUTURL
 * method: errorHtmlUsingPUT_TYPE
 * raw_url: errorHtmlUsingPUT_RAW_URL
 */
export const errorHtmlUsingPUT = function(parameters = {}) {
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
export const errorHtmlUsingPUT_RAW_URL = function() {
  return '/error';
};
export const errorHtmlUsingPUT_TYPE = function() {
  return 'put';
};
export const errorHtmlUsingPUTURL = function(parameters = {}) {
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
 * errorHtml
 * request: errorHtmlUsingDELETE
 * url: errorHtmlUsingDELETEURL
 * method: errorHtmlUsingDELETE_TYPE
 * raw_url: errorHtmlUsingDELETE_RAW_URL
 */
export const errorHtmlUsingDELETE = function(parameters = {}) {
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
export const errorHtmlUsingDELETE_RAW_URL = function() {
  return '/error';
};
export const errorHtmlUsingDELETE_TYPE = function() {
  return 'delete';
};
export const errorHtmlUsingDELETEURL = function(parameters = {}) {
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
 * errorHtml
 * request: errorHtmlUsingOPTIONS
 * url: errorHtmlUsingOPTIONSURL
 * method: errorHtmlUsingOPTIONS_TYPE
 * raw_url: errorHtmlUsingOPTIONS_RAW_URL
 */
export const errorHtmlUsingOPTIONS = function(parameters = {}) {
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
export const errorHtmlUsingOPTIONS_RAW_URL = function() {
  return '/error';
};
export const errorHtmlUsingOPTIONS_TYPE = function() {
  return 'options';
};
export const errorHtmlUsingOPTIONSURL = function(parameters = {}) {
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
 * errorHtml
 * request: errorHtmlUsingPATCH
 * url: errorHtmlUsingPATCHURL
 * method: errorHtmlUsingPATCH_TYPE
 * raw_url: errorHtmlUsingPATCH_RAW_URL
 */
export const errorHtmlUsingPATCH = function(parameters = {}) {
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
export const errorHtmlUsingPATCH_RAW_URL = function() {
  return '/error';
};
export const errorHtmlUsingPATCH_TYPE = function() {
  return 'patch';
};
export const errorHtmlUsingPATCHURL = function(parameters = {}) {
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
