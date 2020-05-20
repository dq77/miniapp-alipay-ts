
export default {
  namespace: 'orderList',
  state: {
    num: 0, // 待支付订单数量
    page: 1
  },
  effects: {
    // 查询列表数据
    *fetchorderList({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          page: payload.page,
          num: payload.num
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
