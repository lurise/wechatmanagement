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
<!--      <editor-->
<!--        ref="createEditor"-->
<!--        v-model="contentCreateFormItem.content"-->
<!--        :value="contentCreateFormItem.content"-->
<!--        :cache="createContentCache"/>-->
      <froala :tag="textarea" :config="froalaConfig" v-model="contentCreateFormItem.content"></froala>
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
      return {
        froalaConfig: {
          toolbarButtons: ['undo', 'redo', 'clearFormatting', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize',
            'color', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo',
            'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', '|', 'print', 'spellChecker', 'help',
            '|', 'fullscreen'],


          // theme: "dark",//主题

          placeholder: "请填写内容",
          language: "zh_cn",//国际化

          imageUploadURL: "http://i.froala.com/upload",//上传url

          fileUploadURL: "http://i.froala.com/upload",//上传url 更多上传介绍 请访问https://www.froala.com/wysiwyg-editor/docs/options

          quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr'],//快速插入项

          // toolbarVisibleWithoutSelection: true,//是否开启 不选中模式

          // disableRightClick: true,//是否屏蔽右击

          colorsHEXInput: false,//关闭16进制色值

          toolbarSticky: true,//操作栏是否自动吸顶

          // zIndex: 99999,
          height:400,

          events: {
            'froalaEditor.initialized':
              function () {
                console.log('initialized')
              }
          },
        },
      }
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
