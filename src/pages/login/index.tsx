import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtCheckbox, AtInput, AtToast } from 'taro-ui'
import { setStorage, getStorage } from '../../utils/storage';
import { sendCodeApi, normalogin } from './server'
import './index.scss'
export interface State{
  phone: string;
  password: string;
  code: string;
  sumitFlag: boolean;
  see: boolean;
  sendMsg: string;
  sendFlag: boolean;
  loginType: number;
}
export default class Login extends Component<Object,State> {
  constructor () {
    super(...arguments)
    this.state = {
      phone: '',
      password: '',
      code: '',
      sumitFlag: false, // 提交按钮置灰
      see: false, // 密码的可见与不可见
      sendMsg: '获取验证码', // 获取验证码文字 用于倒计时60秒 重新获取
      sendFlag: true,
      loginType: 1 // 1.账号密码登录 2.短信验证码登录
    }
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
      return
    } 
    if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone))) {
      Taro.showToast({
        title: '号码格式不正确',
        icon: 'none'
      })
      return
    }
    sendCodeApi({ mobile: this.state.phone, businessType: 'Login' }).then((res: { code: number; }) => {
      if ( res.code == 200 ) {
        this.timeFunction()
        Taro.showToast({
          title: '发送成功',
          icon: 'none'
        })
      }
    })
  }
  // 计时器
  timeFunction = () => {
    let num = 60
      let timer:NodeJS.Timeout = setInterval(() => {
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
  }

  toRegister = () => {
    Taro.redirectTo({
      url: `/pages/login/register/index`
    })
  }
  toNewpwd = () => {
    Taro.navigateTo({
      url: '/pages/login/newpwd'
    })
  }
  // 改变按钮置灰状态
  changeSubmitFlag = () => {
    if (
      this.state.phone != '' && this.state.code != '' && this.state.loginType == 2 ||
      this.state.phone != '' && this.state.password != '' && this.state.loginType == 1
    ) {
      this.setState({
        sumitFlag: true
      })
    } else {
      this.setState({
        sumitFlag: false
      })
    }
  }
  // 改变登录方式
  chageLoginType = (loginType, e) => {
    this.setState({
      loginType: loginType == 1 ? 2 : 1
    }, this.changeSubmitFlag)
  }
  
  // 登录
  login = () => {
    if ( this.state.phone.length !== 11 ) {
      Taro.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 2000
      }).then(
        // this.props.getType('account')
      )
      return false
    }
    let params = {
      mobile : this.state.phone,
      channel: 'M_STATION',
      password: '',
      verification: ''
    }
    if ( this.state.loginType == 1 ) {
      params.password = this.state.password
      delete params.verification
    } else {
      params.verification = this.state.code
      delete params.password
    };
    normalogin({...params}).then( res => {
      if (res.code == 200) {
        Taro.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 1000,
        })
        setTimeout(function () {
          Taro.navigateBack();
        }, 1000)
        setStorage('Token', res.data.token)
        setStorage('userInfo', res.data)
      }
    })
  }

  weLogin() {
    console.log('微信登录')
  }
  aliLogin() {
    console.log('支付宝登录')
  }
  render() {
    const { sendMsg, see, phone, code, password, sumitFlag, sendFlag, loginType } = this.state
    return (
      <View className='login'>
        <View className='at-row at-row__justify--around at-row__align--center'>
          <View className='at-col-6' onClick={this.goBack}>
            {/* <Image className='back-icon' src={BackIcon} /> */}
          </View>
          <View className='at-col-6 head-word' onClick={this.toRegister}>快速注册</View>
        </View>
        {/* 登录 */}
        <View className='login-word'>登录</View>
        <View className='login-form'>
          <AtInput clear name='phone' border={false} title='' type='phone' placeholder='请输入手机号' onChange={this.getPhone} value={phone}>
            {loginType == 2 && sendFlag && <Text className='send-code' onClick={this.sendCode}> {sendMsg}  </Text>}
            {loginType == 2 && !sendFlag && <Text className='send-code disable-send'> {sendMsg} </Text>}
          </AtInput>
          {loginType == 2 && <View className='code'>
            <AtInput name='code' clear title='' type='text' maxLength={4} placeholder='验证码' value={code} onChange={this.getCode}></AtInput>
          </View>}
          {loginType == 1 && <View className='password'>
            <AtInput clear name='password' border={false} title='' type={!see ? 'password' : 'text'} placeholder='请输入密码' onChange={this.getPassword} value={password}>
              {see &&
                <Image src='https://assets.taozugong.com/baozugong/user/login/see.png' onClick={this.seePassword} />}
              {!see &&
                <Image src='https://assets.taozugong.com/baozugong/user/login/unseen.png' onClick={this.seePassword} />}
            </AtInput>
          </View>}
          {sumitFlag && <View className='submit' >
            <AtButton type='primary' size='normal' onClick={this.login}>登录</AtButton>
          </View>}
          {!sumitFlag && <View className='no-submit' >
            <AtButton type='primary' size='normal'>登录</AtButton>
          </View>}
        </View>
        <View className='at-row loginprop'>
          <View className='at-col-6' onClick={(e) => {this.chageLoginType(loginType, e)}}>
            { loginType == 1 ? '短信验证码登录' : '账号密码登录' }
          </View>
          <View className='at-col-6 head-word' onClick={this.toNewpwd}>忘记密码</View>
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