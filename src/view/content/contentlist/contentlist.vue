<template>
  <div>
    <Card>
      <tables
        ref="tables"
        :editable="editable"
        :searchable="searchable"
        :border="border"
        :loading="dataLoading"
        :height="700"
        search-place="top"
        v-model="contentlist"
        :columns="columns"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectALl"
        @on-select-change="onSelectChange"
      >
        <template slot="header">
          <Button type="primary" @click="createNewContent" class="create-btn">新建内容</Button>
          <Button type="error" @click="deleteContent" class="delete-btn">删除内容</Button>
        </template>
      </tables>
      <div class="page">
        <Page
          :total="page.total"
          prev-text="上一页"
          next-text="下一页"
          class="content-page"
          :show-sizer="showsizer"
          @on-change="changePage"
          @on-page-size-change="changePageSize"/>
      </div>
    </Card>
    <Modal v-model="contentModal" title="内容修改" :loading="modalLoading" @on-ok="contentAsyncOK" width="800">
      <editor ref="editor" :value="content" :cache="contentCache"/>
    </Modal>
    <Modal v-model="contentCreateModal" title="创建新内容" :loading="createModalLoading" width="800"
           @on-ok="contentCreateAsyncOK">
      <create-form ref="createForm" :content-create-form-item="formItem"></create-form>
    </Modal>
    <Modal v-model="contentDeleteModal" title="删除内容" :loading="deleteModalLoading" width="500"
           @on-ok="contentDeleteAsyncOK">
      <p>确定删除所选内容么？</p>
    </Modal>
  </div>
</template>

<script>
  import Tables from '_c/tables/tables'
  import {getContentData, postContentCreateData, deleteContent} from '@/api/data'
  import Editor from '_c/editor'
  import CreateForm from "./contentCreateForm";

  export default {
    name: 'contentlist',
    components: {
      Tables,
      Editor,
      CreateForm
    },
    data() {
      return {
        selectItems: [],
        contentDeleteModal: false,
        deleteModalLoading: false,
        createContent: '',
        createContentCache: false,
        formItem: {
          title: '',
          category: '',
          content: '',
          contentTxt: '',
          createTime: ''
        },
        hasCreate: false,
        contentCreateModal: false,
        createModalLoading: false,
        contentIndex: 0,
        contentCache: false,
        content: '',
        contentModal: false,
        modalLoading: false,
        page: {
          index: 1,
          size: 10,
          total: 15
        },
        showsizer: true,
        editable: true,
        searchable: true,
        border: true,
        dataLoading: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          // {title: '序号', key: 'id', sortable: true},
          {
            type: 'index',
            align: 'center',
            width: 80
          },
          {
            title: '标题',
            key: 'title',
            sortable: true,
            width: 200,
            align: 'center'
          },
          {
            title: '所属类别',
            key: 'category',
            sortable: true,
            width: 150,
            align: 'center'
          },
          {
            title: '内容',
            key: 'content',
            ellipsis: true,
            sortable: true
            // width: 200
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.contentEdit(params.index)
                    }
                  }
                }, '编辑内容')
              ])
            }
          }
        ],
        contentlist: []
      }
    },
    methods: {
      onSelect(selection, row) {
        this.selectItems = selection
      },
      onSelectALl(selection, row) {
        this.selectItems = selection
      },
      onSelectCancel(selection, row) {
        this.selectItems = selection
      },
      onSelectChange(selection, row) {
        this.selectItems = selection
      },
      contentCreateAsyncOK() {
        this.dataLoading = true;

        this.formItem.contentTxt = this.$refs.createForm.text()
        this.formItem.content = this.$refs.createForm.html()
        // let date = new Date();
        // this.formItem.createTime = date.format("yyyy-mm-dd");

        postContentCreateData().then(res => {
          if (res.status === 200) {
            this.$Message.info("内容创建成功！")
            this.hasCreate = true;
          } else {
            this.$Message.error("服务端发生异常，请稍后再试")
          }
        }).catch(err =>
          this.$Message.error("内容存储发生异常：" + err)
        )

        getContentData(this.page.index, this.page.size).then(
          res => {
            this.page.total = res.data.total
            this.contentlist = res.data.contentlist
            this.dataLoading = false
          }
        )
      },
      contentDeleteAsyncOK() {
        this.dataLoading = true;
        deleteContent(this.selectItems).then(
          res => {
            if (res.data.status === 200) {
              this.$Message.info("删除成功")
            } else {
              this.$Message.error("服务器发生异常，未能删除成功，请稍后再试。")
            }

            getContentData(this.page.index, this.page.size).then(
              res => {
                this.page.total = res.data.total
                this.contentlist = res.data.contentlist
                this.dataLoading = false
              }
            )
          }
        ).catch(err => {
          this.$Message.error('未能删除内容，请稍后重试：' + err)
          console.log(err)
        })
      },
      createNewContent() {
        this.contentCreateModal = true;
        if (this.hasCreate) {
          this.formItem = {
            title: '',
            category: '',
            content: ''
          }
          this.hasCreate = false;
        }
        this.$refs.createForm.setHtml(this.formItem.content)
        console.log('creating new content...')
      },
      deleteContent() {
        this.contentDeleteModal = true;
      },
      contentAsyncOK() {
        let index = this.contentIndex
        this.contentlist[index].content = this.$refs.editor.html()
      },
      contentEdit(index) {
        this.contentIndex = index
        this.contentModal = true
        this.$refs.editor.setHtml(this.contentlist[index].content)
      },
      handleCreate() {
        console.log('new content create')
      },
      showSlot() {
        this.contentCreateModal = true
      },
      changePage(i) {
        this.dataLoading = true

        this.page.index = i
        getContentData(this.page.index, this.page.size).then(res => {
          this.page.total = res.data.total
          this.contentlist = res.data.contentlist
          this.dataLoading = false
        })
      },
      changePageSize(i) {
        this.dataLoading = true
        this.page.size = i
        getContentData(this.page.index, this.page.size).then(res => {
          this.page.total = res.data.total
          this.contentlist = res.data.contentlist
          this.dataLoading = false
        })
      }
    },
    mounted() {
      this.dataLoading = true
      getContentData(this.page.index, this.page.size).then(
        res => {
          this.page.total = res.data.total
          this.contentlist = res.data.contentlist
          this.dataLoading = false
        }
      )
    }
  }
</script>

<style scoped>
  .content-page {
    float: right;
    /*position: fixed;*/
    margin: 20px 50px;
    right: 50px;
  }

  .page {
    height: 45px;
  }

  .create-btn {
    /*float: left;*/
    margin-left: 10px;

  }

  .delete-btn {
    /*float:right;*/
    margin-left: 10px;
  }
</style>
