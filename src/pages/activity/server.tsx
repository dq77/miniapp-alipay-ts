import Request from '../../utils/request';


/* 获取手机验证码 */
export const getCode = (data) => {
  return Request({
    url: '/goods/brand/client/brand_list',
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



