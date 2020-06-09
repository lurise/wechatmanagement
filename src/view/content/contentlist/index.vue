<template>
  <div>
    <Card>
      <content-table
        ref="tables"
        :editable="editable"
        :searchable="searchable"
        :border="border"
        :loading="dataLoading"
        search-place="top"
        v-model="contentlist"
        :columns="columns">
        <template slot="newContentCreate">
          <Button @click="handleCreate" class="create-btn" type="primary">
            <Icon type=""/>
            新建
          </Button>
        </template>
      </content-table>
      <div class="page">
        <Page
          :total="page.total"
          prev-text="上一页"
          next-text="下一页"
          class="content-page"
          show-sizer="true"
          @on-change="changePage"
          @on-page-size-change="changePageSize"/>
      </div>
    </Card>
  </div>
</template>

<script>
import ContentTable from '_c/tables/contentTable'
import { getContentData } from '../../../api/data'

export default {
  name: 'index',
  components: {
    ContentTable
  },
  data () {
    return {
      page: {
        index: 1,
        size: 10,
        total: 15
      },
      editable: true,
      searchable: true,
      border: true,
      dataLoading: false,
      columns: [
        { title: '序号', key: 'id', sortable: true, fixed: 'left' },
        { title: '标题', key: 'title' },
        { title: '所属类别', key: 'category' },
        {
          title: '操作',
          slot: 'content_edit',
          fixed: 'right',
          width: 150,
          align: 'center'
        }
      ],
      contentlist: []
    }
  },
  methods: {
    handleCreate () {
      console.log('new content create')
    },
    showSlot () {
      this.contentCreateModal = true
    },
    changePage (i) {
      this.dataLoading = true

      this.page.index = i
      getContentData(this.page.index, this.page.size).then(res => {
        this.contentlist = res.data
        this.dataLoading = false
      })
    },
    changePageSize (i) {
      this.dataLoading = true
      this.page.size = i
      getContentData(this.page.index, this.page.size).then(res => {
        this.contentlist = res.data
        this.dataLoading = false
      })
    }
  },
  mounted () {
    this.dataLoading = true
    getContentData(this.page.index, this.page.size).then(
      res => {
        this.contentlist = res.data
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
    float: right;
    margin-right: 100px;
  }
</style>
