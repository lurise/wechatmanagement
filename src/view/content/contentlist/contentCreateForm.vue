<template>
  <Form :model="contentCreateFormItem" :label-width="80">
    <FormItem label="标题">
      <Input v-model="contentCreateFormItem.title" disabled placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem label="类别">
      <Select v-model="contentCreateFormItem.category" multiple>
        <Option v-for="item in Roles" :key="item.value" :value="item.value">{{item.label}}</Option>
        <Option value="a">类型一</Option>
        <Option value="b">类型二</Option>
        <Option value="c">类型三</Option>
        <Option value="d">类型四</Option>
        <Option value="e">类型五</Option>
        <Option value="f">类型六</Option>
      </Select>
    </FormItem>
    <FormItem label="内容">

    </FormItem>
  </Form>
</template>

<script>
    export default {
        name: "contentCreateForm",
      props:{
        contentCreateFormItem:{
          title:'',
          category:'',
          content:''
        }
      }
    }
</script>

<style scoped>

</style>
