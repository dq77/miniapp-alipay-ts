import Request from '../../utils/request';


/* 根据微信提供的code 去后端获取openid */
export const getOpenId = (data) => {
  return Request({
    url: '/user/wechat/UserLogin',
    method: 'GET',
    data
  })
}

/* 内测注册提交申请 */
export const signUp = (data) => {
  return Request({
    url: '/user/get_auth_code',
    method: 'POST',
    data
  })
}
  
  /**
   * 注册
   * @param {mobile, password,verification,channel='APP'} data
   */
  // register = data => Request({
  //   url: '/user/register',
  //   method: 'POST',
  //   data,
  //   requestType: true
  // })



