<template>
  <div>
    <Card>
      <tables ref="tables"
              editable
              searchable
              search-place="top"
              :border="true"
              :loading="roleLoading"
              v-model="tableData"
              :columns="columns"
              :selectItems="selectionItems"
              @on-select="onSelect"
              @on-select-cancel="onSelectCancel"
              @on-select-all="onSelectALl"
              @on-select-change="onSelectChange"
      >
        <template slot="header">
          <Button class="create-btn" type="primary" @click="handleCreate">
            创建角色
          </Button>
          <Button class="delete-btn" type="warning" @click="handleDelete">
            删除角色
          </Button>
        </template>
        <template slot="loading">获取角色信息中，请稍后</template>

      </tables>
    </Card>
    <Modal ref="roleDelete" v-model="deleteRoleModal" title="确认删除" :loading="deleteRoleLoding"
           @on-ok="roleDeleteAsyncOK">
      <p>确定删除如下角色么？</p><br>
      <p>{{roleNames}}</p>
    </Modal>
    <Modal v-model="createNewRoleModal" title="创建新角色" :loading="roleCreateLoading" @on-ok="roleCreateAsyncOK">
      <roleCreateFrom :formItem="formItem"></roleCreateFrom>
    </Modal>
    <Modal v-model="roleModal" title="角色修改" :loading="loading" @on-ok="roleAsyncOK">
      <Tree :data="roleTreeData" show-checkbox></Tree>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getRoleInfo, postRoleCreateData } from '@/api/data'
import roleCreateFrom from '../../view/form/roleCreateFrom'
import { deleteRole } from '../../api/data'

const roleInfo = [
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

export default {
  name: 'rolemng',
  components: {
    Tables,
    roleCreateFrom
  },
  computed: {
    roleNames () {
      let roleNames = []
      for (let i = 0; i < this.selectionItems.length; i++) {
        roleNames.push(this.selectionItems[i].roleName)
      }
      return roleNames.join(',')
    }
  },
  data () {
    return {
      roleModal: false,
      roleTreeData: [],
      selectionItems: [],
      deleteRoleModal: false,
      contextMenu: true,
      showContextMenu: true,
      hasCreate: false,
      formItem: {
        id: Number,
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
      },
      roleLoading: false,
      roleCreateLoading: true,
      deleteRoleLoding: false,
      createNewRoleModal: false,
      tableData: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        { tytle: '序号', type: 'index', align: 'center', width: 60 },
        { title: '角色名', key: 'roleName', sortable: true, align: 'center' },
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
                styles: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.roleTreeShow(params.index)
                  }
                }
              }, '编辑角色')
            ])
          }
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
    onSelect (selection, row) {
      this.selectionItems = selection
    },
    onSelectALl (selection, row) {
      this.selectionItems = selection
    },
    onSelectCancel (selection, row) {
      this.selectionItems = selection
    },
    onSelectChange (selection, row) {
      this.selectionItems = selection
    },
    roleTreeShow (index) {
      this.roleModal = true
      this.roleTreeData = this.tableData[index].roleInfo
    },
    handleDelete () {
      this.deleteRoleModal = true
    },
    roleDeleteAsyncOK () {
      this.roleLoading = true
      deleteRole(this.selectionItems).then(
        res => {
          if (res.data.status === 200) {
            this.$Message.info(res.data.roleName.join(',') + '删除成功')
          } else {
            this.$Message.error('服务器发生错误，未能删除成功，请稍后再试')
          }
          getRoleInfo().then(
            res => {
              this.tableData = res.data
              this.roleLoading = false
            }
          )
        }
      ).catch(e => {
        this.$Message.error('未能删除角色，请稍后再试:' + e)
      })
    },
    handleCreate () {
      if (this.hasCreate) {
        this.formItem.roleName = ''
        this.formItem.roleInfo = roleInfo
        this.hasCreate = false
      }
      this.createNewRoleModal = true
    },
    roleAsyncOK () {

    },
    roleCreateAsyncOK () {
      this.roleCreateLoading = true
      // console.log(this.formItem.roleName)
      if (this.formItem.roleName === '') {
        this.$Message.error('请输入角色名')
        this.roleCreateLoading = false
        return
      }

      postRoleCreateData().then(req => {
        console.log(req.data)
        this.formItem.id = req.data
        this.createNewRoleModal = false
        this.hasCreate = true

        this.roleLoading = true
        getRoleInfo().then(
          res => {
            this.tableData = res.data
            this.roleLoading = false
            this.$Message.info('创建成功')
          }
        ).catch(e => {
          this.$Message.error('创建失败: error->' + e)
        })
      })
    }
  }
}
</script>

<style scoped>
  .create-btn {
    /*float: left;*/
    margin-left: 10px;

  }

  .delete-btn {
    /*float:right;*/
    margin-left: 10px;
  }
</style>
