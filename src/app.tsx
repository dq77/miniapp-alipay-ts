import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './styles/base.scss'
import './app.scss'
import './asset/iconfont/iconfont.css'



// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/income/index',
      'pages/user/index',
      'pages/user/balance/index',
      'pages/user/balance/cashOut/index',
      'pages/user/inviteUser/index',
      'pages/goods/goodsDetail/index',
      'pages/order/orderConfirm/index',
      'pages/order/orderDetail/index',
      'pages/order/orderSuccess/index',
      'pages/login/index',
      'pages/login/bindMobile/index',
      'pages/activity/betaRegister/index',
      'pages/activity/betaRegister/hello',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./images/tab/indexa.png",
          selectedIconPath: "./images/tab/indexb.png"
        },
        {
          pagePath: "pages/income/index",
          text: "赚钱",
          iconPath: "./images/tab/incomea.png",
          selectedIconPath: "./images/tab/incomeb.png"
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "./images/tab/usera.png",
          selectedIconPath: "./images/tab/userb.png"
        }
      ],
      color: "#333",
      selectedColor: "#F67F1F",
      backgroundColor: "#fff"
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))