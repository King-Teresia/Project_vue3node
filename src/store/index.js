import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isGetRouter: false,
    isCollapse: false,
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    ChangeRouterState(state, value) {
      state.isGetRouter = value
    },
    // 控制侧边栏的展开
    ChangeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    ChangeUserInfo(state, value) {
      state.userInfo = { //这个写法真nb 我来解释一下:我先把老的userInfo 所有属性和属性值拆开加在 这个心的userInfo上，然后我再把，受到更改的属性 的集合value 拆开，更改的就更新，没更改的就继续用；这样旧数据不会丢，新数据也有 怎么更新都不会丢数据
        ...state.userInfo,
        ...value
      }
    },
    RemoveUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapse", "userInfo"]//指定要持久化的 东西
  })],
})
