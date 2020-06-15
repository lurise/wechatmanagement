<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" :loading="permissionLoding" v-model="tableData" :columns="columns"
              @on-delete="handleDelete"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables/permissionTable'
import { getUserData } from '@/api/data'
import { getRoles } from '../../api/data'

export default {
  name: 'permission',
  components: {
    Tables
  },
  data () {
    return {
      permissionLoding: false,
      columns: [
        { title: '姓名', key: 'name', sortable: true },
        { title: '微信号', key: 'wechatname' },
        { title: '权限', key: 'permission' },
        {
          title: '权限标签',
          slot: 'permission',
          width: 150,
          align: 'left'
        },
        {
          title: '操作',
          slot: 'permission_edit',
          width: 150,
          align: 'center'
        }
      ],
      tableData: [],
      Roles: []
    }
  },
  mounted () {
    this.permissionLoding = true
    getUserData().then(res => {
      this.tableData = res.data
      this.permissionLoding = false
    })

    getRoles().then(res => {
      this.Roles = res.data
    })
  },
  methods: {
    handleDelete () {
      console.log('delete')
    }
  },
  computed: {
    tableDataComputed: function () {
      // let map = new Map()
      // let Roles = this.Roles
      // let tableData = this.tableData
      // let tableDataComp = []
      // for (let i = 0; i < Roles.length; i++) {
      //   map[Roles[i].value] = Roles[i].label
      // }
      //
      // for (let i = 0; i < tableData.lenth; i++) {
      //   let permissions = []
      //   for (let j = 0; j < tableData[i].permission.length; j++) {
      //     permissions.push(map[tableData[i].permission[j]])
      //   }
      //   tableDataComp.push({
      //     name:tableData[i].name,
      //     wechatname:tableData[i].wechatname,
      //     permission:permissions.join(",")
      //   })
      // }
      //
      // return tableDataComp
      let tableDataComp = []
      for (let i = 0; i < this.tableData.length; i++) {
        tableDataComp.push({
          name: this.tableData[i].name,
          wechatname: this.tableData[i].wechatname,
          permission: this.tableData[i].permission.join(',')
        })
      }
      return tableDataComp
    }
  }
}
</script>

<style scoped>

</style>
