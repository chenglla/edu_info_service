<template>
  <div class="search_detail_info">
    <div class="score_header">
<!--    <div class="score_header" v-if="!showImg && showImg !== ''">-->
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">全文检索</div>
    </div>
    <div class="iconfontList dis">
      <!--    <div class="iconfontList" v-show="showOption">-->
      <i class="iconfont iconshoucang11" @click="gotoOption('collect')"></i>
      <i class="iconfont iconxiazai4" @click="gotoOption('downLoad')"></i>
      <i class="iconfont iconrotateRight" @click="gotoOption('share')"></i>
    </div>
    <div class="add_close">
      <!--      <img src="../assets/img/buton.png" alt="">-->
      <div v-if="!showOption" @click="openOption">
        <i class="iconfont iconaddTodo-nav"></i>
        <!--        <i class="iconfont iconaddTodo-nav" v-show="!showOption" @click="openOption"></i>-->
      </div>
      <i class="iconfont iconhao2" v-show="showOption" @click="closeOption"></i>
    </div>
    <div class="search_content_info" ref="searchContentInfo">
<!--      {{content}}-->
<!--      <div class="search_title">{{content.name.replace("<span>")}}</div>-->
<!--      <div>-->
      <div v-if="Object.keys(searchDetail).length > 0">
        <div class="search_title">{{searchDetail['article']['article_article-title']}}</div>
<!--        <div class="search_title" v-html="content.name.replace('red', 'none')"></div>-->
        <div class="search_author"><span>作者：</span><span v-for="(item, index) in searchDetail['article']['contrib_full-name']" :key="index">{{item}}</span></div>
        <div class="search_keyword"><span>关键词：</span><span v-for="(item, index) in searchDetail['article']['subj-class-kwd_kwd']" :key="index">{{item}}</span></div>
        <div class="search_publishDate"><span>出版日期：</span>{{searchDetail.article.date}}</div>
        <div class="search_summary"><span>摘要：</span>{{searchDetail.article.article_abstract}}</div>
      </div>
    </div>
