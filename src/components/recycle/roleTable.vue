<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">
          {{ item.title }}
        </Option>
      </Select>
      <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search"/>&nbsp;&nbsp;搜索
      </Button>
    </div>
    <div class="btns">
      <slot name="createNewRole"></slot>
      <slot name="deleteRole"></slot>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{row,index}" slot="role_edit">
        <Button type="primary" size="small" style="margin-right: 5px" @click="roleTreeShow(index)">角色编辑</Button>
      </template>
    </Table>
    <Modal v-model="roleModal" title="角色修改" :loading="loading" @on-ok="roleAsyncOK">
      <Tree :data="roleTreeData" show-checkbox></Tree>
    </Modal>
    <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">
          {{ item.title }}
        </Option>
      </Select>
      <Input placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <Button class="search-btn" type="primary">
        <Icon type="search"/>&nbsp;&nbsp;搜索
      </Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
import TablesEdit from '../tables/edit.vue'
import handleBtns from '../tables/handle-btns'
import PermissionForm from '../../view/form/permissionform'
import '../tables/index.less'
import Editor from '_c/editor'
import { deleteRole } from '../../api/data'

export default {
  name: 'Tables',
  computed: {
    // getRoleName: function (rolename) {
    //   return this.roles[rolename]
    // }
  },
  props: {
    canCreate: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    contextMenu: {
      type: Boolean,
      default: true
    },
    showContextMenu: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
       * @description 全局设置是否可编辑
       */
    editable: {
      type: Boolean,
      default: false
    },
    /**
       * @description 是否可搜索
       */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
       * @description 搜索控件所在位置，'top' / 'bottom'
       */
    searchPlace: {
      type: String,
      default: 'top'
    }
  },
  /**
     * Events
     * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
     * @on-cancel-edit 返回值 {Object} 同上
     * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
     */
  data () {
    return {
      selectItems: [],
      contextLine: 0,
      // loading: true,
      roles: new Map([
        ['SuperAdmin', '超级管理员'],
        ['Admin', '管理员'],
        ['Editor', '编辑员']]),
      permissionForm: {
        index: 1,
        name: '',
        wechatname: '',
        permission: []
      },
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchValue: '',
      searchKey: '',
      roleModal: false,
      roleTreeData: [
        {
          title: '主页',
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
  },
  components: {
    PermissionForm,
    Editor
  },
  methods: {
    handleContextMenuEdit () {
      this.roleModal = true
      this.roleTreeData = this.insideTableData[index].roleInfo
    },
    handleContextMenuDelete () {

    },
    handleContextMenu (row) {
      const index = this.data1.findIndex(item => item.name === row.name)
      this.contextLine = index + 1
    },
    roleAsyncOK () {

    },
    asyncOK () {
      let index = this.permissionForm.index
      this.insideTableData[index].permission = this.permissionForm.permission
    },
    getColor (rolename) {
      if (rolename === 'super_admin') {
        return 'primary'
      } else if (rolename === 'admin') {
        return 'success'
      } else if (rolename === 'editor') {
        return 'warning'
      } else {
        return 'default'
      }
    },
    roleTreeShow (index) {
      this.roleModal = true
      this.roleTreeData = this.insideTableData[index].roleInfo
    },
    equalAttr (attr1, attr2) {
      if (attr1.id === attr2.id) {
        return true
      } else {
        return false
      }
    },
    findObjById (attr, id) {
      for (let i = 0; i < attr.length; i++) {
        if (attr[i].id === id) {
          return attr[i]
        }
      }
    },
    suportEdit (item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            'input': val => {
              this.edittingText = val
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              this.$emit('input', this.value)
              this.$emit('on-save-edit', Object.assign(params, { value: this.edittingText }))
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    setDefaultSearchKey () {
      this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    },
    handleClear (e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    handleSearch () {
      this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
    },
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    deleteSelection () {
      deleteRole(this.selectItems).then(
        res => {
          console.log(res.data)
          if (res.data.status === 200) {
            this.$Message.info(res.data.roleName.join(',') + '删除成功')
          } else {
            this.$Message.error('服务器发生错误，未能删除成功，请稍后再试')
          }
        }
      ).catch(e => {
        this.$Message.error('未能删除角色，请稍后再试:' + e)
      })
    },
    onSelect (selection, row) {
      console.log('test')
      this.selectItems = selection
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      console.log('onselectchancel')
      this.selectItems = selection
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      console.log('onselectall')
      this.selectItems = selection
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      console.log('onselectchange')
      this.selectItems = selection
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.roleTreeShow(index)
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    }
  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData()
      if (this.searchable) this.handleSearch()
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
  }
}
</script>
