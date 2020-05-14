import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './hello.scss'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'

export default class Index extends Component {
  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '包租公'
  }
  componentDidMount () { }

  componentDidShow () { }
  toRegister() {
    Taro.navigateTo({
      url: `/pages/activity/betaRegister/index`
    })
  }

  render () {
    return (
      <View className='hellobzg'>
        <View className="titlepic"><Image src={`${URL}title1.png`} mode="widthFix" style=' width: 100%;'></Image></View>
        <View className="titlepic"><Image src={`${URL}title2.png`} mode="widthFix" style=' width: 100%;'></Image></View>
        <View className="titlepic"><Image src={`${URL}title3.png`} mode="widthFix" style=' width: 100%;'></Image></View>
        <View className="titlepic"><Image src={`${URL}title4.png`} mode="widthFix" style=' width: 100%;'></Image></View>
        <View className="titlepic"><Image src={`${URL}title5.png`} mode="widthFix" style=' width: 100%;'></Image></View>
        <View className="titlepic"><Image src={`${URL}title6.png`} mode="widthFix" style=' width: 100%;'></Image></View>
        <View className="titlepic"><Image src={`${URL}title7.png`} mode="widthFix" style=' width: 100%;'></Image></View>
        <View className="titlepic"><Image src={`${URL}title8.png`} mode="widthFix" style=' width: 100%;' onClick={() => this.toRegister()}></Image></View>
      </View>
    )
  }
}
