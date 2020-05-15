import { setStorage, getStorage } from '../utils/storage';

export function ysfConfig(ysf) {
  const userInfo = getStorage('userInfo')
  return ysf.config({
    uid: userInfo.uid || '',
    name: userInfo.username || '',
    email: '',
    mobile: userInfo.mobile || '',
    data: JSON.stringify([
      { key: 'channel', label: '渠道', value: '包租公'},
      { key: 'goodName', label: '其他信息', value: '无'}
    ]),
    success: function() {
      ysf('open');
    },
    error: function() {
      // 错误回调
      // handle error
    }
  })
}
