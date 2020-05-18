// 更改用户名
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import { getStorage } from '../../../utils/storage'

import './index.scss'
import { UserInfo } from '..'
import { infoEdit } from '../server'

export interface Props{
  userInfo: UserInfo;
}
export interface State{
  name: string
  uid: number
}
export default class NameEdit extends Component<Props, State> {
  config = {
    navigationBarTitleText: '用户名'
  }
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      uid: 0
    }
  }

  componentDidMount = () => {
    this.setState({
      name: getStorage('userInfo').username,
      uid: getStorage('userInfo').uid,
    })
  }
  getName = value => {
    this.setState({ name: value })
  }
  save = () => {
    let reg = /^[\u2E80-\u9FFF]+$/ //Unicode编码中的汉字范围
    if (!reg.test(this.state.name)) {
      Taro.showToast({
        title: '姓名不合法,请输入中文',
        icon: 'none'
      })
      return
    }
    const { name } = this.state
    if (name == '') {
      Taro.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
    } else {
      const param = { username: this.state.name, uid: this.state.uid }
      infoEdit(param).then( res => {
        if (res.code == 200) {
          Taro.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            Taro.redirectTo({
              url: '/pages/user/index'
            })
          }, 1000)
        } else {
          Taro.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
  goBack = () => {
    Taro.navigateTo({
      url: '/pages/user/edit-baseinfo/index'
    })
  }

  render() {
    const { name } = this.state
    return (
      <View className='edit-info edit-name'>
        <AtInput
          clear
          name='name'
          title='用户名'
          type='text'
          placeholder='最多十个字符'
          value={name}
          onChange={this.getName}
          maxLength={10}
        />
        <AtButton type='primary' size='normal' onClick={this.save}>
          保存
        </AtButton>
      </View>
    )
  }
}
