<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              @on-delete="handleDelete"/>
    </Card>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import {getUserData} from '@/api/data'

  export default {
    name: "permission",
    components: {
      Tables
    },
    data() {
      return {
        columns: [
          {title: '姓名', key: 'name', sortable: true},
          {title: '微信号', key: 'wechatname'},
          {title: '权限', key: 'permission'}
        ],
        tableData: []
      }
    },
    mounted() {
      getUserData().then(res => {
        this.tableData = res.data
      })
    },
    methods:{
      handleDelete(){
        console.log("delete")
      }
    }
  }
</script>

<style scoped>

</style>
