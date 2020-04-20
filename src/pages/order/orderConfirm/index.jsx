import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { AtNoticebar, AtIcon, AtModalContent } from 'taro-ui'
import { getCode, signUp } from '../server.jsx'
import PayType from './payType/index.jsx'
import './index.scss'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '购买资产'
  }
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      payModalShow: false
    }
  }
  componentDidMount () { }

  componentDidShow () { }

  setVal = (name, val) => {
    this.setState({ [name]: val })
  }
  showRisk = (ev) => {
    this.setState({ payModalShow: true })
  }
  confirmPay = (type) => {
    console.log(type);
  }
  closeModal = () => {
    this.setState({ payModalShow: false })
  }

  render () {
    const { name, payModalShow } = this.state
    const popupStyle = { transform: `translateY(${Taro.pxTransform(-100)})` };
    return (
      <View className='order-confirm-page'>
        <ScrollView className='order-confirm-scroll' scrollY onScrollToUpper={this.onScrollToUpper} onScroll={this.onScroll}>
          <View className='top-bar'>
            <AtIcon prefixClass='iconfont bzg' value='laba1' size='14'></AtIcon>
            <Text className='top-text'>购买资产后，平台自动出租。第一笔租金在7日内到账。</Text>
          </View>
          <View className="good-card">
            <View className="good-top-info">
              <View className="good-pic-area">
                <Image src='https://assets.taozugong.com/baozugong/activity/hellobzg/title1.png' style=' width: 100%; height: 100%'></Image>
              </View>
              <View className="good-names-area">
                <View className="good-name">【租完免换】Yaman/雅萌BLOOM美容仪</View>
                <View className="good-num">
                  <View className="num-label">数量</View>
                  <View className="num-value">1</View>
                </View>
              </View>
            </View>
            <View className="order-info-list">
              <View className="order-item"><View>成本价</View><View>1800元</View></View>
            </View>
          </View>
          <View className="order-card">
            <View className="order-info-list">
              <View className="order-item"><View>租金收益</View><View className='orange'>99元/月</View></View>
              <View className="order-item"><View>回购价</View><View>1600元</View></View>
            </View>
          </View>
        </ScrollView>
        <View className='order-confirm-bottom-area'>
          <Button className='confirm-btn' onClick={this.showRisk}>确定购买</Button>
        </View>
        <PayType visible={payModalShow} onClose={this.closeModal} onSubmit={this.confirmPay}></PayType>
      </View>
    )
  }
}
