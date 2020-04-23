import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import copy from 'copy-to-clipboard'
import './index.scss'

export default class InviteUser extends Component {
  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '邀请好友'
  }
  componentDidMount () { }

  componentDidShow () { }
  copyText() {
    let shareText = '加入包租公，躺着赚租金，快来看看！ https://partner.taozugong.com/#/pages/welcomPage/index'
    copy(shareText)
    Taro.showToast({title: '复制成功'})
  }
  savePic = () => {
    Taro.showToast({title: '长按图片即可保存', icon: 'none'})
  }

  render () {
    return (
      <View className='invite-page'>
        <View className="block"></View>
        <View className="titlepic"><Image src='https://assets.taozugong.com/baozugong/user/invite/invitePic23.png' mode="widthFix" style=' width: 100%; height: 100%'></Image></View>
        <View className="btn-area">
          <View><Button className='btn link' onClick={this.copyText}>复制链接</Button></View>
          <View><Button className='btn pic' onClick={this.savePic}>保存图片</Button></View>
        </View>
      </View>
    )
  }
}
