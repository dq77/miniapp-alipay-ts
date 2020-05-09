import Taro, { Component } from '@tarojs/taro'
import { Image, View, Text } from '@tarojs/components'
import './index.scss'

export interface Props{
  ItemsGridData: Array<Good>
  onClick ?: (event: Event) => any
}
export interface Good{
  no: string;
  headFigure: string
  name: string
  goodsLabel: Array<string>
  minPrice: number
  businessType: number
  unit: string
}
export default class ItemGrid extends Component<Props, Object> {

  static defaultProps = {
    ItemsGridData: []
  }

  componentDidShow = () => {}

  handleClick(item:Good) {
    Taro.navigateTo({
      url: `/pages/goods/goodsDetail/index?no=${item.no}`
    })
  }

  render() {
    const { ItemsGridData } = this.props
    return (
      <View>
        <View className='Items-grid'>
          {ItemsGridData.map((item:Good) => (
            <View className='Items-grid-item' key={item.no} onClick={this.handleClick.bind(this, item)}>
              <Image className='img-area' src={item.headFigure} mode='aspectFill'/>
              <View className='grid-txt-block'>
                <View className='grid-item-title'>
                  <Text className='item-title-txt'>{item.name}</Text>
                </View>
                <View className='grid-item-tag'>
                  {item.goodsLabel &&
                    item.goodsLabel.length > 0 &&
                    item.goodsLabel.map(
                      (label, labelInx) =>
                        labelInx < 2 && (
                          <Text className='item-tag-txt' key={labelInx}>
                            {label}
                          </Text>
                        )
                    )}
                </View>
                <View className='grid-item-price'>
                  <View className='price'>¥ {item.minPrice}</View> {item.businessType === 0 ? `/${item.unit}` : ''}
                </View>
              </View>
            </View>
          ))}
        </View>

        {ItemsGridData.length === 0 && (
          <View className='Items-grid-no-data'>
            <Text>暂无数据</Text>
          </View>
        )}
      </View>
    )
  }
}
