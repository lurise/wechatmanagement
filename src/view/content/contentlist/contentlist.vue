<template>
  <div>
    <Card>
      <tables
        ref="tables"
        :editable="editable"
        :searchable="searchable"
        :border="border"
        :loading="dataLoading"
        :height="400"
        search-place="top"
        v-model="contentlist"
        :columns="columns">
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
  </div>
</template>

<script>
  import Tables from "_c/tables/tables"
  import {getContentData} from '@/api/data'
  import Editor from '_c/editor'

  export default {
    name: "contentlist",
    components: {
      Tables,
      Editor
    },
    data() {
      return {
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
          // {title: '序号', key: 'id', sortable: true},
          {
            type: 'index', align: 'center'
            , width: 80
          },
          {
            title: '标题', key: 'title', sortable: true,
            width: 200,
            align: 'center'
          },
          {
            title: '所属类别', key: 'category', sortable: true,
            width: 150,
            align: 'center'
          },
          {
            title: '内容',
            key: 'content',
            sortable: true,
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
          this.page.total = res.data.total;
          this.contentlist = res.data.contentlist;
          this.dataLoading = false;
        })
      },
      changePageSize(i) {
        this.dataLoading = true
        this.page.size = i
        getContentData(this.page.index, this.page.size).then(res => {
          this.page.total = res.data.total;
          this.contentlist = res.data.contentlist;
          this.dataLoading = false;
        })
      }
    },
    mounted() {
      this.dataLoading = true
      getContentData(this.page.index, this.page.size).then(
        res => {
          this.page.total = res.data.total;
          this.contentlist = res.data.contentlist;
          this.dataLoading = false;
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
    float: right;
    margin-right: 100px;
  }
</style>
