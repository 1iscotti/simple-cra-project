import 'whatwg-fetch';
import { message } from 'antd';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

interface IResponseError extends Error {
  response?: Response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error: IResponseError = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 *后端返回 status === 0时正常，其他情况抛出错误
 *
 * @param {IResponseData<any>} data
 * @returns
 */
function checkApiStatus(data: IResponseData<any>) {
  console.log("datadatadatadata", data)
  if (data && data.status === 0){
    return data.data
  }
  throw new Error(data.message || '')
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url: string, options: { [key: string]: any }): Promise<any> {
  return fetch(url, options).then(checkStatus).then(parseJSON).then(checkApiStatus).catch(err =>{
    message.error(err.message);
    console.log(err);
  });
}

/**
 * Parse the params, make the params to String
 *
 * @param {object} params The request params
 *
 * @returns {stirng}
 */
export const parseParams = (params: { [key: string]: any }) => (
  Object.keys(params)
    .map((key: string) => (`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`))
    .join('&')
);

/**
 * Parse the params, make the params to String, without the 'undefined'
 *
 * @param {object} params The request params
 *
 * @returns {stirng}
 */
export const parseFilteredParams = (params: { [key: string]: any }) => (
  Object.keys(params)
    .filter((key: string) => params[key] !== undefined)
    .map((key: string) => (`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`))
    .join('&')
);

/**
 * Package the get request
 *
 * @param {string} url The request url
 * @param {object} params The request params
 *
 * @returns {Promise}
 */
export function getRequest(url: string, params?: { [key: string]: any }) {
  if (params) {
    return request(`${url}?${parseFilteredParams(params)}`, {
      credentials: 'include',
    });
  }
  return request(url, {
    credentials: 'include',
  });
}

/**
 * Filter Falsy params for backend
 * @param {object} params The request params
 *
 * @returns {object}
 */
export function falsyFilter(params: { [key: string]: any }) {
  const filtedParams: { [key: string]: any } = {};
  Object.keys(params).filter((field) => !!params[field]).forEach((field) => {
    filtedParams[field] = params[field];
  });
  return filtedParams;
}

/**
 * Package the get request
 *
 * @param {string} url The request url
 * @param {object} params The request params
 * @param {function} filter Filte Params
 *
 * @returns {Promise}
 */
export function getRequestWithFilter(
  url: string,
  params: { [key: string]: any },
  filter?: (params: { [key: string]: any }) => { [key: string]: any },
) {
  let filtedParams = params;
  if (filter) {
    filtedParams = filter(params);
  }
  return request(`${url}?${parseParams(filtedParams)}`, {
    credentials: 'include',
  });
}

/**
 * Package the post request
 *
 * @param {string} url The request url
 * @param {object} params The request params
 *
 * @returns {Promise}
 */
export function postRequest(url: string, params: { [key: string]: any }) {
  return request(url, {
    method: 'POST',
    body: params ? parseParams(params) : '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  });
}

/**
 * Package the post request
 *
 * @param {string} url The request url
 * @param {object} params The request params
 *
 * @returns {Promise}
 */
export function postRequestFormData(url: string, formData: any) {
  return request(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'multipart/formData',
    // },
  });
}


export function getQueryString(name: string) {
    const reg = new RegExp(`([?&])${name}=([^&]*?)(#|&|$)`, 'i');
    const r = window.location.href.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return '';
};

/**
 * [设置cookie]
 * @param {[string]} cookie key
 * @param {[string]} cookie value
 * @author lichun
 */
export function setCookie(name:string, value:string|number) {
  const now = new Date();
  now.setDate(now.getDate() + (1000 * 60 * 60 * 24 * 30));
  // tslint:disable-next-line: no-console
  console.log('在设置cookie时新增了SameSite=Lax;在某些情况下可能有限制，关注');
  const str = `${name}=${value};expires=${now.toUTCString()};path=/;SameSite=Lax;`;
  document.cookie = str;
}

/**
 * [得到cookie]
 * @param {[string]} cookie key
 * @returns {[string]} value
 * @author lichun
 */
export function getCookie(name: string | any[]) {
  let start;
  let end;

  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`);

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
}

/**
 * 时间戳转换
 * @param {String} date eg: 1234567890
 * @return {String} 2017-07-27 10:10:10
 * @author zhangning
 */
export function secondToDatetime(timestap: any) {
  const date = new Date(timestap * 1000);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}