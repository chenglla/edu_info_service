<template>
  <div class="collect_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">论文收藏</div>
    </div>
    <div class="collect_second" v-show="collectList.length > 0" ref="collectSecond">
      <div>
        <div class="collect_second_item" v-for="(item, index) in collectList" :key="index" @click="gotoDetail(item)">
          <div class="collect_second_item_title">{{item.article_title}}</div>
<!--          <div class="collect_second_item_time">{{item.inserttime | formatDate}}</div>-->
        </div>
      </div>
   </div>
  </div>
</template>
<script>
import {formatDate} from '../utils/date.js'
import {getLWCollectList} from '@/api/index'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      collectList: [],
      collectScroll: null
    }
  },
  computed: {
    openid () {
      return this.$store.state.infoService.openid
    },
  },
  mounted () {
    this.getLWCollectList()
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
      // return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'my'})
    },
    init () {
      this.$nextTick(() => {
        this.collectScroll = new BScroll(this.$refs.collectSecond, {
          click: true
        })
      })
    },
    gotoDetail (val) {
      this.$router.push({
        path: '/searchDetail',
        query: {
          uuid: val.articleid
        }
      })
    },
    getLWCollectList () {
      getLWCollectList({
        openid: this.openid,
        m: 0
      }).then(res => {
        if (res.data.errno === 0) {
          this.collectList = res.data.list
          this.init()
          console.log(this.collectList.length)
        }
        console.log('论文收藏列表：', res.data)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .collect_info {
    height: 100%;
  }
  .score_header {
    text-align: center;
    letter-spacing: 0.2em;
    position: relative;
    font-size: 18px;
    width: 100%;
    background-color: rgb(0, 115, 231);
    color: #fff;
    height: 45px;
    line-height: 45px;
    flex: none;
    z-index: 1;
  }
  .return__icon{
    position: absolute;
    margin-left: 15px;
  }
  .iconfanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  .collect_second {
    /*margin-top: 10%;*/
    height: calc(100% - 52px);
    overflow: hidden;
  }
  .collect_second_item {
    padding: 10px 15px;
    border-bottom: 1px dashed #ececec;
    .collect_second_item_title {
      font-size: 17px;
      color: #3c3c3c;
    }
    .collect_second_item_time {
      color: #9c9c9c;
      margin-top: 5px;
      font-size: 14px;
    }
  }
</style>
