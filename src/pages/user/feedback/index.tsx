// 常见问题
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTextarea, AtInput, AtToast } from 'taro-ui'
import ImgUpload from '../components/imgUpload'
import getChannel from '../../../utils/channel'
import { baseUrl } from '../../../config/index'
import './index.scss'
import { upAddidea } from '../server'


export interface State{
  suggestion: string
  files: Array<any>;
  phone: string
  isOpened: boolean
}
export default class FeedBack extends Component<object, State> {
  config = {
    navigationBarTitleText: '意见反馈'
  }
  constructor () {
    super(...arguments)
    this.state = {
      suggestion: '',
      files: [],
      phone: '',
      isOpened: false
    }
  }

  componentDidMount = () => {
  }

  handleChange(text) {
    this.setState({
      suggestion: text,
      isOpened: false
    })
  }

  // h5 上传图片
  uploadFile = (file, id) => {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', `${baseUrl}/upload_suggest_pic`, true)
    var formData = new FormData()
    formData.append('file', file) // file 为上面拿到的file对象
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const result = JSON.parse(xhr.responseText)
        if (xhr.status === 200) {
          // 上传成功
          // Taro.showToast({
          //   'title':'上传成功',
          //   'icon':'success'
          // })
          let obj = {
            id: id,
            ImgUrl: result.data.baseImgUrl + result.data.imgRout
          }
          this.state.files.push(obj)
          this.setState({
            files: this.state.files
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

  deteUploadImg = id => {
    const arr = this.state.files.filter(item => item.id !== id)

    this.setState({
      files: arr
    })
  }

  changephone = value => {
    this.setState({
      phone: value
    })
  }

  // 提交意见
  submit = () => {
    if (this.state.suggestion == '') {
      this.setState({
        isOpened: true
      })
      return
    }

    const newArr = this.state.files.map(item => item.ImgUrl)

    let params = {
      channel: getChannel(),
      suggest: this.state.suggestion,
      mobile: this.state.phone,
      pictures: newArr
    }
    upAddidea(params).then( res => {
      if (res.code === 200) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success'
        })
        setTimeout(() => {
          Taro.navigateBack({ delta: 1 })
        }, 1500)
      } else {
        Taro.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }

  render() {
    return (
      <View className='feedback'>
        {/* <BackHeader title='意见反馈' /> */}
        <View style='background:#fff;padding:15px 0'>
          <View className='suggestion'>
            <Text className='question-title'>问题和意见</Text>
            <AtTextarea
              value={this.state.suggestion}
              onChange={this.handleChange.bind(this)}
              maxLength={500}
              height={312}
              placeholder='请描述您使用系统时的问题和建议'
            />
            <View className='imguploadWrap'>
              <ImgUpload onUploadImg={this.uploadFile} onDeteUploadImg={this.deteUploadImg} />
            </View>
            <Text className='tips'>最多三张（选填）</Text>
          </View>
        </View>
        <View className='phone'>
          <Text className='question-title'>联系方式（选填）</Text>
          <AtInput
            name='phone'
            border={false}
            title=''
            type='phone'
            placeholder='请输入手机号方便联系'
            value={this.state.phone}
            onChange={this.changephone}
          />
        </View>
        {/* // 按钮 */}
        <View className='submit'>
          <AtButton type='primary' size='normal' onClick={this.submit}>
            提交
          </AtButton>
        </View>
        <AtToast isOpened={this.state.isOpened} text='请输入问题或建议' />
      </View>
    )
  }
}
