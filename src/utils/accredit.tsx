import { getBrowserType, getQueryString } from "./util";
import { getStorage, removeStorage, setStorage } from "./storage";
import { serviecUrl } from "src/config";
import Taro from "@tarojs/taro";
import { getOpenId } from "src/pages/user/server";
const filterUrlArr = ['#/pages/index/index', '#/pages/user/index', '/']

// 多渠道登录方法
export function authLogin() {
  switch (getStorage('channel')) {
    case 'wechat':
      // 微信浏览器内部调用授权
      wechatJsApi()
      break
    case 'weapp':
      // 微信小程序调用登录
      weappLogin()
      break
    case 'web':
      // 外部浏览器跳转登录页
      webLogin()
      break
    default:
      break
  }
}

// 微信内浏览器获取授权和openID
export function wechatJsApi() {
  let brType = getBrowserType()
  if ( brType.weixin ) {
    removeStorage('openid')
    if ( getQueryString('code') ) {
      //已授权code 获取openid
      getOpenId({ authCode: getQueryString('code'), channel: 'WECHAT_PUBLIC' }).then(res => {
        if (res.code === 200) {
          console.log('获取openid回调', res);
          if (res.data && res.data.openid) {
            setStorage('openid', res.data.openid)
          } else if (res.data.wxUserResponse && res.data.wxUserResponse.openid) {
            setStorage('openid', res.data.wxUserResponse.openid)
          }
          if (res.data.token) {
            setStorage('Token', res.data.token)
            setStorage('userInfo', JSON.stringify(res.data))
          } else {
            Taro.navigateTo({
              url: '/pages/login/bindMobile/index'
            })
          }
        }
      })
    } else {
      // 未授权 调取微信授权
      const projectUrl = window.location.hash.split('?')[0]
      let callBackUrl = ''
      if (filterUrlArr.includes(projectUrl)) {
        callBackUrl = serviecUrl + '/' + projectUrl
      } else {
        callBackUrl = window.location.href
      }
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx20fe1acf97d6654a&redirect_uri='+encodeURIComponent(callBackUrl)+'&state=wechatback&response_type=code&scope=snsapi_userinfo&state=wejsapiback#wechat_redirect'
    }
  }
}

// 微信小程序调用登录
export function weappLogin() {
  Taro.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        getOpenId({ authCode: res.code, channel: 'WECHAT_PUBLIC' }).then(res => {
          if (res.code === 200) {
            console.log('获取openid回调', res);
            if (res.data && res.data.openid) {
              setStorage('openid', res.data.openid)
            } else if (res.data.wxUserResponse && res.data.wxUserResponse.openid) {
              setStorage('openid', res.data.wxUserResponse.openid)
            }
            if (res.data.token) {
              setStorage('Token', res.data.token)
              setStorage('userInfo', JSON.stringify(res.data))
            } else {
              Taro.navigateTo({
                url: '/pages/login/bindMobile/index'
              })
            }
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

// 外部浏览器跳转登录页
export function webLogin() {
  Taro.navigateTo({
    url: '/pages/login/index'
  })
}