<!--    <div v-html="content.name">-->
<!--      {{content.name.replace('`<span style="color: red"> `+ searchData + `</span>`', searchData)}}-->
<!--    </div>-->
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {getEachSearch, collectLW} from '@/api/index'
export default {
  data () {
    return {
      showOption: false, // 是否展示一系列操作
      searchDetail: [],
      summary: '随着移动互联网、物联网、５Ｇ通信网等新兴技术的迅猛发展，数以亿计的网络接入点、联网设备以及网络应\n' +
        '用产生的海量数据，给网络故障排查、网络安全保障等带来了极大的挑战，同时也为人们深度挖掘和充分利用网络大\n' +
        '数据的巨大价值带来了机遇。大数据分析可以处理海量数据，并从中抽取有价值的潜在知识，帮助决策者发现隐藏的\n' +
        '关系和模式，近年来引起了学术界和工业界的广泛关注。文中围绕大数据分析技术应用于网络领域的最新研究成果，\n' +
        '首先阐述了网络大数据的概念、分类和数据分析方法；然后从无线网络、ＳＤＮ网络、光纤网络和网络安全４个层面着\n' +
        '重介绍了大数据分析技术在故障检测、流量监控、网络优化、流量预测、ＡＰＴ攻击检测、网络异常检测等网络领域中的\n' +
        '解决方案，重点分析和归纳了这些解决方案中大数据分析技术的思路；接着回顾了大数据分析技术在工业界中应用的\n' +
        '情况；在此基础上，给出了基于大数据分析的网络设计周期；最后总结了大数据分析技术在网络领域中面临的机遇和\n' +
        '挑战，并指出下一步需要关注的研究方向。',
      searchScroll: null,
    }
  },
  computed: {
    uuid () {
      return this.$route.query.uuid
    },
    showImg () {
      return this.$store.state.infoService.showImg
    },
    searchData () {
      return this.$store.state.infoService.searchData
    },
    openid () {
      return this.$store.state.infoService.openid
    }
  },
  mounted () {
    // this.init()
    this.getEachSearch()
    // this.collectOriginLW()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.searchScroll = new BScroll(this.$refs.searchContentInfo, {
          click: true
        })
      })
    },
    returnBack () {
      console.log(this.showImg, this.searchData)
      this.$router.go(-1)
      // this.$router.push({path: '/home'})
    },
    gotoOption (val) {
      if (val === 'collect') {
        this.collectReport()
      }
    },
    collectReport () {
      collectLW({
        uuid: this.uuid,
        openid: this.openid
      }).then(res => {
        if (res.data.errno === 0) {
          var collect = document.querySelector('.iconshoucang11')
          collect.style.color = 'red'
          // this.showCollect = true
        }
        console.log('没', res.data)
      })
    },
    // collectOriginLW () {
    //   collectLW({
    //     uuid: this.uuid,
    //     openid: this.openid
    //   }).then(res => {
    //     if (res.data.errno !== 0) {
    //       var collect = document.querySelector('.iconshoucang11')
    //       collect.style.color = 'red'
    //       // this.showCollect = true
    //     }
    //     console.log('有', res.data)
    //   })
    // },
    getEachSearch () { // 获取论文详情信息
      getEachSearch({
        uuid: this.uuid,
        openid: this.openid
      }).then(res => {
        if (res.data.errno === 0) {
          this.searchDetail = res.data.article
          this.init()
          console.log(this.searchDetail.favorite_status === 'true')
          if (this.searchDetail.favorite_status === 'true') {
            console.log(1111111)
            var shouC = document.querySelector('.iconshoucang11')
            console.log(shouC)
            shouC.style.color = 'red'
            // shouC.unbind('click')
          }
        }
        console.log('论文详情：', res.data)
      })
    },
    openOption () { // 点击加号出现一系列操作
      // console.log(111111111111)
      this.showOption = true
      var icon = document.querySelector('.iconfontList')
      // icon.style.display = 'block'
      // icon.removeAttribute('display')
      icon.className = 'iconfontList trans'
    },
    closeOption () {
      this.showOption = false
      var icon = document.querySelector('.iconfontList')
      // icon.style.display = 'none'
      // icon.removeAttribute('display')
      icon.className = 'iconfontList disappear'
    }
  }
}
</script>
<style scoped lang="scss">
  .search_detail_info {
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
  .search_content_info {
    padding: 15px 20px 25px;
    background-color: #fff;
    margin-top: 5px;
    overflow: hidden;
    height: calc(100% - 140px);
  }
  .search_title {
    margin-top: 10px;
  }
  .search_author, .search_keyword, .search_publishDate, .search_summary {
    margin: 5px 0;
    font-size: 13px;
    color: #3c3c3c;
    line-height: 24px;
    span:first-child {
      color: #9c9c9c;
      padding-left: 0;
    }
    span {
      padding: 0 3px;
    }
  }
  .search_summary {
    padding-bottom: 30px;
  }
  .add_close {
    .iconfont{
      z-index: 10;
      position: fixed;
      right: 15px;
      color: #fff;
      background-color: rgb(0, 115, 231);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      text-align: center;
      box-shadow: 0 0 3px 3px rgba(0, 115, 231, 0.3);
    }
    .iconhao2 {
      top: 77%;
      font-size: 29px;
      z-index: 10;
    }
  }
  .iconaddTodo-nav {
    top: 77%;
    font-size: 29px;
    z-index: 10;
  }
  .trans {
    opacity: 1;
    /*animation: icon 5s linear;*/
    /*transition: all 5s linear;*/
    transition: opacity 1s;
  }
  .disappear {
    opacity: 0;
    transition: opacity 1s;
    /*filter: Alpha(opacity=0)*/
  }
  .dis {
    opacity: 0;
    /*transition: opacity 1s;*/
    /*display: none;*/
  }
  .iconfontList {
    /*opacity: 0;*/
    .iconfont{
      z-index: 19;
      position: fixed;
      right: 20px;
      font-size: 18px;
      color: #fff;
      background-color: rgb(0, 115, 231);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      box-shadow: 0 0 3px 3px rgba(0, 115, 231, 0.3);
      /*transition: all 2s linear;*/
      /*position: relative;*/
    }
    /*div {*/
    /*  */
    /*}*/
  }
  .iconshoucang11 {
    /*position: fixed;*/
    top: 52%;
    /*font-size: 18px;*/
    /*box-shadow: 1px 1px 1px 2px rgb(0, 115, 231);*/
    /*color: #CC3333;*/
    /*color: #CC3636;*/
  }
  .iconxiazai4 {
    top: 60%;
    /*font-size: 18px;*/
    /*color: #009999;*/
    /*color: #38B5E2;*/
  }
  .iconrotateRight {
    top: 68%;
    /*font-size: 18px;*/
    /*color: #FFCC00;*/
    /*color: #ffbe00;*/
  }
  .iconjiahao {
    top: 76%;
    font-size: 35px;
    color: rgb(0, 115, 231);
  }
</style>
