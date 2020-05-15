import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtIcon, AtTabsPane } from 'taro-ui'
import ListItem, { Menu } from './components/listItem/index'
import { setStorage, getStorage } from '../../utils/storage';
import './index.scss'
import { checkToken } from '../../utils/accredit';
import { ysfConfig } from '../../utils/kefu'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'

declare global {
  interface Window {
    ysf: object
  }
}
export interface Props{
  good: Menu;
}
export interface UserInfo{ uid: number, username: string, mobile: string}
export interface State{
  menuList: Array<Menu>;
  userInfo: UserInfo
  isLogin: boolean
}

export default class Index extends Component<Props, State> {
  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '我的'
  }
  constructor () {
    super(...arguments)
    this.state = {
      menuList: [
        { name: '我的余额', right: '188.5', to:'/pages/user/balance/index' },
        { name: '邀请好友', to:'/pages/user/inviteUser/index' },
        { name: '帮助中心', to:'/pages/activity/betaRegister/hello' },
        { name: '退出登录', to:'/pages/activity/betaRegister/hello' }
      ],
      userInfo: {
        uid: 0,
        username: '包租公用户',
        mobile: ''
      },
      isLogin: false
    }
  }
  componentWillMount() {
  }
  componentDidMount () {
  }

  componentDidShow () {
    if (getStorage('Token')) {
      const userInfo = getStorage("userInfo")
      if (userInfo != null && Object.keys(userInfo).length != 0) {
        this.setState({
          userInfo: userInfo,
          isLogin: true
        });
      }
    }
  }
  toRegister() {
    Taro.navigateTo({
      url: `/pages/activity/betaRegister/hello`
    })
  }
  handleClick (value) {
    this.setState({
      menuList: value
    })
  }
  topClick = () => {
    if (this.state.isLogin) {
      Taro.navigateTo({
        url: "/pages/user/editInfo/index",
      })
    } else {
      checkToken()
    }
  }
  openKefu = () => {
    ysfConfig(window.ysf)
  }

  render () {
    const { menuList, userInfo, isLogin } = this.state
    return (
      <View className={process.env.TARO_ENV !== 'h5' ? 'fix-user-page user-page' : 'user-page'}>
        <View className='top-area'>
          <View className='title-area'>
            <View className='top-one'></View>
            <View className='top-one usertitle'>我的</View>
            <View className='top-one'></View>
          </View>
          <View className='user-area'>
            <View className='user-info' onClick={this.topClick}>
              <View className='user-pic'>
                <Image src='https://assets.taozugong.com/baozugong/activity/hellobzg/title1.png' style='width: 100%; height: 100%'></Image>
              </View>
              { isLogin ? (
              <View className='user-cnt'>
                <View className='user-name'>{ userInfo.username || '包租公用户' }</View>
                <View className='user-mobile'>{ userInfo.mobile }</View>
              </View> ) : (
              <View className='user-cnt'>
                <View className='user-name user-login'>登录</View>
                <View className='user-mobile'>登录后可享受更多特权</View>
              </View>
              )}
            </View>
            <View className='set-area'>
              <View className='setting-btn'>
                <AtIcon prefixClass='iconfont bzg' value='mzicon-setting' size='22'></AtIcon>
              </View>
              <View className='setting-btn' onClick={this.openKefu}>
                <AtIcon prefixClass='iconfont bzg' value='kefu' size='22'></AtIcon>
              </View>
            </View>
          </View>
        </View>
        <View className='menu-list'>
          { menuList.map(item => (
            <ListItem option={item}/>
          ))}
        </View>
      </View>
    )
  }
}
