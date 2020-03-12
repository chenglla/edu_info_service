<template>
  <div class="four_info">
    <div class="title">
<!--      <i class="iconfont iconsousuo"></i>-->
      共搜到{{searchResult.total}}条记录
    </div>
    <div class="content" ref="content">
      <div v-for="(item, index) in searchResult.list" :key="index" class="con_info" @click="gotoDetail(item)">
        <div class="content_left">
          <i class="iconfont iconpdf"></i>
          <img src="../assets/img/lw_1.png" alt="" class="con_left_img">
        </div>
        <div class="content_right">
<!--          <div class="con_right_title">{{item.date}}</div>-->
<!--          <div class="con_right_title">{{item.article_date}}</div>-->
<!--          <div class="con_right_title">{{item.article_article-title_cn}}</div>-->
          <div class="con_right_title">{{item['article_article-title']}}</div>
<!--          <div class="con_right_title">{{item.article_article-title}}</div>-->
          <div class="con_right_author"><span v-for="(i, key) in item['contrib_full-name']" :key="key">{{i}}</span></div>
          <div class="con_right_journal">期刊：{{item['source_source-title_cn']}}</div>
          <div class="con_right_option">
            <span><i class="iconfont iconshoucang"></i>收藏</span>
            <span><i class="iconfont iconxiazai1"></i>下载</span>
            <span><i class="iconfont iconfenxiang"></i>分享</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {searchAll} from '@/api/index'
