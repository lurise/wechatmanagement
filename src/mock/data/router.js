export const router = () => {
  return {
    id: 'home',
    title: '主页',
    children: {
      id: 'accountmng',
      title: '账号管理',
      children: [
        {
          id: 'wechatbinding',
          title: '绑定微信号'
        },
        {
          id: 'persissionmng',
          title: '权限管理'
        },
        {
          id: 'rolemng',
          title: '角色管理'
        }
      ]
    }
  }
}
