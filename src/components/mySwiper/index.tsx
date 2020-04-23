import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, Image, View } from '@tarojs/components'
import './index.scss'

export interface Props{
  bannerList: Array<Banner>;
}
export interface Banner{
  url: string;
  to: string
}
export interface State{
  xxs: Array<Banner>;
}

export default class MySwiper extends Component<Props, State> {
  constructor () {
    super(...arguments)
    this.state = {
      xxs: []
    }
  }

  bannerClick = item => {
    Taro.navigateTo({
      url: item.to
    })
  }

  render() {
    const { bannerList } = this.props
    return (
      <Swiper className='swiper-component' indicatorColor='#f9ab57' indicatorActiveColor='#c67219' indicatorDots >
        {bannerList.map((item) => (
          <SwiperItem key={item.url}>
            <View className='swiper-itemq'>
              <Image mode='scaleToFill' style='height: 100%;width: 100%' src={item.url} onClick={this.bannerClick.bind(this, item)} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}
