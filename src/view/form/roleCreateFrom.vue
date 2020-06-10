<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="角色名">
      <Input v-model="formItem.roleName" placeholder="请输入角色名"></Input>
    </FormItem>
    <FormItem label="角色权限">
      <Tree v-model="formItem.roleInfo" :data="formItem.roleInfo" show-checkbox></Tree>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: 'roleCreateFrom',
    data() {
      return {}
    },
    methods: {},
    props: {
      formItem: {
        roleName: '',
        roleInfo: []
      }
    }
  }
</script>

<style scoped>

</style>
