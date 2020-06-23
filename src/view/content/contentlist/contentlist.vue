<template>
  <List item-layout="vertical" style="padding-left:30px;padding-top: 40px;padding-right: 200px">
    <ListItem v-for="(item,index) in data" :key="item.title" @mouseover.native="onMouseOver(index)"
              @mouseleave.native="onMouseLeave(index)">
      <ListItemMeta :title="item.title"/>
      {{ item.content }}
      <template slot="action">
        <li>
          <p>更新时间</p>
        </li>
        <li>
          <p>2020年6月23日</p>
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
</template>

<script>
export default {
  name: 'contentlist',
  data () {
    return {
      mouseOver: [{
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
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 2',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        }
      ]

    }
  },
  methods: {
    onMouseOver (index) {
      this.mouseOver[index].show = true
    },
    onMouseLeave (index) {
      this.mouseOver[index].show = false
    },
    ok (index) {
      this.$Message.info('正在删除' + index)
    },
    cancel (index) {

    },
    editContent (index) {
      this.$Message.info('正在编辑' + index)
    }
  }
}
</script>

<style scoped>

</style>
