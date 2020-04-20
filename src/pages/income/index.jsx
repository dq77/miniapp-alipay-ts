import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import CardItem from './components/cardItem/index.jsx'
import './index.scss'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'

export default class Index extends Component {
  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '收益'
  }
  componentDidMount () { }

  componentDidShow () { }
  toRegister() {
    Taro.navigateTo({
      url: `/pages/activity/betaRegister/index`
    })
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const tabList = [{ title: '全部生意' }, { title: '进行中' }, { title: '已完成' }]
    return (
      <View className='income-page'>
        <ScrollView className='scroll-item' scrollY onScrollToUpper={this.onScrollToUpper} onScroll={this.onScroll}>
          <View className='title-area'>
            <View className='top-one'></View>
            <View className='top-one income'>收益</View>
            <View className='top-one income-history'>收益记录</View>
          </View>
          <View className='income-card'>
            <View className='month-income'>
              <View className='month-title'>本月收益 (元)</View>
              <View className='month-money'>99999.5</View>
            </View>
            <View className='income-info'>
              <View className='cost'>
              <View className='info-title'>生意成本 (元)</View>
              <View className='info-money'>99999.5</View>
              </View>
              <View className='all-income'>
              <View className='info-title'>历史总收益 (元)</View>
              <View className='info-money'>99999.5</View>
              </View>
            </View>
          </View>
          <AtTabs className='income-tabs fix-income-tab' current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <View className='card-list'>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View className='card-list'>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View className='card-list'>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
              </View>
            </AtTabsPane>
          </AtTabs>
        </ScrollView>
      </View>
    )
  }
}
