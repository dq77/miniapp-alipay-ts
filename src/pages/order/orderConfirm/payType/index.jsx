import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { AtFloatLayout } from "taro-ui"
import './index.scss'

export default class Popup extends Component {
  static defaultProps = {
    visible: false,
    onClose: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      isShow: props.visible,
      list: [
        {
          value: 'alipay',
          name: '支付宝支付',
          checked: true
        },
        {
          value: 'wechat',
          name: '微信支付',
          checked: false
        },
        {
          value: 'taozugong',
          name: '账户余额',
          checked: false
        }
      ]
    }
  }
  changePayType = (e) => {
    console.log(e.detail);
  }
  componentWillReceiveProps (nextProps) {
    const { visible } = nextProps
    const { isShow } = this.state
    if (visible !== isShow) {
      this.setState({
        isShow: visible
      })
    }
  }

  checkItem = (ckItem) => {
    const list = this.state.list
    list.map(item => {
      if (item.value === ckItem.value) {
        item.checked = true
      } else {
        item.checked = false
      }
    })
    this.setState({ list })
  }

  handleClose = () => {
    this.props.onClose()
  }
  submit = () => {
    this.props.onSubmit(this.state.list.filter(item => {
      return item.checked
    })[0].value)
  }

  render () {
    const { isShow } = this.state

    return (
      <AtFloatLayout isOpened={isShow} onClose={this.handleClose.bind(this)}>
        <View className="choose-pay">
          <View className="title">选择支付方式</View>
            {this.state.list.map((item, i) => {
              return (
                <View className="pay-item" onClick={() => {this.checkItem(item)}}>
                  <View className="left-pic">
                    <Image src={`https://assets.taozugong.com/baozugong/order/${item.value}.png`} style=' width: 100%; height: 100%'></Image>
                  </View>
                  <View className="name">{item.name}</View>
                  <View className="right-pic">
                    <Image src={`https://assets.taozugong.com/baozugong/order/${item.checked?'':'un'}checked.png`} style=' width: 100%; height: 100%'></Image>
                  </View>
                </View>
              )
            })}
            <Button className='confirm-pay-btn' onClick={this.submit}>确认支付</Button>
        </View>
      </AtFloatLayout>
    )
  }
}

