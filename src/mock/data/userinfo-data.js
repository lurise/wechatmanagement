export const userinfoData = [
    {
        name: '于辉',
        wechatname: 'yuhui',
        permission: ['SuperAdmin', 'Editor']
    },
    {
        name: '王珂',
        wechatname: 'wangke',
        permission: ['Admin', 'Editor']
    }
]

export const Roles = [
    {
        label: '超级管理员',
        value: 'SuperAdmin'
    },
    {
        label: '管理员',
        value: 'Admin'
    },
    {
        label: '编辑员',
        value: 'Editor'
    },
    {
        label: '审核员',
        value: 'Reviewer'
    }
]

export const RoleInfo = [
    {
        id: 1,
        roleName: 'SuperAdmin',
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
    name: '主页',
    roleAccess: ["SuperAdmin", "Admin", "Editor"],
    children: [
        {
            name: '账号管理',
            roleAccess: ["SuperAdmin", "Admin", "Editor"],
            children: [
                {
                    name: '绑定微信号',
                    roleAccess: ["SuperAdmin", "Admin"],
                },
                {
                    name: '角色管理',
                    roleAccess: ["SuperAdmin", "Editor"],
                },
                {
                    name: '权限管理',
                    roleAccess: ["SuperAdmin", "Admin"],
                },
                {
                    name: '菜单及元素管理',
                    roleAccess: ["SuperAdmin", "Admin"],
                },
            ]
        }
    ]
}]








