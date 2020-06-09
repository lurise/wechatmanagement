<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="姓名">
      <Input v-model="formItem.name" disabled placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem label="微信名">
      <Input v-model="formItem.wechatname" disabled placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem label="权限">
      <Select v-model="formItem.permission" multiple>
        <Option v-for="item in Roles" :key="item.value" :value="item.value">{{item.label}}</Option>
      </Select>
    </FormItem>
  </Form>
</template>
<script>
import { getRoles } from '../../api/data'

export default {
  name: 'PermmisionForm',
  data () {
    return {
      Roles: []
    }
  },
  props: {
    formItem: {
      name: '',
      wechatname: '',
      permission: []
    }
  },
  methods: {
    getRoleData () {
      getRoles().then(res => {
        this.Roles = res.data
      }
      )
    }
  },
  mounted () {
    this.getRoleData()
  }
}
</script>
<style scoped>

</style>
