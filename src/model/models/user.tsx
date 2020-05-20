
export default {
  namespace: 'user',
  state: {
    userInfo: {},
    address: []
  },
  effects: {
    // 设置用户信息
    *setUserInfo({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          setUserInfo: payload
        }
      })
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
