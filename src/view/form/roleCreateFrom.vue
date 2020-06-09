<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="角色名">
      <Input v-model="formItem.roleName" placeholder="请输入角色名"></Input>
    </FormItem>
    <FormItem label="角色权限">
      <Tree v-model="formItem.roleInfo"  :data="formItem.roleInfo" show-checkbox></Tree>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'roleCreateFrom',
  data () {
    return {
      formItem: {
        roleName: '',
        roleInfo: [
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
                expand: true
              }
            ]
          }
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
