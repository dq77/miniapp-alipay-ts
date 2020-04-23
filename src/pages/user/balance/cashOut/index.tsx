import Taro, { Component } from '@tarojs/taro'
import { View, Text, Label, Button, Input, Image } from '@tarojs/components'
import { AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import './index.scss'


interface State{
  current: number;
  modalShow: boolean;
  planModalShow: boolean;
}
export default class CashOut extends Component<object, State> {

  config = {
    navigationBarTitleText: '提现'
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      modalShow: false,
      planModalShow: false,
    }
  }
  componentDidMount () { }

  componentDidShow () { }

  handleClick (value:number) {
    this.setState({
      current: value
    })
  }
  showPlan = () => {
    this.setState({ modalShow: true })
  }
  closeDialog = () => {
    this.setState({ modalShow: false, planModalShow: false })
  }
  forward = () => {
    Taro.navigateTo({
      url: `/pages/order/orderConfirm/index?no=${this.$router.params.no}`
    })
  }

  render () {
    const { modalShow, planModalShow } = this.state
    return (
      <View className='cashout-page'>
        <View className="bal-card">
          <Text className="ff">余额(元)</Text>
          <View className="info">
            <View className="num">188.5</View>
            <View className="btn-area">
            </View>
          </View>
        </View>
        <View className="ipt-card">
          <Label for='name' className="label">真实姓名<Text className='xing'>*</Text></Label>
          <Input id='name' className="ipt-area" placeholder='请输入真实姓名'/>
        </View>
        <View className="ipt-card">
          <Label for='alipay' className="label">支付宝账户<Text className='xing'>*</Text></Label>
          <Input id='alipay' className="ipt-area" placeholder='请输入支付宝账户/手机号码'/>
        </View>
        <View className="ipt-card money-card">
          <Label for='money' className="label">提现金额</Label>
          <View className="ipt-money-area">
            <View className='icon-money'>￥</View>
            <Input id='money' className="ipt-area" type='number'/>
          </View>
        </View>
        <View className="confirm-cashout">
          <Button className='btn' onClick={this.showPlan}>立即提现</Button>
        </View>
        <AtModal className='succ-modal' isOpened={modalShow}>
          <AtModalContent>
            <View className="succ-pic">
              <Image src='https://assets.taozugong.com/baozugong/order/success.png' style=' width: 100%; height: 100%'></Image>
            </View>
            正在审核中，审核通过后3-7个工作日内到账
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeDialog}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
