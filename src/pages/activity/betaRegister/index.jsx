import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtIcon } from 'taro-ui'
import { getCode, signUp } from '../server.jsx'
import './index.scss'

const URL = 'https://assets.taozugong.com/baozugong/activity/hellobzg/'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '内测申请'
  }
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      mobile: '',
      code: '',
      reason: '',
      time: 10,
      disbtn: false,
      modalShow: false
    }
  }
  componentDidMount () { }

  componentDidShow () { }
  validate (val) {
    switch (val) {
      case 'mobile': 
        const { mobile } = this.state;
        if (mobile == '') {
          Taro.showToast({ title: '手机号不能为空', icon: 'none' })
          return false
        } 
        if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(mobile)) {
          Taro.showToast({ title: '手机号格式不正确', icon: 'none' })
          return false
        }
        return true
        break
      case 'name': 
        const { name } = this.state;
        if (name == '') {
          Taro.showToast({ title: '姓名不能为空', icon: 'none' })
          return false
        }
        return true
        break
      case 'code': 
        const { code } = this.state;
        if (code == '') {
          Taro.showToast({ title: '验证码不能为空', icon: 'none' })
          return false
        }
        return true
        break
      case 'reason': 
        const { reason } = this.state;
        if (reason == '') {
          Taro.showToast({ title: '申请理由不能为空', icon: 'none' })
          return false
        }
        return true
        break
    }
  }
  setVal = (name, val) => {
    this.setState({ [name]: val })
  }
  closeDialog = () => {
    this.setState({ modalShow: false })
  }
  getCode = () => {
    if (!this.validate('mobile')) return false
    getCode({id: this.state.mobile}).then(res => {
      Taro.showToast({ title: '发送成功', icon: 'none' })
      this.timer()

    })
  }
  timer() {
    const _this = this
    let time = _this.state.time
    this.setState({ time: time --, disbtn: true })
    const timeClock = setInterval(() => {
      this.setState({ time: time -- })
      if (_this.state.time === 0) {
        clearInterval(timeClock)
        this.setState({ time: 10, disbtn: false })
      }
    }, 1000)
  }
  onSubmit = (event) => {
    if (!this.validate('mobile') || !this.validate('name') || !this.validate('code') || !this.validate('reason')) return false
    console.log(event)
    const param = {
      name: this.state.name,
      mobile: this.state.mobile,
      code: this.state.code,
      reason: this.state.reason,
    }
    signUp(param).then(res => {
      console.log(param);
      this.setState({ modalShow: true})
    })
  }

  render () {
    const { time, disbtn, modalShow } = this.state
    return (
      <View className='registerbeta'>
        <Image className='titlepic' src={`${URL}registitle.png`} mode='widthFix' style='width: 100%'></Image>
        <View className='cnt-card'>
          <Text className='title'>申请成为内测用户</Text>
          <Text className='subtitle'>为保证审核通过率，请如实填写</Text>
          <AtForm>
            <AtInput className='regipt' name='name' type='text' placeholder='姓名' value={this.state.name} onChange={(val) => {this.setVal('name', val)}}/>
            <AtInput className='regipt' name='mobile' type='number' placeholder='手机号' value={this.state.mobile} onChange={(val) => {this.setVal('mobile', val)}}/>
            <View className='codeArea'>
              <AtInput className='regipt' name='code' type='number' placeholder='输入验证码' value={this.state.code} onChange={(val) => {this.setVal('code', val)}}/>
              <AtButton disabled={disbtn} className='getcodebtn' onClick={this.getCode}>{time === 10 ? '获取验证码' : time + ' ( s )'}</AtButton>
            </View>
            <AtInput className='regipt' name='reason' type='text' placeholder='申请理由' value={this.state.reason} onChange={(val) => {this.setVal('reason', val)}}/>
          </AtForm>
          <Text className='tologin'>已有账号，立即登录 <AtIcon prefixClass='iconfont bzg' value='fenzu' size='12'></AtIcon></Text>
          <AtButton className='signup' onClick={this.onSubmit}>提交申请</AtButton>
          <View className="info">审核通过后，会以短信的形式通知您，请注意查收</View>
        </View>
        <AtModal isOpened={modalShow}>
          <AtModalHeader>申请成功</AtModalHeader>
          <AtModalContent>
            正在审核中，审核通过后，会以短信的形式通知您，请注意查收
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeDialog}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
