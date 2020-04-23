import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtIcon, AtTabsPane } from 'taro-ui'
import ListItem, { Menu } from './components/listItem/index'
import './index.scss'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'
export interface Props{
  good: Menu;
}
export interface State{
  menuList: Array<Menu>;
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
      ]
    }
  }
  componentDidMount () { }

  componentDidShow () { }
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

  render () {
    const { menuList } = this.state
    return (
      <View className={process.env.TARO_ENV !== 'h5' ? 'fix-user-page user-page' : 'user-page'}>
        <View className='top-area'>
          <View className='title-area'>
            <View className='top-one'></View>
            <View className='top-one usertitle'>我的</View>
            <View className='top-one'></View>
          </View>
          <View className='user-area'>
            <View className='user-info'>
              <View className='user-pic'>
                <Image src='https://assets.taozugong.com/baozugong/activity/hellobzg/title1.png' style='width: 100%; height: 100%'></Image>
              </View>
              <View className='user-cnt'>
                <View className='user-name'>bu鲁bu因</View>
                <View className='user-mobile'>17502872222</View>
              </View>
            </View>
            <View className='set-area'>
              <View className='setting-btn'>
                <AtIcon prefixClass='iconfont bzg' value='mzicon-setting' size='22'></AtIcon>
              </View>
              <View className='setting-btn'>
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
