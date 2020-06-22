<template>
  <div @mouseover="testMouseOver">
    <Card style="width: 275px;height: 275px" @mouseOver="testMouseOver">
      <p slot="title" style="size: 50px;">标准模板</p>
      <p>“ 引言部分，总领全篇文章的中心内容。”</p>
      <p>正文内容从这里开始（可直接省略，亦可配图说明）。</p>
      <template v-if="mouseOver">
        <p slot="extra">test1</p>
      </template>
    </Card>
  </div>

</template>

<script>
  import Tables from '_c/tables'

  export default {
    name: "templist",
    data() {
      return {
        templateLoading: false,
        mouseOver: false,
        tableData: [],
        columns: [
          {
            tytle: '序号',
            type: 'index'
          },
          {
            tytle: '模板名',
            key: 'template',

          }
        ]
      }
    },
    components: {
      Tables
    },
    methods: {
      testMouseOver() {
        this.$Message.info("test")
        this.mouseOver=true
      }
    }
  }
</script>

<style scoped>

</style>
