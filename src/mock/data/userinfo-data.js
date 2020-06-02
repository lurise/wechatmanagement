export const userinfoData = [
  {
    name: '于辉',
    wechatname: 'yuhui',
    permission: ['super_admin', 'editor']
  },
  {
    name: '王珂',
    wechatname: 'wangke',
    permission: ['admin', 'editor']
  }
]

export const Roles = [
  {
    label: '超级管理员',
    value: 'super_admin'
  },
  {
    label: '管理员',
    value: 'admin'
  },
  {
    label: '编辑员',
    value: 'editor'
  },
  {
    label: '审核员',
    value: 'reviewer'
  }
]

export const RoleInfo = [
  {
    id: 1,
    roleName: 'super_admin',
    roleInfo: [
      {
        title: '主页',
        expand: true,
        children: [
          {
            title: '账号管理',
            expand: true,
            children: [
              {
                title: '绑定微信号',
                expand: true
              },
              {
                title: '角色管理',
                expand: true
              },
              {
                title: '权限管理',
                expand: true
              },
              {
                title: '菜单及元素管理',
                expand: true,
                checked: true
              },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    roleName: 'Admin',
    roleInfo: [
      {
        title: '主页',
        expand: true,
        children: [
          {
            title: '账号管理',
            expand: true,
            children: [
              {
                title: '绑定微信号',
                expand: true,
                checked: true
              },
              {
                title: '角色管理',
                expand: true
              },
              {
                title: '权限管理',
                expand: true
              },
              {
                title: '菜单及元素管理',
                expand: true
              }

            ]
          }
        ]
      }
    ]
  }
]

export const accessInfo = [{
  name: 'accountmanage',
  roleAccess: ["super_admin", "admin", "Editor"],
  children: [
    {
      name: 'wxbinding',
      roleAccess: ["super_admin", "admin"],
    },
    {
      name: 'role',
      roleAccess: ["super_admin", "Editor"],
    },
    {
      name: 'permission',
      roleAccess: ["super_admin", "admin"],
    },
    {
      name: 'page',
      roleAccess: ["super_admin", "admin"],
    },
  ]
},
  {
    name: 'contentmanage',
    roleAccess: ["super_admin", "admin"],
    children: [
      {
        name: 'contentlist',
        roleAccess: ["super_admin", "admin"]
      },
      {
        name: 'contentreview',
        roleAccess: ["super_admin", "admin"],
        children: [
          {
            name: 'tag',
            roleAccess: ["super_admin", "admin"]
          },
          {
            name: 'olreview',
            roleAccess: ["super_admin", "admin"]
          }
        ]
      },
      {
        name: 'releaseplan',
        roleAccess: ["super_admin", "admin"],
        children: [
          {
            name: 'officialaccount',
            roleAccess: ["super_admin", "admin"]
          },
          {
            name: 'weindex',
            roleAccess: ["super_admin", "admin"]
          },
          {
            name: 'liveshow',
            roleAccess: ["super_admin", "admin"]
          }
        ]
      },
      {
        name: 'template',
        roleAccess: ["super_admin", "admin"],
      },
      {
        name: 'material',
        roleAccess: ["super_admin", "admin"]
      },
      {
        name: 'review',
        roleAccess: ["super_admin", "admin"]
      }
    ]
  },
  {
    name: '_home',
    roleAccess: ["super_admin", "admin", "Editor"],
    children: [
      {
        name: 'home',
        roleAccess: ["super_admin", "admin", "Editor"]
      }
    ]
  },
  {
    name: 'error_401',
  }
]








