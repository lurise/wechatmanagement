<template>
  <Form :model="contentCreateFormItem" :label-width="80">
    <FormItem label="标题">
      <Input v-model="contentCreateFormItem.title" placeholder="请输入内容标题"></Input>
      <!--    <p>标题</p>-->
    </FormItem>
    <FormItem label="类别">
      <Select v-model="contentCreateFormItem.category">
        <!--        <Option v-for="item in Roles" :key="item.value" :value="item.value">{{item.label}}</Option>-->
        <Option value="a">类型一</Option>
        <Option value="b">类型二</Option>
        <Option value="c">类型三</Option>
        <Option value="d">类型四</Option>
        <Option value="e">类型五</Option>
        <Option value="f">类型六</Option>
      </Select>
      <!--      <p>类别</p>-->
    </FormItem>
    <FormItem label="内容">
      <editor
        ref="createEditor"
        v-model="contentCreateFormItem.content"
        :value="contentCreateFormItem.content"
        :cache="createContentCache"/>
    </FormItem>
  </Form>
</template>

<script>
  import Editor from '_c/editor'

  export default {
    components: {
      Editor
    },
    data() {
      return {}
    },
    props: {
      createContentCache: false,
      contentCreateFormItem: {
        title: '',
        category: '',
        content: ''
      }
    },
    mounted() {
    },
    methods: {
      html() {
        return this.$refs.createEditor.html()
      },
      text() {
        return this.$refs.createEditor.text()
      },
      setHtml(val) {
        this.$refs.createEditor.setHtml(val)
      },
      setText(val) {
        this.$refs.createEditor.setText(val)
      }
    }
  }
</script>

<style scoped>

</style>
