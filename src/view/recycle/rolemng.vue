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
      >
        <template slot="createNewRole">
          <Button class="create-btn" type="primary" @click="handleCreate">
            创建角色
          </Button>
        </template>
        <template slot="deleteRole">
          <Button class="delete-btn" type="warning" @click="handleDelete">
            删除角色
          </Button>
        </template>
      </tables>
    </Card>
    <Modal ref="roleDelete" v-model="deleteRoleModal" title="确认删除" :loading="deleteRoleLoding"
           @on-ok="roleDeleteAsyncOK">
      <p>确定删除所选角色么？</p>
    </Modal>
    <Modal v-model="createNewRoleModal" title="创建新角色" :loading="roleCreateLoading" @on-ok="roleCreateAsyncOK">
      <roleCreateFrom :formItem="formItem"></roleCreateFrom>
    </Modal>
  </div>
</template>

<script>
  import Tables from '_c/recycle/roleTable'
  import {getRoleInfo, postRoleCreateData} from '@/api/data'
  import roleCreateFrom from '../form/roleCreateFrom'

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
    data() {
      return {
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
          {tytle:'序号',type: 'index', align: 'center',width: 60},
          {title: '角色名', key: 'roleName', sortable: true, align: 'center'},
          {
            title: '操作',
            slot: 'role_edit',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    mounted() {
      this.roleLoading = true
      getRoleInfo().then(
        res => {
          this.tableData = res.data
          this.roleLoading = false
        }
      )
    },
    methods: {
      handleDelete() {
        this.deleteRoleModal = true;
      },
      roleDeleteAsyncOK() {
        // this.deleteRoleLoding = true;
        this.$refs.tables.deleteSelection()
        // this.deleteRoleLoding = false;
        this.roleLoading = true
        getRoleInfo().then(
          res => {
            this.tableData = res.data
            this.roleLoading = false
          }
        )
      },
      handleCreate() {
        if (this.hasCreate) {
          this.formItem.roleName = '';
          this.formItem.roleInfo = roleInfo;
          this.hasCreate = false;
        }
        this.createNewRoleModal = true
      },
      roleCreateAsyncOK() {
        this.roleCreateLoading = true;
        // console.log(this.formItem.roleName)
        if (this.formItem.roleName === '') {
          this.$Message.error("请输入角色名");
          this.roleCreateLoading = false;
          return
        }

        postRoleCreateData().then(req => {
          console.log(req.data)
          this.formItem.id = req.data;
          this.createNewRoleModal = false;
          this.hasCreate = true;

          this.roleLoading = true;
          getRoleInfo().then(
            res => {
              this.tableData = res.data;
              this.roleLoading = false;
              this.$Message.info("创建成功")
            }
          ).catch(e => {
            this.$Message.error("创建失败: error->" + e)
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
