import Taro, { Component } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class MySwiper extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      banner: []
    }
  }
  static options = {
    addGlobalClass: true
  }

  bannerClick = item => {
      console.log(item);
  }

  render() {
    const { bannerList } = this.props
    return (
      <View className='income-card-one'>
        <View className='card-top'>
          <View className='user-info'>
            <View className='user-pic'>
              <Image src='https://assets.taozugong.com/baozugong/activity/hellobzg/title1.png' style='width: 100%; height: 100%'></Image>
            </View>
            <View className='user-name'>李**</View>
            <View className='location-ico'><AtIcon prefixClass='iconfont bzg' value='ionc--' size='12'></AtIcon></View>
            <View className='user-addr'>厦门市</View>
          </View>
          <View className='user-level end doing'>剩余租期:180天</View>
        </View>
        <View className='good-cnt'>
          <View className='good-pic'>
            <Image src='https://assets.taozugong.com/baozugong/activity/hellobzg/title1.png' style='width: 100%; height: 100%'></Image>
          </View>
          <View className='good-info'>
            <View className='good-title'>【租完免换】Yaman/雅萌BLOOM美容仪</View>
            <View className='good-detail'>
              <View className='detail-item'>
                <View className='detail-num'>120天</View>
                <View className='detail-name'>出租时长</View>
              </View>
              <View className='detail-item'>
                <View className='detail-num red'>20%</View>
                <View className='detail-name'>租金收益率</View>
              </View>
              <View className='detail-item'>
                <View className='detail-num'>1800元</View>
                <View className='detail-name'>进货成本</View>
              </View>
              <View className='detail-item'>
                <View className='detail-num'>1800元</View>
                <View className='detail-name'>代收租金</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
