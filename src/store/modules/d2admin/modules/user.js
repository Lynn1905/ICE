import { LoginByUserInfo } from "@api/sys.login.js"
import util from '@/libs/util.js'
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    // 菜单信息
    menusList: [],
    // 菜单权限
    menusPrivileges: [],
    // 按钮权限
    apiPrivileges: []
  },
  getters: {
    menus(state) {
      return state.menusList;
    }
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set ({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        const token = util.cookies.get('token')
        if (token && token !== 'undefined') {
          LoginByUserInfo().then(async res => {
            if (res.code === 0) {
              state.info = res.object.userInfo;
              state.menusList = res.object.menus;
              state.menuPrivileges = res.object.menuPrivileges;
              state.apiPrivileges = res.object.apiPrivileges;
              // 设置用户权限
              util.cookies.set('menuPrivileges', JSON.stringify(res.object.menuPrivileges))
              util.cookies.set('apiPrivileges', JSON.stringify(res.object.apiPrivileges))
              // await dispatch('d2admin/user/set', {
              //   userInfo: res.object.userInfo
              // }, { root: true })
            }
          })
        }
        // let animation = await dispatch('d2admin/db/get', {
        //   dbName: 'sys',
        //   path: 'user.info',
        //   defaultValue: {},
        //   user: true
        // }, { root: true })
        // console.log('animation', animation)
        // end
        resolve()
      })
    }
  }
}
