import Request from '../../utils/request';


/* 获取手机验证码 */
export const sendCodeApi = (data) => {
  return Request({
    url: '/user/get_auth_code',
    method: 'POST',
    data
  })
}
/* 正常登录 */
export const normalogin = (data) => {
  return Request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

  
  /**
   * 注册
   * @param {mobile, password,verification,channel='APP'} data
   */
  export const register = (data) => {
    return Request({
      url: '/user/register',
      method: 'POST',
      data
    })
  }



