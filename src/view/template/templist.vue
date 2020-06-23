<template>
  <Row style="padding: 20px">
    <Col span="6" v-for="(item,index) in tempData" :key="index">
      <Card
        style="width:275px;height:275px;padding:20px"
        :shadow="true"
        @mouseover.native="onMouseOver(index)"
        @mouseleave.native="onMouseleave(index)">
        <p slot="title" style="size: 50px;">{{item.tytle}}</p>
        <p v-html="item.content"></p>
        <p slot="extra">
          <template v-if="mouseOver[index].show">
            <Tooltip content="编辑" placement="top">
              <Icon type="ios-create-outline" size="24" @click="editContent(index)"/>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Poptip trigger="hover" placement="bottom" confirm
                      title="删除后不会影响已群发的图文消息，确定删除该模版？"
                      @on-ok="ok(index)"
                      @on-cancel="cancel(index)">
                <Icon type="md-trash" size="24"/>
              </Poptip>
            </Tooltip>
          </template>
        </p>
      </Card>
    </Col>
    <!--    <Col span="8">-->
    <!--      <Card-->
    <!--        style="width: 275px;height: 275px;padding: 20px"-->
    <!--        :shadow="true"-->
    <!--        @mouseover.native="onMouseOver(3)"-->
    <!--        @mouseleave.native="onMouseleave(3)">-->
    <!--        <p slot="title" style="size: 50px;">测试</p>-->
    <!--        &lt;!&ndash;          {{item.content}}&ndash;&gt;-->
    <!--        <p>test</p>-->
    <!--        <p slot="extra">-->
    <!--          <template v-if="mouseOver[1].show">-->
    <!--            <Poptip trigger="hover" placement="bottom" content="编辑" style="text-align: center" width="50px"-->
    <!--                    @click.native="editContent(1)" popper-class="edit-poppip">-->
    <!--              <Icon type="ios-create-outline" size="24"/>-->
    <!--            </Poptip>-->
    <!--            <Poptip trigger="hover" placement="bottom" confirm-->
    <!--                    title="删除后不会影响已群发的图文消息，确定删除该模版？"-->
    <!--                    @on-ok="ok(1)"-->
    <!--                    @on-cancel="cancel(1)" popper-class="delete-poppip">-->
    <!--              <Icon type="md-trash" size="24"/>-->
    <!--            </Poptip>-->
    <!--          </template>-->
    <!--        </p>-->
    <!--      </Card>-->
    <!--    </Col>-->
  </Row>

</template>

<script>
import Tables from '_c/tables'
import { getTemlData } from '../../api/data'

export default {
  name: 'templist',
  data () {
    return {
      templateLoading: false,
      tempData: [],
      mouseOver: []
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
    ok (index) {

    },
    cancel (index) {

    },
    editContent (index) {
      this.$Message.info('正在编辑' + index)
    }
  },
  mounted () {
    getTemlData().then(req => {
      this.tempData = req.data
      for (let i = 0; i < this.tempData.length; i++) {
        let obj = { show: false }
        this.mouseOver.push(obj)
      }
    })
  }
}
</script>

<style scoped>

  .ivu-icon-ios-create-outline {
    cursor: pointer;
  }

  .ivu-icon-md-trash {
    cursor: pointer;
  }

</style>
