// 编辑个人资料
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtModal } from 'taro-ui'
import ImagePicker from '../../../images/user/image-picker.png'
// import Avatar from '../../../components/headPortrait'
// import Upload from '../../../components/Upload'
import { getStorage, removeStorage } from '../../../utils/storage'
import { baseUrl } from '../../../config/index'
import { getUserInfo } from '../server'

import './index.scss'
import getChannel from '../../../utils/channel'
import { UserInfo } from '..'

export interface Props{
  userInfo: UserInfo;
}
export interface State{
  isOpened: boolean
  genderPicker: Array<{text: string, value: string}>
  gender: string
  birthday: string
  photoUrl: string
  logout: boolean
}
export default class EditBaseInfo extends Component<Props, State> {
  config = {
    navigationBarTitleText: '编辑个人资料'
  }
  constructor () {
    super(...arguments)
    this.state = {
      isOpened: false,
      genderPicker: [{ text: '选择你的性别', value: '0' }, { text: '男', value: '1' }, { text: '女', value: '2' }],
      gender: '0', // 不是男也不是女 性别未知
      birthday: '选择你的出生日期',
      photoUrl: '',
      logout: false
    }
  }
  componentWillMount() {
  }

  componentDidMount = () => {
    this.fetchUserInfo()
  }

  componentDidShow() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userInfo !== nextProps.userInfo) {
      this.echoBaseinfo(nextProps.userInfo)
    }
  }

  fetchUserInfo() {
    getUserInfo()
  }

  upload = file => {
    const Toekn = getStorage('Token')
    var xhr = new XMLHttpRequest()
    xhr.open('POST', `${baseUrl}/upload_pic`, true)
    var formData = new FormData()
    formData.append('file', file) // file 为上面拿到的file对象
    xhr.setRequestHeader('Authorization', Toekn)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //   上传成功
          Taro.showToast({
            title: '上传成功',
            icon: 'success'
          })
        } else {
          // 上传失败
          Taro.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      }
    }
    xhr.send(formData)
  }

  echoBaseinfo = userInfo => {
    if (userInfo.sex) {
      this.setState({
        gender: userInfo.sex === '男' ? '1' : '2'
      })
    }
    if (userInfo.userPic) {
      this.setState({
        photoUrl: userInfo.userPic
      })
    }
    if (userInfo.birthday) {
      let birthday = userInfo.birthday.substring(0, 10).replace('/', '-').replace('/', '-')
      this.setState({
        birthday: birthday
      })
    }
  }
  editName = () => {
    Taro.navigateTo({
      url: '/pages/user/editInfo/editName'
    })
  }
  // 修改信息接口
  editInfo(type) {
    let param = {
      uid: this.props.userInfo.uid,
      sex: '',
      birthday: ''
    }
    if (type == 'sex') {
      param.sex = this.state.gender
      delete param.birthday
    }
    if (type == 'birthday') {
      param.birthday = this.state.birthday + ' 00:00:00'
      delete param.sex
    }

    this.props.dispatch({
      type: 'user/infoEdit',
      payload: param,
      callback: data => {
        if (data.code == 200) {
          Taro.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          }).then()
        } else {
          Taro.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          })
            .then
            // this.props.getType('account')
            ()
        }
      }
    })
  }
  onCancel = () => {
    this.setState()
  }
  // 選擇性別
  sexChange = e => {
    // 友盟埋点
    cnzzTrackEvent('用户信息编辑', '性别选择')
    this.setState(
      {
        gender: e.detail.value
      },
      () => this.editInfo('sex')
    )
  }
  // 選擇生日
  onDateChange = e => {
    // 友盟埋点
    cnzzTrackEvent('用户信息编辑', '生日选择')
    this.setState(
      {
        birthday: e.detail.value
      },
      () => this.editInfo('birthday')
    )
  }

  //退出登录
  exitLogin = () => {
    // 友盟埋点
    cnzzTrackEvent('用户编辑', '退出登录')
    Taro.redirectTo({
      url: '/pages/user/index'
    })
    if (getChannel() === 'JDBT') {
      removeStorage('accessToken')
    } else if (getChannel() === 'ALIPAY_LIFE') {
      removeStorage('authCode')
    }
    removeStorage('openid')
    removeStorage('Token')
    removeStorage('loginStatus')
    sessionStorage.removeItem('userInfo')
  }
  goBack = () => {
    Taro.redirectTo({
      url: '/pages/user/index'
    })
  }

  render() {
    let { userInfo } = this.props
    let { genderPicker, gender, job, address, birthday, photoUrl } = this.state

    return (
      <View className='edit-info'>
        {/* <BackHeader title='编辑个人资料' goBack={this.goBack} /> */}
        <View style='height:20px;' />
        <View className='mine-info'>
          <View className='relative-warp'>
            {/* <Avatar onReadImageURL={this.upload} avatarUrl={this.props.userInfo.userPic} /> */}
            <Image className='image-picker' src={ImagePicker} />
          </View>
          {/* <View className='user_name'>
                        <Text className='user-name'>{userInfo.username}</Text>
                        <Image className='edit-name'  src={EditName} />
                    </View> */}
        </View>
        {/* <View className='common-title'>
                    <Text className='title'>实名认证</Text>
                    <Text className='intro'>通过信用认证，可享受信用免押金</Text>
                    <View className='authentication' onClick={userInfo.isPass!==2 ? this.authentication :null}>
                        <AtList hasBorder={false}>
                            <AtListItem title='身份证信息' extraText={userInfo.isPass !==2 ? '去认证':'已认证'} arrow='right' />
                        </AtList>
                    </View>
                </View> */}
        <View style='height:1px' />
        <View className='common-title'>
          <Text className='title'>个人信息</Text>
          <Text className='intro'>完善个人信息有助于租赁风控的通过</Text>
          <View style='height:20px;margin-left:0px;border-bottom:1PX solid #d6e4ef;' />
          <AtList hasBorder={false}>
            {/* 用户名 */}
            <View className='picker' onclick={this.editName}>
              <AtListItem title='用户名' extraText={userInfo.username} arrow='right' />
            </View>
            <Picker
              mode='selector'
              range={genderPicker}
              onCancel={this.onCancel}
              rangeKey='text'
              value={gender}
              onChange={this.sexChange}
            >
              <View className='picker'>
                <AtListItem title='性别' extraText={genderPicker[gender].text} arrow='right' />
              </View>
            </Picker>
            <Picker mode='date' onChange={this.onDateChange} value={birthday} end={fmtDate()}>
              <View className='picker'>
                <AtListItem title='生日' extraText={birthday} arrow='right' />
              </View>
            </Picker>
          </AtList>
        </View>
        <View className='loginOut' onClick={() => this.setState({ logout: true })}>
          退出登录
        </View>

        <AtModal
          isOpened={this.state.logout}
          cancelText='取消'
          confirmText='确认'
          onCancel={() => this.setState({ logout: false })}
          onConfirm={() => this.exitLogin()}
          content='确认退出登陆'
        />
      </View>
    )
  }
}
