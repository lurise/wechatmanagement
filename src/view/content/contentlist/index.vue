<template>
  <Card>
    <tables ref="tables" editable searchable search-place="top" v-model="contentlist" :columns="columns"></tables>
  </Card>
</template>

<script>
  import Tables from '_c/tables'

  export default {
    name: "index",
    components: {
      Tables
    },
    data() {
      return {
        columns: [
          {title: '序号', key: 'id', sortable: true},
          {title: '标题', key: 'title'},
          {title: '所属类别', key: 'category'},
          {
            title: '操作',
            slot: 'content_edit',
            width: 150,
            align: 'center'
          }
        ],
        contentlist: [
          {
            id: 1,
            title: '内容测试',
            category: '类型1',
            content: '123'
          },
          {
            id: 2,
            title: '内容测试2',
            category: '类型2',
            content: '456'
          },
          {
            id: 3,
            title: '内容测试3',
            category: '类型4',
            content: '789'
          },
          {
            id: 4,
            title: '内容测试5',
            category: '类型5',
            content: 'abc'
          },
          {
            id: 5,
            title: '内容测试6',
            category: '类型6',
            content: 'def'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
