<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" :loading="roleLoading" v-model="tableData"
              :columns="columns">
        <template slot="createNewRole">
          <Button class="create-btn" type="primary" @click="handleCreate">
            创建角色
          </Button>
        </template>
      </tables>
    </Card>
    <Modal v-model="createNewRoleModal" title="创建新角色" :loading="roleCreateLoading" @on-ok="roleCreateAsyncOK">
     <roleCreateFrom :formItem="formItem"></roleCreateFrom>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables/roleTable'
import { getRoleInfo } from '@/api/data'
import roleCreateFrom from '../../view/form/roleCreateFrom'
// import { getRoles } from '../../api/data'

export default {
  name: 'rolemng',
  components: {
    Tables,
    roleCreateFrom
  },
  data () {
    return {
      formItem: {
        roleName: '',
        roleInfo: {}
      },
      roleLoading: false,
      roleCreateLoading: false,
      createNewRoleModal: false,
      tableData: [],
      columns: [
        { title: '序号', key: 'id' },
        { title: '角色名', key: 'roleName', sortable: true },
        {
          title: '操作',
          slot: 'role_edit',
          width: 150,
          align: 'center'
        }
      ]
    }
  },
  mounted () {
    this.roleLoading = true
    getRoleInfo().then(
      res => {
        this.tableData = res.data
        this.roleLoading = false
      }
    )
  },
  methods: {
    handleCreate () {
      this.createNewRoleModal = true
    },
    roleCreateAsyncOK () {
      console.log(this.formItem)
    }
  }
}
</script>

<style scoped>
  .create-btn {
    float: right;
    margin-right: 100px;
  }
</style>
