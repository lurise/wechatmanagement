<template>
  <Row>
    <Col span="6">
      <Card style="width: 275px;height: 275px" @mouseover.native="onMouseOver(0)" @mouseleave.native="onMouseleave(0)">
        <p slot="title" style="size: 50px;">标准模板</p>
        <p>“ 引言部分，总领全篇文章的中心内容。”</p>
        <p>正文内容从这里开始（可直接省略，亦可配图说明）。</p>

        <p slot="extra">
          <template v-if="mouseOver[0].show">
            <Poptip trigger="hover" placement="bottom" content="编辑" style="text-align: center" width="50px"
                    @click.native="editContent(0)">
              <Icon type="ios-create-outline" size="24"/>
            </Poptip>
            <Poptip trigger="hover" placement="bottom" confirm
                    title="删除后不会影响已群发的图文消息，确定删除该模版？"
                    @on-ok="ok"
                    @on-cancel="cancel">
              <Icon type="md-trash" size="24"/>
            </Poptip>
          </template>
        </p>
      </Card>
    </Col>
    <Col span="6">
      <Card style="width: 275px;height: 275px" @mouseover.native="onMouseOver(1)" @mouseleave.native="onMouseleave(1)">
        <p slot="title" style="size: 50px;">标准模板</p>
        <p>“ 引言部分，总领全篇文章的中心内容。”</p>
        <p>正文内容从这里开始（可直接省略，亦可配图说明）。</p>

        <p slot="extra">
          <template v-if="mouseOver[1].show">
            <Poptip trigger="hover" placement="bottom" content="编辑" style="text-align: center" width="50px"
                    @click.native="editContent(1)">
              <Icon type="ios-create-outline" size="24"/>
            </Poptip>
            <Poptip trigger="hover" placement="bottom" confirm
                    title="删除后不会影响已群发的图文消息，确定删除该模版？"
                    @on-ok="ok"
                    @on-cancel="cancel">
              <Icon type="md-trash" size="24"/>
            </Poptip>
          </template>
        </p>
      </Card>
    </Col>
  </Row>

</template>

<script>
import Tables from '_c/tables'

export default {
  name: 'templist',
  data () {
    return {
      templateLoading: false,
      mouseOver: [
        {
          show: false
        },
        {
          show: false
        }
      ],
      tableData: [],
      columns: [
        {
          tytle: '序号',
          type: 'index'
        },
        {
          tytle: '模板名',
          key: 'template'

        }
      ]
    }
  },
  components: {
    Tables
  },
  methods: {
    onMouseOver (index) {
      this.mouseOver[index].show = true
    },
    onMouseleave (index) {
      this.mouseOver[index].show = false
    },
    ok () {

    },
    cancel () {

    },
    editContent (index) {
      this.$Message.info('正在编辑' + index)
    }
  }
}
</script>

<style scoped>

</style>
