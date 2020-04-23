import Taro, { Component } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class cardDetail extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      banner: []
    }
  }
  static options = {
    addGlobalClass: true
  }

  forward = item => {
    // Taro.navigateTo({
    //   url: `/pages/order/orderDetail/index?no=1`
    // })
  }

  render() {
    return (
      <View className='balance-card-one' onClick={this.forward}>
        <View className='bal-detail'>
          <View className="name">租金</View>
          <View className="time">2020-06-45 20:25:22</View>
        </View>
        <View className='bal-num'>+558.5</View>
      </View>
    )
  }
}
