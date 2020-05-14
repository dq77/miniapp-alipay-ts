import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent } from 'taro-ui'
import { getCode, signUp } from '../server'
import './index.scss'
import { checkToken } from '../../../utils/accredit'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'


interface State{
  name: string;
  riskModalShow: boolean;
  planModalShow: boolean;
}
export default class Index extends Component<object, State> {

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
  forward = () => {
    checkToken().then( res => {
      Taro.navigateTo({
        url: `/pages/order/orderConfirm/index?no=${this.$router.params.no}`
      })
    })
  }
  onScrollToUpper = event => {

  }
  onScroll = event => {

  }

  render () {
    const { riskModalShow, planModalShow } = this.state
    return (
      <View className='good-detail-page'>
        <ScrollView className='good-detail-scroll' scrollY onScrollToUpper={this.onScrollToUpper} onScroll={this.onScroll}>
          <View className='good-income-info'>
            <View className='good-id-area'>资产包编号：2020031808965</View>
            <View className='income-area'>
              <View className='income-item'>
                <View className='dtl-num red'>20%</View>
                <View className='dtl-info'>租金收益率</View>
              </View>
              <View className='income-item'>
                <View className='dtl-num'>120天</View>
                <View className='dtl-info'>出租时长</View>
              </View>
              <View className='income-item'>
                <View className='dtl-num'>1800元</View>
                <View className='dtl-info'>进货成本</View>
              </View>
            </View>
          </View>
          <View className='tzg-tip'>淘租公提供风险保障</View>
          <View className='good-detail-card'>
            <View className="good-top-info">
              <View className="good-pic-area">
                <Image src='https://assets.taozugong.com/baozugong/activity/hellobzg/title1.png' style=' width: 100%; height: 100%'></Image>
              </View>
              <View className="good-names-area">
                <View className="good-name">【租完免换】Yaman/雅萌BLOOM美容仪</View>
              </View>
            </View>
            <View className="order-info-list">
              <View className="order-item"><View>寻租人</View><View>张**</View></View>
              <View className="order-item"><View>信用评级</View><View className="blue">极高</View></View>
              <View className="order-item"><View>租赁时长</View><View>120天</View></View>
              <View className="order-item"><View>进货成本</View><View>1800元</View></View>
              <View className="order-item"><View>租金收益</View><View>99元/月</View></View>
              <View className="order-item"><View>资产回购价</View><View>1600元</View></View>
            </View>
          </View>
          <View className="saveback-card">
            <View className="item" onClick={this.showRisk}>风控信息</View>
            <View className="item" onClick={this.showPlan}>回款计划</View>
          </View>
        </ScrollView>
        <View className='good-detail-bottom-area'>
          <Button className='confirm-btn' onClick={this.forward}>赚租金</Button>
        </View>
        <AtModal isOpened={riskModalShow} onClose={this.closeModal}>
          <AtModalHeader>风控信息</AtModalHeader>
          <AtModalContent>
            <View className="risk-item"><View className="label">居住城市：</View><View className="value">上海</View></View>
            <View className="risk-item"><View className="label">年龄：</View><View className="value">24</View></View>
            <View className="risk-item"><View className="label">同盾分数：</View><View className="value">0</View></View>
            <View className="risk-item"><View className="label">前海分数：</View><View className="value">35</View></View>
            <View className="risk-item"><View className="label">综合评分：</View><View className="value blue">信用极好</View></View>
          </AtModalContent>
        </AtModal>
        <AtModal isOpened={planModalShow} onClose={this.closeModal}>
          <AtModalHeader>回款计划</AtModalHeader>
          <AtModalContent>
            <View className="plan-item head"><View className="info">说明</View><View className="money">金额</View><View className="time">时间</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
            <View className="plan-item"><View className="info">租金</View><View className="money">99.0</View><View className="time">2020-03-04</View></View>
          </AtModalContent>
        </AtModal>
      </View>
    )
  }
}
