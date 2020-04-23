import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtSegmentedControl } from 'taro-ui'
import getChannel from '../../utils/channel'
import MySwiper, { Banner } from '../../components/mySwiper/index'
import CardItem, { Good } from './components/cardItem/index'
import { getBanner } from './server'
import './index.scss'

export interface State{
  searchTxt: string;
  bannerList: Array<Banner>;
  goodList: Array<Good>;
  tabIndex: number;
  type: string;
}
export default class Index extends Component<Object,State> {
  constructor () {
    super(...arguments)
    this.state = {
      searchTxt: '',
      bannerList: [],
      goodList: [],
      tabIndex: 0,
      type: 'few'
    }
  }

  config = {
    navigationBarTitleText: '包租公'
  }

  componentWillMount () { }

  componentDidMount () {
    this.initPage()
  }

  componentDidShow () { }


  initPage = () => {

    // 获取banner图片
    // getBanner({ channel: getChannel(), count: '5' }).then((res: Object) => {
      this.setState({
        bannerList: [{ url: 'https://assets.taozugong.com/baozugong/home/banner1.png', to: '/pages/activity/betaRegister/index' }]
      })
    // })
    this.getGoodList('')
  }
  getGoodList = (type: String) => {
    // 获取资产包列表
    getBanner({ channel: getChannel(), count: '5', type: (type || 'few') }).then(res => {
      this.setState({
        goodList: [
          { id: '12' },
          { id: '13' },
          { id: '14' },
          { id: '15' },
          { id: '16' },
          { id: '17' }
        ]
      })
    })
  }
  onChange = (value) => {
    this.setState({
      searchTxt: value
    })
  }
  changeTab = (value) => {
    this.setState({
      tabIndex: value,
      type: (value === 0 ? 'few' : 'hot')
    }, () => {
      this.getGoodList(this.state.type)
    })
  }
  onActionClick = () => {
    Taro.navigateTo({
      url: `/pages/activity/betaRegister/index`
    })
  }

  render () {
    const { searchTxt, bannerList, goodList, tabIndex } = this.state
    return (
      <View className='index-page'>
        <ScrollView className='scroll-item' scrollY onScrollToUpper={this.onScrollToUpper} onScroll={this.onScroll}>
          <View className='index-page-top'>
            <AtSearchBar className='search-area' actionName='搜索' value={searchTxt} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)}/>
          </View>
          <View className='swiper-area'>
            <MySwiper bannerList={bannerList}/>
          </View>
          <View className='tabarea'>
            <AtSegmentedControl values={['最近生意', '热门生意']} onClick={this.changeTab.bind(this)} current={tabIndex} selectedColor='#FFCD86' fontSize={32}/>
          </View>
          <View className='card-list'>
            { goodList.map(item => (
              <CardItem good={item} key='id'/>
            )) }
            <View className='bottom-text'>END</View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
