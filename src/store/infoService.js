const infoService = {
  state: {
    openid: '',
    showImg: true, // 是否展示全文检索大字
    searchData: '', // 搜索内容
    speExpreData: '', // 专题快报内容
    speExpreSearch: '', // 专题快报搜索
    speExpreStatus: 0, // 专题快报状态
  },
  mutations: {
    SET_OPENID: (state, id) => {
      state.openid = id
    },
    SET_SHOW_IMG: (state, val) => {
      state.showImg = val
    },
    SET_SEARCH_DATA: (state, data) => {
      state.searchData = data
    },
    SET_SPE_EXP_DATA: (state, data) => {
      state.speExpreData = data
    },
    SET_SPE_EXP_SEARCH: (state, data) => {
      state.speExpreSearch = data
    },
    SET_SPE_EXP_STATUS: (state, num) => {
      state.speExpreStatus = num
    },
  }
}

export default infoService
