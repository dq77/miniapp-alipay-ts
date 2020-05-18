import Taro, { Component } from '@tarojs/taro'
import { Button, Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
import { checkToken } from '../../../../utils/accredit'

export interface Props{
  option: Menu;
}
export interface Menu{
  checkLogin?: boolean
  name: string;
  right?: string;
  to: string;
}
export interface State{
  banner: Array<Menu>;
}
export default class MySwiper extends Component<Props, State> {
  constructor () {
    super(...arguments)
    this.state = {
      banner: []
    }
  }
  static options = {
    addGlobalClass: true
  }

  bannerClick = item => {
      console.log(item);
  }
  forward = () => {
    if (this.props.option.checkLogin) {
      checkToken().then( res => {
        Taro.navigateTo({
          url: this.props.option.to
        })
      })
    } else {
      Taro.navigateTo({
        url: this.props.option.to
      })
    }
  }

  render() {
    const { option } = this.props
    return (
      <View className='list-item-one' onClick={this.forward}>
        <View className='item-name'>{option.name}</View>
        <View className='item-right'>
          {option.right && (<Text className='right-info'>{option.right}</Text>)}
          <AtIcon prefixClass='iconfont bzg' value='right1' size='14'></AtIcon>
        </View>
      </View>
    )
  }
}