import bus from '@/utils/vueBus'
export default {
  data () {
    return {
      // searchData: '',
      searchResult: [], // 搜索结果
      historyScroll: null,
      historyList: [{
        name: '类人型人工智能实体的刑事责任主体资格审视',
        src: require('../assets/img/lw_1.png'),
        author: '王耀彬',
        journal: '软件学报'
      }, {
        name: '美第五代战机将获得控制无人机的人工智能',
        src: require('../assets/img/lw_2.png'),
        author: '李洪兴',
        journal: '软件学报'
      }, {
        name: '搜狗王小川：以语言为核心布局人工智能',
        src: require('../assets/img/lw_3.png'),
        author: '黄海峰',
        journal: '软件学报'
      }, {
        name: '一种配网故障人工智能分析方法的研究',
        src: require('../assets/img/lw_4.png'),
        author: '黄园芳',
        journal: '软件学报'
      }, {
        name: '类人型人工智能实体的刑事责任主体资格审视',
        src: require('../assets/img/lw_1.png'),
        author: '王耀彬',
        journal: '软件学报'
      }, {
        name: '美第五代战机将获得控制无人机的人工智能',
        src: require('../assets/img/lw_3.png'),
        author: '王耀彬',
        journal: '软件学报'
      }, {
        name: '类人型人工智能实体的刑事责任主体资格审视',
        src: require('../assets/img/lw_4.png'),
        author: '王耀彬',
        journal: '软件学报'
      }, {
        name: '搜狗王小川：以语言为核心布局人工智能',
        src: require('../assets/img/lw_2.png'),
        author: '王耀彬',
        journal: '软件学报'
      }, {
        name: '类人型人工智能实体的刑事责任主体资格审视',
        src: require('../assets/img/lw_1.png'),
        author: '王耀彬',
        journal: '软件学报'
      }, {
        name: '美第五代战机将获得控制无人机的人工智能',
        src: require('../assets/img/lw_4.png'),
        author: '王耀彬',
        journal: '软件学报'
      }]
    }
  },
  computed: {
    showImg () {
      return this.$store.state.infoService.showImg
    },
    searchContent () {
      // console.log('变了么：', this.$store.state.infoService.searchData)
      return this.$store.state.infoService.searchData
    },
    openid () {
      return this.$store.state.infoService.openid
    }
  },
  watch: {
    searchContent (newVal, oldVal) {
      console.log('变化：', newVal, oldVal)
      if (this.searchContent !== '') {
        this.getSearchResult()
      }
    }
  },
  // created () {
  //   let that = this
  //   // bus.$on('searchData', (data) => {
  //   //   that.searchData = data
  //   //   console.log('hehheh', that.searchData)
  //   //   that.getSearchResult()
  //   // })
  //
  //   // bus.$off('searchData') // 先解绑，不然会多次出发
  //   bus.$on('searchData', (data) => {
  //     that.searchData = data
  //     console.log('hehheh', that.searchData)
  //     // that.getSearchResult()
  //   })
  //   // this.getSearchData()
  // },
  mounted () {
    // this.init()
    this.getSearchResult()
    // this.$router.afterEach((to, from, next) => {
    //   window.scrollTo(0, 0)
    // })
  },
  // 在B组件页面中添加以下语句，在组件beforeDestory的时候销毁。
  // destroyed () {
  //   bus.$off('searchData')
  // },
  methods: {
    init () {
      this.$nextTick(() => {
        this.historyScroll = new BScroll(this.$refs.content, {
          click: true
        })
      })
    },
    getSearchData () {
      // let that = this
      // bus.$on('searchData', (data) => {
      //   that.searchData = data
      //   console.log('hehheh', that.searchData)
      //   that.getSearchResult()
      // })
    },
    gotoDetail (val) { // 跳转到论文详情
      this.$router.push({
        path: '/searchDetail',
        query: {
          uuid: val.uuid
        }
      })
    },
    getSearchResult () { // 找到搜索词，进行高亮显示
      searchAll({
        words: this.searchContent,
        // from: 3,
        openid: this.openid
      }).then(res => {
        // console.log(res.data)
        this.searchResult = res.data.data
        console.log('搜索词：', this.searchContent)
        console.log('搜索词：', this.searchResult)
      })
      // for (const i in this.historyList) {
      //   if (this.historyList[i].name.indexOf(this.searchData) > -1) {
      //     // const a = this.historyList[i].name
      //     // console.log('1111111', a)
      //     // a.replace(this.searchData, '333333')
      //     // const b = '呵呵呵呵哈哈哈哈哈哈黑'
      //     // const c = b.replace('黑', '345')
      //     // console.log(c)
      //     // // a.replace(this.searchData, '<span style="color: red">' + this.searchData + '</span>')
      //     // console.log('222222222222', a)
      //     // this.historyList[i].name = a
      //     this.historyList[i].name = this.historyList[i].name.replace(this.searchData, '<span style="color: red">' + this.searchData + '</span>')
      //     // console.log('改变了么', a)
      //     // console.log('改变了么', this.historyList[i].name)
      //   }
      // }
    },
  }
}
</script>
<style scoped lang="scss">
  .four_info {
    /*height: 100%;*/
    background-color: #fff;
    margin-top: 20px;
    padding: 10px 20px 35px;
    .title {
      padding-bottom: 3px;
      border-bottom: 1px solid #ececec;
      color: #9c9c9c;
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
    /*overflow: hidden;*/
    /*padding: 10px 0;*/
    /*height: calc(100% - 100px);*/
    margin-top: 10px;
    .content_left, .content_right {
      display: inline-block;
      /*width: 40%;*/
      position: relative;
    }
  }
  .content_left {
    width: 30%;
    .iconfont {
      position: absolute;
      z-index: 1;
      top: 74%;
      left: 68%;
      color: #CC3636;
      font-size: 20px;
    }
  }
  .content_right {
    width: 65%;
  }
  .con_right_title {
    position: absolute;
    top: -118px;
    color: #44BF87;
    white-space: nowrap; // 强制一行显示
    width: 100%;
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 超出部分显示省略号
  }
  .con_right_author {
    position: absolute;
    top: -88px;
    font-size: 13px;
    color: #9c9c9c;
    span {
      padding: 0 3px;
    }
    span:first-child {
      padding-left: 0;
    }
  }
  .con_right_journal {
    position: absolute;
    top: -45px;
    color: #3c3c3c;
    font-size: 15px;
  }
  .con_right_option {
    position: absolute;
    top: -20px;
    font-size: 13px;
    color: #9c9c9c;
    span {
      margin-right: 18px;
      .iconfont {
        margin-right: 5px;
      }
    }
  }
  .con_info {
    padding: 10px 0;
    border-bottom: 1px solid #ececec;
    background-color: #fff;
    .con_left_img {
      width: 90%;
    }
  }
</style>
