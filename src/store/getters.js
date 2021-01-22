import d2admin from "./modules/d2admin";

// console.log('d2admin', d2admin.modules.user.state.menusList)
// console.log('state', state)

const getters = {
    // router
    menuList: state => d2admin.modules.user.state.menusList,
    // menusPrivileges: state => state.user.menusPrivileges, //  菜单权限
    // apiPrivileges: state => state.user.apiPrivileges, // 按钮权限
  };
  
  export default getters;
  