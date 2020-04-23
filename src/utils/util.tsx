
// 访问浏览器类型判断

// let brType = getBrowserType();
// if ( !brType.mobile ) {
//     console.log('PC端')
// }
 export function getBrowserType() {
  // 客户端浏览器信息
  var u = navigator.userAgent;
  return {
      // IE内核
      trident: u.indexOf('Trident') > -1,
      // 苹果、谷歌内核
      webKit: u.indexOf('AppleWebKit') > -1,
      // 是否为移动终端
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      // android终端或者uc浏览器
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      // 是否为iPhone或者QQHD浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
      // 微信内置浏览器
      weixin: !!(u.match('MicroMessenger'))
  }
}

// 获取链接中的参数
export function getQueryString(name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  // var r = 'http://0.0.0.0:9099/#/pages/custom_activity/index?type=lease'.substr(1).match(reg)
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2])
  return null
}