import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { AtIcon, AtButton, AtModalContent } from 'taro-ui'
import './index.scss'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'

interface State{
  name: string;
  riskModalShow: boolean;
  planModalShow: boolean;
}
export default class OrderSuccess extends Component<object, State> {

  config = {
    navigationBarTitleText: '生意详情'
  }
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      riskModalShow: false,
      planModalShow: false,
    }
  }
  componentDidMount () { }

  componentDidShow () { }

  showRisk = (ev) => {
    this.setState({ riskModalShow: true })
  }
  showPlan = () => {
    this.setState({ planModalShow: true })
  }
  closeModal = () => {
    this.setState({ riskModalShow: false, planModalShow: false })
  }
  toHome = () => {
    Taro.navigateTo({
      url: `/pages/index/index`
    })
  }
  toDetail = () => {
    Taro.navigateTo({
      url: `/pages/order/orderDetail/index?no=${1}`
    })
  }

  render () {
    const { riskModalShow, planModalShow } = this.state
    return (
      <View className='order-success-page'>
        <ScrollView className='order-success-scroll' scrollY onScrollToUpper={this.onScrollToUpper} onScroll={this.onScroll}>
          <View className='top-bar'>
            <AtIcon prefixClass='iconfont bzg' value='laba1' size='14'></AtIcon>
            <Text className='top-text'>购买资产后，平台自动出租。第一笔租金在7日内到账。</Text>
          </View>
          <View className='main-card-info'>
            <View className='success-pic'>
              <Image src='https://assets.taozugong.com/baozugong/order/success.png' style=' width: 100%; height: 100%'></Image>
            </View>
            <View className='success-tip'>出租成功,商品即将发往寻租人</View>
          </View>
          <View className='good-detail-card'>
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
              <View className="order-item"><View>寻租人</View><View>张**</View></View>
              <View className="order-item"><View>信用评级</View><View className="blue">极高</View></View>
              <View className="order-item"><View>租赁时长</View><View>120天</View></View>
              <View className="order-item"><View>进货成本</View><View>1800元</View></View>
              <View className="order-item"><View>租金收益</View><View>99元/月</View></View>
              <View className="order-item"><View>租赁开始时间</View><View>2020-03-19</View></View>
              <View className="order-item"><View>租赁结束时间</View><View>2020-06-19</View></View>
            </View>
            <View className="btn-area">
              <View className="info-btn" onClick={this.toHome}>返回首页</View>
              <View className="info-btn" onClick={this.toDetail}>查看生意详情</View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
