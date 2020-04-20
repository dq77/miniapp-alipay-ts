import Request from '../../utils/request';


/* 获取首页轮播 */
export const getBanner = (data) => {
  return Request({
    url: '/goods/banner/client/banner_list',
    method: 'GET',
    data,
    requestType: true
  })
}
/* 内测注册提交申请 */
export const signUp = (data) => {
  return Request({
    url: '/user/get_auth_code',
    method: 'POST',
    data,
    requestType: true
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



