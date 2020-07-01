<template>
  <div>
    <div class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in options" :value="item" :key="`search-col-${item}`">
          {{ item }}
        </Option>
      </Select>
      <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search"/>&nbsp;&nbsp;搜索
      </Button>
    </div>
    <Scroll ref="Scroll" :on-reach-bottom="handleReachBottom" height="600">
      <List item-layout="vertical" style="padding-left:30px;padding-top: 40px;padding-right: 200px"
            :loading="listLoading">
        <ListItem v-for="(item,index) in data" :key="item.title" @mouseover.native="onMouseOver(index)"
                  @mouseleave.native="onMouseLeave(index)">
          <ListItemMeta :title="item.title"/>
          <p v-html="item.content" class="itemContent"></p>
          <template slot="action">
            <li>
              <p>更新时间</p>
            </li>
            <li>
              <p>{{item.updateDate}}</p>
            </li>
            <li>
              <p>{{item.catgory}}</p>
            </li>
            <li>
              <p>敏感词数量</p>
            </li>
            <li>
              <p style="color: red">{{item.tabooCount}}</p>
            </li>

            <ul style="padding-top: 10px" v-if="mouseOver[index].show">
              <li>
                <Tooltip content="编辑">
                  <Icon class="-item-action" type="ios-create-outline" size="24" @click="editContent(index)"/>
                </Tooltip>
                <Tooltip content="删除">
                  <Poptip trigger="hover" placement="bottom" confirm
                          title="该操作将删除图文消息，确定删除该图文？"
                          @on-ok="ok(index)"
                          @on-cancel="cancel(index)">
                    <Icon class="-item-action" type="md-trash" size="24" style="padding-left: 10px"/>
                  </Poptip>
                </Tooltip>
              </li>
            </ul>
          </template>
          <template slot="extra">
            <img :src="item.coverImg" style="width: 280px">
          </template>
        </ListItem>
      </List>
    </Scroll>
    <Button type="primary" @click="loadMore">加载更多</Button>
    <Button type="primary" @click="createNewContent"> 新建内容</Button>
    <Modal v-model="editModal" width="1000"
           @on-ok="contentCreateAsyncOK" title="创建新内容">
      <create-form :content-create-form-item="formItem"></create-form>
    </Modal>
  </div>
</template>

<script>
  import {deleteContent, getContentData} from "../../../api/data";
  import CreateForm from "./contentCreateForm"

  export default {
    name: 'contentlist',
    data() {
      return {
        formItem: {
          title:'',
          category:'',
          content: ''
        },
        editModal: false,
        listLoading: false,
        searchKey: '',
        options: ['标题', '内容'],
        searchValue: '',
        mouseOver: [],
        data: [],
        currentPage: 1,
        totalCount: 0
      }
    },
    components: {
      CreateForm
    },
    methods: {
      onMouseOver(index) {
        this.mouseOver[index].show = true
      },
      onMouseLeave(index) {
        this.mouseOver[index].show = false
      },
      ok(index) {
        this.listLoading = true;
        this.$Message.info('正在删除' + this.data[index].title)
        let item = this.data[index]
        deleteContent(item).then(
          res => {
            console.log(res.data.status)
            if (res.data.status === 200) {
              this.$Message.info(this.data[index].title + " 删除成功！");
              this.data = this.data.filter((t, i) => i !== index);
            } else {
              this.$Message.error(this.data[index].title + " 删除失败，请稍后再试。")
            }
            this.listLoading = false;
          }
        )
      },
      cancel(index) {
        console.log("Cancel delete.")
      },
      editContent(index) {
        this.$Message.info('正在编辑' + index)
      },
      handleClear(e) {
        if (e.target.value === '') this.insideTableData = this.value
      },
      handleSearch() {
        console.log('handle search')
      },
      contentCreateAsyncOK() {

      },
      handleReachBottom() {
        return new Promise(resolve => {
          this.currentPage += 1;
          getContentData(this.currentPage, 10).then(
            res => {
              if (this.data.length === res.data.totalCount) {
                this.$Message.info("已加载完全部数据")
              } else if (res.data.contentList.length > 0) {
                this.totalCount = res.data.totalCount;
                this.data.push(...res.data.contentList);
                for (let i = 0; i < res.data.contentList.length; i++) {
                  this.mouseOver.push({show: true})
                }
              } else {
                this.totalCount = res.data.totalCount;
              }
            }
          )
          resolve();
        })
      },
      loadMore() {
        this.listLoading = true;
        this.currentPage += 1;
        getContentData(this.currentPage, 10).then(
          res => {
            if (res.data.totalCount === this.data.length) {
              this.totalCount = res.data.totalCount
              this.$Message.info("已加载完全部数据")
            } else if (res.data.contentList.length > 0) {
              this.totalCount = res.data.totalCount;
              this.data.push(...res.data.contentList);
              for (let i = 0; i < res.data.contentList.length; i++) {
                this.mouseOver.push({show: false})
              }
            } else {
              this.totalCount = res.data.totalCount;
            }
            this.listLoading = false;
          }
        )

      },
      createNewContent() {
        this.editModal = true;
      }
    },
    mounted() {
      this.listLoading=true;
      getContentData(this.currentPage, 10).then(
        res => {
          this.data = res.data.contentList;
          this.totalCount = res.data.totalCount;
          for (let i = 0; i < this.data.length; i++) {
            this.mouseOver.push({show: false})
          }
          this.listLoading=false;
        }
      )
    }
  }
</script>

<style lang="less" scoped>
  .search-con {
    padding: 10px 0;

    .search {
      &-col {
        display: inline-block;
        width: 200px;
      }

      &-input {
        display: inline-block;
        width: 200px;
        margin-left: 2px;
      }

      &-btn {
        margin-left: 2px;
      }
    }
  }

  .btns {
    margin: auto 20px 10px auto;
  }

  .itemContent {
    width: 1000px;
    display: block;
    text-overflow: ellipsis; /*超出内容用省略号*/
    overflow: hidden; /*内容超出后隐藏*/
    white-space: nowrap; /*文本不进行换行*/
    height: 20px;
    /*white-space: pre-line;*/
  }

  .-item-action {
    cursor: pointer;
  }
</style>
