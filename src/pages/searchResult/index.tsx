import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import getChannel from '../../utils/channel'
import { AtSearchBar } from 'taro-ui'
import './index.scss'
import { getGoodsList } from './server'
import ItemsGrid, { Good } from '../../components/ItemGrid/index'

export interface State{
  value: string;
  loading: boolean;
  searchResultGoodsData: Array<Good>;
  isLast: number;
  page: number;
  pageSize: number;
}
export default class SearchResult extends Component<Object,State> {
  config = {
    navigationBarTitleText: '搜索结果页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      value: '',
      loading: false,
      searchResultGoodsData: [],
      isLast: 0,
      page: 1,
      pageSize: 10
    }
  }


  componentWillMount = () => {}

  componentDidMount = () => {

    this.setState({
      value: decodeURI(this.$router.params.keyWords)
    },() => {
      this.searchResultByKeyWorld()
    })
  }

  onKeyWorldChange(value) {
    this.setState({
      value: value
    })
  }

  searchResultByKeyWorld = (loadMore:boolean = false) => {
    getGoodsList({
      page: this.state.page,
      pageSize: this.state.pageSize,
      channel: getChannel(),
      keyWords: this.state.value
    }).then(res => {
      let { searchResultGoodsData } = this.state
      if (loadMore) {
        let goodsList = searchResultGoodsData.concat(res.data.list)
        this.setState({
          loading: false,
          searchResultGoodsData: goodsList,
          isLast: res.data.isLast
        })
      } else {
        this.setState({
          loading: false,
          searchResultGoodsData: res.data.list,
          isLast: res.data.isLast
        })
      }
    })
  }

  onActionClick() {
    this.setState(
      {
        page: 1
      },
      () => {
        this.searchResultByKeyWorld()
      }
    )
    // Taro.navigateTo({
    //   url:`/pages/searchResult/index?keyWords=${this.state.value}`
    // })
  }

  loadMoreGoodsData = () => {
    let { isLast, page } = this.state

    if (isLast) {
      return
    } else {
      page = page + 1
      this.setState(
        {
          page: page
        },
        () => {
          this.searchResultByKeyWorld(true)
        }
      )
    }
  }

  viewGoods = () => {
    
  }

  render() {
    const { loading, searchResultGoodsData, isLast } = this.state

    return (
      <View className='searchResult-page'>
        <AtSearchBar actionName='搜索' value={this.state.value} onChange={this.onKeyWorldChange.bind(this)} onActionClick={this.onActionClick.bind(this)}/>

        {loading ? ( <View /> ) : (
          <ScrollView scrollY className='searchResult-scrollView' onScrollToLower={this.loadMoreGoodsData}>
            <View className='items-grid-view'>
              {searchResultGoodsData.length !== 0 ? (
                <ItemsGrid ItemsGridData={searchResultGoodsData} onClick={this.viewGoods} />
              ) : (
                <View className='no-data'>
                  <Text>没有找到商品哦！</Text>
                </View>
              )}
            </View>

            {isLast ? (
              <View className='data-tips'>
                <Text>没有更多了·····</Text>
              </View>
            ) : (
              <View className='loading-tips'>
                <Text>加载中·······</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    )
  }
}
