import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtModalContent } from 'taro-ui'
import { signUp } from '../server'
import CardDetail from './components/cardDetail/index'
import './index.scss'


interface State{
  current: number;
  riskModalShow: boolean;
  planModalShow: boolean;
}
export default class Balance extends Component<object, State> {

  config = {
    navigationBarTitleText: '余额'
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      riskModalShow: false,
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
    this.setState({ planModalShow: true })
  }
  closeModal = () => {
    this.setState({ riskModalShow: false, planModalShow: false })
  }
  forward = () => {
    Taro.navigateTo({
      url: `/pages/user/balance/cashOut/index`
    })
  }

  render () {
    const tabList = [{ title: '收入明细' }, { title: '支出明细' } ]
    const { current, planModalShow } = this.state
    return (
      <View className='balance-page'>
        <View className='balance-top-area'>
          <View className="bal-card">
            <Text className="ff">余额(元)</Text>
            <View className="info">
              <View className="num">188.5</View>
              <View className="btn-area">
                <Button className="pull" onClick={this.forward}>提现</Button>
              </View>
            </View>
          </View>
        </View>

        <AtTabs className='bal-tabs' current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={current} index={0} >
              <View className='card-list'>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
              </View>
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              <View className='card-list'>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
              </View>
            </AtTabsPane>
          </AtTabs>
      </View>
    )
  }
}
