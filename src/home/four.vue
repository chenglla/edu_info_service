<template>
  <div class="four_info">
    <div class="title">
<!--      <i class="iconfont iconsousuo"></i>-->
      浏览历史
    </div>
    <div class="content" ref="content">
      <div v-for="(item, index) in historyList" :key="index" class="con_info">
        <div class="con_title">{{item.infotitle}}</div>
<!--        <div class="con_title flag" v-if="item.flag === 1">{{item.infotitle}}</div>-->
        <div class="con_time">{{item.insertTime | formatDate }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getScanHistory} from '@/api/index'
import BScroll from 'better-scroll'
import {formatDate} from '../utils/date.js'
export default {
  data () {
    return {
      historyList: [], // 浏览历史记录
      historyScroll: null,
      // historyList: [{
      //   name: '智能IRTM语义检索系统设计与实现',
      //   time: '3周前',
      //   flag: 0
      // }, {
      //   name: '关于对我校2016年度检索系统收录论文进行核对的通知',
      //   time: '1个月前',
      //   flag: 0
      // }, {
      //   name: '数据时代机构知识库服务创新策略及新动能',
      //   time: '1个月前',
      //   flag: 1
      // }, {
      //   name: '上市公司年报审计意见影响因素实证研究',
      //   time: '3周前',
      //   flag: 0
      // }, {
      //   name: '山西大学学报',
      //   time: '1个月前',
      //   flag: 0
      // }, {
      //   name: 'e线图谱',
      //   time: '3周前',
      //   flag: 0
      // }, {
      //   name: '科研整合检索系统的用途',
      //   time: '3周前',
      //   flag: 0
      // }, {
      //   name: '计算机工程',
      //   time: '3周前',
      //   flag: 0
      // }, {
      //   name: 'Nature',
      //   time: '1个月前',
      //   flag: 0
      // }, {
      //   name: '一种多媒体文件的实时播放方法',
      //   time: '2周前',
      //   flag: 0
      // }]
    }
  },
  computed: {
    openid () {
      return this.$store.state.infoService.openid
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
      // return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted () {
    // this.init()
    this.getScanHistory()
  },
  methods: {
    // init () {
    //   this.$nextTick(() => {
    //     this.historyScroll = new BScroll(this.$refs.content, {
    //       click: true
    //     })
    //   })
    // },
    getScanHistory () {
      getScanHistory({
        openid: this.openid
      }).then(res => {
        if (res.data.errno === 0) {
          this.historyList = res.data.list
        }
        console.log('浏览记录', res.data)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .four_info {
    height: 100%;
    background-color: #fff;
    margin-top: 20px;
    padding: 10px 20px 35px;
    .title {
      font-size: 14px;
      color: #9c9c9c;
      padding-bottom: 3px;
      /*border-bottom: 1px solid #ececec;*/
    }
    .iconsousuo {
      margin-right: 5px;
      color: #3c3c3c;
      font-weight: bold;
    }
  }
  .content {
    position: relative;
    /*background: #fbf9fe;*/
    overflow: hidden;
    /*padding: 10px 0;*/
    height: calc(100% - 100px);
    /*margin-top: 10px;*/
    .flag {
      color: rgb(0, 115, 231);
    }
  }
  .con_info {
    padding: 10px 0;
    /*margin: 7px 0;*/
    border-bottom: 1px solid #ececec;
    .con_title {
      margin-right: 10px;
    }
    .con_time {
      margin-top: 2px;
      font-size: 13px;
      color: #9c9c9c;
    }
  }
</style>
