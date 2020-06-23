<template>
  <div>
    <Card>
      <tables
        ref="tables"
        searchable
        search-place="top"
        :loading="permissionLoding"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"/>
    </Card>
    <Modal v-model="permissionModal" title="权限修改" :loading="loading" @on-ok="asyncOK">
      <permission-form :formItem="permissionForm"></permission-form>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getUserData, getRoles } from '@/api/data'
import PermissionForm from '@/view/form/permissionform'
import '_c/tables/index.less'

export default {
  name: 'permission2',
  components: {
    Tables,
    PermissionForm
  },
  data () {
    return {
      loading: false,
      permissionModal: false,
      permissionLoding: false,
      permissionForm: {
        index: 0,
        name: '',
        wechatname: '',
        permission: []
      },
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
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.index)
                    this.showPermission(params.index)
                  }
                }
              }, '编辑权限')
            ])
          }
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
    asyncOK () {
      let index = this.permissionForm.index
      this.tableData[index].permission = this.permissionForm.permission
    },
    showPermission (index) {
      this.permissionModal = true
      this.permissionForm = {
        index: index,
        name: this.tableData[index].name,
        wechatname: this.tableData[index].wechatname,
        permission: this.tableData[index].permission
      }
    },
    handleDelete () {
      console.log('delete')
    }
  },
  computed: {
    tableDataComputed: function () {
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
