import Taro from '@tarojs/taro';
import { baseUrl } from '../config';
import { getStorage } from './storage';

export default (options = { method: 'GET', data: {}, url: '' }) => {
  const Token = getStorage('Token')
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'Content-Type': 'application/json',
      Authorization: Token ? Token : '' // 请求携带token
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.code !== 200) {
        Taro.showToast({
          title: `${res.data.msg}~`,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}