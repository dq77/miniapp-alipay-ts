import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtCheckbox, AtInput, AtToast } from 'taro-ui'
import { getStorage } from '../../../utils/storage'
// import Alipay from '../../../images/user/alipay.png'
// import Wechat from '../../../images/user/wechat.png'
import './index.scss'
import { sendCodeApi, register } from '../server'

export interface State{
  phone: string;
  password: string;
  code: string;
  sumitFlag: boolean;
  checkedList: Array<any>;
  see: boolean;
  sendMsg: string;
  sendFlag: boolean;
}

export default class Register extends Component<Object,State> {
  checkboxOption: { value: string; label: string }[]

  constructor() {
    super(...arguments)

    this.state = {
      phone: '',
      password: '',
      code: '',
      sumitFlag: false, // 提交按钮置灰
      checkedList: [],  // 同意协议
      see: false, // 密码的可见与不可见
      sendMsg: '获取验证码', // 获取验证码文字 用于倒计时60秒 重新获取
      sendFlag: true
    }
    this.checkboxOption = [{
      value: '1',
      label: '我已阅读并同意',
    }]
  }
  componentDidMount = () => {
    let phone = this.$router.params.phone
    this.setState({
      phone: phone || ''
    })
  };
  getPhone = (value) => {
    this.setState({
      phone: value
    }, this.changeSubmitFlag)
  }
  //同意协议
  handleChange = (value) => {
    this.setState({
      checkedList: value
    }, this.changeSubmitFlag)
  }
  goBack = () => {
    Taro.navigateBack();
  }
  //  密码的显示与隐藏
  seePassword = () => {
    this.setState({
      see: !this.state.see
    })
  }
  //  获取密码
  getPassword = (value) => {
    this.setState({
      password: value
    }, this.changeSubmitFlag)
  }
  getCode = (value) => {
    this.setState({
      code: value
    }, this.changeSubmitFlag)
  }
  // 获取验证码
  sendCode = () => {
      
    const { phone } = this.state;
    if (phone == '') {
      Taro.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
    } else if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone))) {
      Taro.showToast({
        title: '号码格式不正确',
        icon: 'none'
      })
    } else {
      sendCodeApi({ mobile: this.state.phone, businessType: 'Register' }).then((res: { code: number; }) => {
        if ( res.code == 200 ) {
          Taro.showToast({
            title: '发送成功',
            icon: 'none'
          })
          let num = 60
          let timer = setInterval(() => {
            num = num - 1
            if (num == 0) {
              clearInterval(timer);
              this.setState({
                sendFlag: true,
                sendMsg: '重新发送'
              })
            } else {
              this.setState({
                sendFlag: false,
                sendMsg: '重新发送' + num + '秒'
              })
            }
          }, 1000)
        }else if (res.code === 10006) {
          setTimeout(() => {
            this.toLogin(this.state.phone)
          }, 1000)
        }
      })
    }
  }

  toLogin = (phone:string = '') => {
    Taro.redirectTo({
      url: `/pages/login/index?phone=${phone}`
    })
  }

  // 改变按钮置灰状态
  changeSubmitFlag = () => {
    if (this.state.phone != '' && this.state.code != '' && this.state.password != '' && this.state.checkedList.length > 0) {
      this.setState({
        sumitFlag: true
      })
    } else {
      this.setState({
        sumitFlag: false
      })
    }
  }
  
  // 注册
  register = () => {
    let params = {
      mobile: this.state.phone,
      password: this.state.password,
      verification:this.state.code,
      channel:'M_STATION'
    }
    register(params).then( res => {
      if (res.code == 200) {
        Taro.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        Taro.showToast({ 
          title: '注册失败',
          icon: 'none',
          duration: 2000
        }).then(
          // this.props.getType('account')
        )
      }
    })
  }
  weLogin() {
    console.log('微信登录')
  }
  aliLogin() {
    console.log('支付宝登录')
  }

  // 前往用户协议
  navToagreement = () => {
    Taro.navigateTo({
      url: '/pages/user/userAgreement/index'
    })
  }

  render() {
    const { sendMsg, see, phone, code, password, sumitFlag, checkedList, sendFlag } = this.state
    return (
      <View className='login'>
        <View className='at-row at-row__justify--around at-row__align--center'>
          <View className='at-col-6' onClick={this.goBack}>
            {/* <Image className='back-icon' src={BackIcon} /> */}
          </View>
          <View className='at-col-6 head-word' onClick={() => {this.toLogin()}}>账户登录</View>
        </View>
        {/* 注册 */}
        <View className='login-word'>快速注册</View>
        <View className='login-form'>
          <AtInput clear name='phone' border={false} title='' type='phone' placeholder='请输入手机号' onChange={this.getPhone} value={phone}>
            {sendFlag && <Text className='send-code' onClick={this.sendCode}> {sendMsg} </Text>}
            {!sendFlag && <Text className='send-code disable-send'> {sendMsg} </Text>}
          </AtInput>
          <View className='code'>
            <AtInput name='code' clear title='' type='text' maxLength={4} placeholder='验证码' value={code} onChange={this.getCode}></AtInput>
          </View>
          <View className='password'>
            <AtInput clear name='password' border={false} title='' type={!see ? 'password' : 'text'} placeholder='请输入密码' onChange={this.getPassword} value={password}>
              {see &&
                <Image src='https://assets.taozugong.com/baozugong/user/login/see.png' onClick={this.seePassword}/>}
              {!see &&
                <Image src='https://assets.taozugong.com/baozugong/user/login/unseen.png' onClick={this.seePassword}/>}
            </AtInput>
          </View>
          {sumitFlag && <View className='submit' >
            <AtButton type='primary' size='normal' onClick={this.register}>注册</AtButton>
          </View>}
          {!sumitFlag && <View className='no-submit' >
            <AtButton type='primary' size='normal'>注册</AtButton>
          </View>}
        </View>
        <View className='at-row agree'>
          <AtCheckbox
            options={this.checkboxOption}
            selectedList={checkedList}
            onChange={this.handleChange.bind(this)}
          />
          <Text className='agreement-regis' onClick={this.navToagreement}>《包租公用户协议》</Text>
        </View>
        {/* <View className=' third-login'>
            <View className=''>第三方登录</View>
            <View className='login-type'>
              <View className='wechat'>
                <Image src={Wechat} onClick={this.weLogin} />
              </View>
              <View className='alipay'>
                <Image src={Alipay} onClick={this.aliLogin} />
              </View>
            </View>
        </View> */}
      </View>
    )
  }
}