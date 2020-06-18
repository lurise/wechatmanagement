<template>
  <!--  <div>-->
  <froala :tag="'textarea'" :config="froalaConfig" v-model="froalaContent">test</froala>
  <!--    <Button @click="showHtml">点击</Button>-->
  <!--  </div>-->

</template>


<script>
  import jQuery from 'jquery'
  import VueFroala from 'vue-froala-wysiwyg'

  export default {

    name: 'froala',

    data() {

      return {

        //More -> https://www.froala.com/wysiwyg-editor/docs/options

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

          zIndex: 99999,

          events: {
            'froalaEditor.initialized':
              function () {
                console.log('initialized')
              }
          },
        },
        froalaContent: "",//默认测试文本
      }
    },
    methods: {
      showHtml() {
        alert(this.froalaContent)
      }
    }
  }

</script>
