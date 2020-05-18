// 编辑个人资料
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Picker, Input, Label } from '@tarojs/components'
import { AtList, AtListItem, AtModal, AtAvatar } from 'taro-ui'
import ImagePicker from '../../../images/user/image-picker.png'
// import Avatar from '../../../components/headPortrait'
// import Upload from '../../../components/Upload'
import { getStorage, removeStorage } from '../../../utils/storage'
import { baseUrl } from '../../../config/index'
import { getUserInfo, infoEdit } from '../server'

import './index.scss'
import getChannel from '../../../utils/channel'
import { UserInfo } from '..'

export interface Props{
  userInfo: UserInfo;
}
export interface State{
  isOpened: boolean
  genderPicker: Array<{text: string, value: string}>
  gender: number
  userInfo: UserInfo
  birthday: string
  photoUrl: string
  ImagePrivew: string | undefined
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
      gender: 0, // 不是男也不是女 性别未知
      birthday: '选择你的出生日期',
      photoUrl: '',
      ImagePrivew: '',
      userInfo: {uid: 0, username: '', mobile: ''},
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


  fetchUserInfo() {
    getUserInfo().then( (res:{data:UserInfo, code: number, userPic: string}) => {
      if (res.code == 200) {
        let sex = 0
        let birthday = ''
        if (res.data.sex) {
          sex = res.data.sex === '男' ? 1 : 2
        }
        if (res.data.birthday) {
          birthday = res.data.birthday.substring(0, 10).replace('/', '-').replace('/', '-')
        }
        this.setState({
          userInfo: res.data,
          ImagePrivew: res.data.userPic,
          gender: sex,
          birthday
        })
      }
    })
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

  editName = () => {
    Taro.navigateTo({
      url: '/pages/user/editInfo/editName'
    })
  }
  // 修改信息接口
  editInfo(type) {
    let param = {
      uid: this.state.userInfo.uid,
      sex: 0,
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

    infoEdit(param).then( res => {
      if (res.code == 200) {
        Taro.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        Taro.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  onCancel = () => {
  }
  // 选择性别
  sexChange = e => {
    this.setState(
      {
        gender: e.detail.value
      },
      () => this.editInfo('sex')
    )
  }
  // 选择生日
  onDateChange = e => {
    this.setState(
      {
        birthday: e.detail.value
      },
      () => this.editInfo('birthday')
    )
  }

  onChangeFile =(e) =>{
    let file = e.target.files[0]
    if(!this.fileFromart(file)){
      Taro.showToast({
        title:'大小不能超过1M',
        icon:'none'
      })
      return
    }
    const reader = new FileReader()
    const _this = this
    reader.onload = ( event:ProgressEvent<FileReader>) => {
      const src:string = event.target ? event.target.result+'' : ''
      // const image = new Image();
      // image.src = src
      _this.setState({
        ImagePrivew: src
      })
      _this.upload(file)
    }
    reader.readAsDataURL(file);
  }

  fileFromart(file){
    let fileSize = file.size / 1024 / 1024 < 1;
    if(!fileSize){
      return false
    }
    return true
  }
  fmtDate(){
    var date =  new Date();
    var y = date.getFullYear();
    var m =(date.getMonth()+1);
    var d = date.getDate();
    return y+"-"+m+"-"+d;
  }

  // 退出登录
  exitLogin = () => {
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
    removeStorage('userInfo')
  }
  goBack = () => {
    Taro.redirectTo({
      url: '/pages/user/index'
    })
  }

  render() {
    let { genderPicker, gender,  birthday, photoUrl, userInfo, ImagePrivew } = this.state

    return (
      <View className='edit-info'>
        {/* <BackHeader title='编辑个人资料' goBack={this.goBack} /> */}
        <View style='height:20px;' />
        <View className='mine-info'>
          <View className='relative-warp'>
            <View className='Avatar'>
              <Input
                type='file'
                accept='image/*'
                className='input-file'
                id='file'
                onInput={(e) => this.onChangeFile(e)}
                value={ImagePrivew}
              />
              <Label for='file' className='label-file'>
                {
                  ImagePrivew ?  <Image className='user-photo' src={ImagePrivew} /> :  <AtAvatar className='user-photo' circle text=''></AtAvatar>
                }
                <Image className='image-picker' src='https://assets.taozugong.com/baozugong/user/imagepicker.png' onClick={this.upload} />
              </Label>
            </View>
          </View>
        </View>
        <View style='height:1px' />
        <View className='common-title'>
          <Text className='title'>个人信息</Text>
          {/* <Text className='intro'>完善个人信息有助于租赁风控的通过</Text> */}
          <View style='height:20px;margin-left:0px;border-bottom:1PX solid #d6e4ef;' />
          <AtList hasBorder={false}>
            {/* 用户名 */}
            <View className='picker' onClick={this.editName}>
              <AtListItem title='用户名' extraText={userInfo.username} arrow='right' />
            </View>
            <Picker mode='selector' range={genderPicker} onCancel={this.onCancel} rangeKey='text' value={gender} onChange={this.sexChange}>
              <View className='picker'>
                <AtListItem title='性别' extraText={genderPicker[gender].text} arrow='right' />
              </View>
            </Picker>
            <Picker mode='date' onChange={this.onDateChange} value={birthday} end={this.fmtDate()}>
              <View className='picker'>
                <AtListItem title='生日' extraText={birthday} arrow='right' />
              </View>
            </Picker>
          </AtList>
        </View>
        <View className='loginOut' onClick={() => this.setState({ logout: true })}>
          退出登录
        </View>

        <AtModal isOpened={this.state.logout} onCancel={() => this.setState({ logout: false })} onConfirm={() => this.exitLogin()} content='确认退出登录' cancelText='取消' confirmText='确认'/>
      </View>
    )
  }
}
