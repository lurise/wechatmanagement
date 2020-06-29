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
    <Scroll ref="Scroll" :on-reach-bottom="handleReachBottom" height="700">
      <List item-layout="vertical" style="padding-left:30px;padding-top: 40px;padding-right: 200px" :loading="listLoading">
        <ListItem v-for="(item,index) in data" :key="item.title" @mouseover.native="onMouseOver(index)"
                  @mouseleave.native="onMouseLeave(index)">
          <ListItemMeta :title="item.title"/>
          <p v-html="item.content" class="itemContent"></p>
          <template slot="action">
            <li>
              <p>更新时间</p>
            </li>
            <li>
              <p>2020年6月23日</p>
            </li>
            <li>
              <p>{{item.catgory}}</p>
            </li>
            <ul style="padding-top: 10px" v-if="mouseOver[index].show">
              <li>
                <Tooltip content="编辑">
                  <Icon type="ios-create-outline" size="24" @click="editContent(index)"/>
                </Tooltip>
                <Tooltip content="删除">
                  <Poptip trigger="hover" placement="bottom" confirm
                          title="该操作将删除图文消息，确定删除该图文？"
                          @on-ok="ok(index)"
                          @on-cancel="cancel(index)">
                    <Icon type="md-trash" size="24" style="padding-left: 10px"/>
                  </Poptip>
                </Tooltip>
              </li>
            </ul>
          </template>
          <template slot="extra">
            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
          </template>
        </ListItem>
      </List>
    </Scroll>
    <Button type="primary" @click="loadMore">加载更多</Button>
  </div>
</template>

<script>
  export default {
    name: 'contentlist',
    data() {
      return {
        listLoading:false,
        searchKey: '',
        options: ['标题', '内容'],
        searchValue: '',
        mouseOver: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        data: [
          {
            title: 'This is title 1',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 2',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 3',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.<br>his is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the con<br>his is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the con<br>his is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the con<br>his is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the content.This is the content, this is the content, this is the content, this is the con',
            catgory:'分类一'
          },
          {
            title: 'This is title 4',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 5',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 6',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 7',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 8',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 9',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 10',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 11',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          },
          {
            title: 'This is title 12',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.',
            catgory:'分类一'
          }
        ]

      }
    },
    methods: {
      onMouseOver(index) {
        this.mouseOver[index].show = true
      },
      onMouseLeave(index) {
        this.mouseOver[index].show = false
      },
      ok(index) {
        this.$Message.info('正在删除' + index)
      },
      cancel(index) {

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
      handleReachBottom() {
        return new Promise(resolve => {
          setTimeout(() => {
            for (let i = 0; i < 10; i++) {
              if (this.data.length > 40) {
                this.$Message.info("已经加载完成全部数据了")
                resolve();
                return
              }
              let content = {
                title: 'This is  added title ' + i,
                description: 'This is description, this is description, this is description.',
                avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                content: 'This is the content, this is the content, this is the content, this is the content.',
                catgory:'分类一'
              }
              this.data.push(content)
              this.mouseOver.push({show: false})
            }

            resolve();
          }, 2000)
        })
      },
      loadMore() {
        this.listLoading = true;
        setTimeout(() => {

          for (let i = 0; i < 10; i++) {
            if (this.data.length > 40) {
              this.$Message.info("已经加载完成全部数据了")
              return
            }
            let content = {
              title: 'This is  added title ' + i,
              description: 'This is description, this is description, this is description.',
              avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
              content: 'This is the content, this is the content, this is the content, this is the content.',
              catgory:'分类一'
            }
            this.data.push(content)
            this.mouseOver.push({show: false})

          }

          this.listLoading = false;
        }, 2000)
      }
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

  .itemContent{
    width: 500px;
    display: block;
    text-overflow: ellipsis;  /*超出内容用省略号*/
    overflow: hidden; /*内容超出后隐藏*/
    white-space: nowrap; /*文本不进行换行*/
    height: 20px;
    /*white-space: pre-line;*/
  }
</style>
