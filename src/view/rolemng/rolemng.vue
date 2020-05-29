<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"></tables>
    </Card>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import {getRoleInfo} from '@/api/data'
  import {getRoles} from "../../api/data";

  export default {
    name: "rolemng",
    components: {
      Tables
    },
    data() {
      return {
        tableData:[],
        columns: [
          {title: '序号', key: 'id'},
          {title: '角色名', key: 'roleName', sortable: true},
          {
            title: '操作',
            slot: 'role_edit',
            width: 150,
            align: 'center'
          }
        ],
      }
    },
    mounted() {
      getRoleInfo().then(
        res=>{
          this.tableData=res.data
        }
      )
    }
  }
</script>

<style scoped>

</style>
