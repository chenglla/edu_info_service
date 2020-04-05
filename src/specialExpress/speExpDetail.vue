<template>
  <div class="search_detail_info">
    <div class="score_header">
      <!--    <div class="score_header" v-if="!showImg && showImg !== ''">-->
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">专题快报</div>
    </div>
    <div class="iconfontList dis">
<!--    <div class="iconfontList" v-show="showOption">-->
        <i class="iconfont iconshoucang11" @click="gotoOption('collect')"></i>
        <i class="iconfont iconxiazai4" @click="gotoOption('downLoad')"></i>
<!--        <i class="iconfont iconrotateRight" @click="gotoOption('share')"></i>-->
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
      <div>
<!--        {{reportDetail.length}}-->
        <div class="detailInfo" v-if=" Object.keys(this.reportDetail).length > 0">
          <div class="search_title">{{reportDetail.report.reportTitle}}</div>
          <div class="search_time">{{reportDetail.report.insertTime | formatDate}}</div>
          <div class="search_info">
            <span>编译者：{{reportDetail.report.author}}</span>
            <!--          <span>发布时间：{{content.time}}</span>-->
            <span>关键词: {{reportDetail.report.keywords}}</span>
            <span>来源栏目: {{reportDetail.report.category}}</span>
          </div>
          <div class="search_author">本期概要</div>
          <!--        <div v-for="(item, index) in speExpDetailList" :key="index" class="search_summary">-->
          <div v-for="(item, index) in reportDetail.paragraph" :key="index" class="search_summary">
            <div class="title">【{{item.paragraphTitle}}】</div>
            <div class="content">{{item.paragraphContent}}</div>
            <!--          <div v-for="(j, inde) in item.content" :key="inde">-->
            <!--            <span>{{j.name}}</span>-->
            <!--            <span>{{j.value}}</span>-->
            <!--          </div>-->
          </div>
          <!--        <div class="search_keyword"><span>关键词：</span>机器学习 神经网络 深度学习 自然语言处理 文本分类</div>-->
          <!--        <div class="search_publishDate"><span>出版日期：</span>2018-10</div>-->
          <!--        <div class="search_summary"><span>摘要：</span>{{summary}}</div>-->
        </div>
      </div>
    </div>
    <!--    <div v-html="content.name">-->
    <!--      {{content.name.replace('`<span style="color: red"> `+ searchData + `</span>`', searchData)}}-->
    <!--    </div>-->
  </div>
</template>
<script>
import {formatDate} from '../utils/date.js'
import BScroll from 'better-scroll'
import wx from 'weixin-js-sdk'
import {getEachReportDetail, collectReport} from '@/api/index'
export default {
  data () {
    return {
      reportDetail: [], // 报告详情
      // showCollect: false, // 是否收藏
      searchScroll: null,
      showOption: false, // 是否展示一系列操作
      speExpDetailList: [{
        title: '机器学习',
        content: [{
          name: '随着移动互联网、物联网、5Ｇ通信网等新兴技术的迅猛发展',
          value: '1'
        }, {
          name: '无线网络、SDN网络、光纤网络和网络安全',
          value: '3'
        }, {
          name: '网络大数据',
          value: '6'
        }]
      }, {
        title: '神经网络',
        content: [{
          name: '大数据分析技术',
          value: '7'
        }, {
          name: '故障检测、流量监控、网络优化',
          value: '9'
        }, {
          name: '流量预测、ＡＰＴ攻击检测、网络异常检测',
          value: '15'
        }]
      }, {
        title: '深度学习',
        content: [{
          name: '学术界和工业界',
          value: '19'
        }, {
          name: '大数据分析技术在网络领域中面临的机遇',
          value: '23'
        }, {
          name: '解决方案中大数据分析技术的思路',
          value: '26'
        }]
      }, {
        title: '文本分类',
        content: [{
          name: '大数据分析技术',
          value: '7'
        }, {
          name: '故障检测、流量监控、网络优化',
          value: '9'
        }, {
          name: '流量预测、ＡＰＴ攻击检测、网络异常检测',
          value: '15'
        }]
      }, {
        title: '自然语言处理',
        content: [{
          name: '大数据分析技术',
          value: '7'
        }, {
          name: '故障检测、流量监控、网络优化',
          value: '9'
        }, {
          name: '流量预测、ＡＰＴ攻击检测、网络异常检测',
          value: '15'
        }]
      }],
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
      // return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  computed: {
    id () {
      // console.log(Object.keys(this.$route.query.item).length)
      // if (Object.keys(this.$route.query.item).length === 15) {
      //   console.log(this.$store.state.infoService.speExpreData)
      //   return this.$store.state.infoService.speExpreData
      // } else {
      //   this.$store.commit('SET_SPE_EXP_DATA', this.$route.query.item)
      //   console.log(this.$store.state.infoService.speExpreData)
      return this.$route.query.item
      // }
    },
    type () {
      return this.$route.query.type
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
    this.init()
    this.getReportDetail()
    // this.collectOriginReport()
    // this.optionI()
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
      if (this.type === 'index' || this.type === 'my') {
        this.$router.go(-1)
      } else if (this.type === 'list') {
        this.$router.push({
          path: '/specialExpress',
          query: {
            type: 2 // 从详情返回
          }
        })
      }
    },
    gotoOption (val) {
      if (val === 'collect') {
        this.collectReport()
      }
    },
    collectReport () {
      collectReport({
        id: this.id,
        openid: this.openid
      }).then(res => {
        if (res.data.errno === 0) {
          var collect = document.querySelector('.iconshoucang11')
          collect.style.color = 'red'
          // this.showCollect = true
        }
        console.log(res.data)
      })
    },
    collectOriginReport () {
      collectReport({
        id: this.id,
        openid: this.openid
      }).then(res => {
        if (res.data.errno !== 0) {
          var collect = document.querySelector('.iconshoucang11')
          collect.style.color = 'red'
          // this.showCollect = true
        }
        console.log(res.data)
      })
    },
    getReportDetail () { // 获取报告详情
      getEachReportDetail({
        openid: this.openid,
        id: this.id
      }).then(res => {
        this.reportDetail = res.data.report
        this.getShareInfo(this.reportDetail.report)
        this.init()
        console.log(this.reportDetail.favorite_status === 'true')
        if (this.reportDetail.favorite_status === 'true') {
          var shouC = document.querySelector('.iconshoucang11')
          // console.log(shouC)
          shouC.style.color = 'red'
          // shouC.unbind('click')
        }
        console.log('报告详情：', res.data)
        // console.log('报告详情：', Object.keys(this.reportDetail).length)
      })
    },
    getShareInfo (item) {
      wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          // wx.updateAppMessageShareData({
          title: item.reportTitle, // 分享标题
          desc: item.reportTitle, // 分享描述
          link: 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/00/9B/rBEFwF5h-kWAXAwmABh-0pHcz1E7185931', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/01/2B/rBEFwF6EpQmARXaIAAAPjHUrsjA1404774', // 分享图标
          success: function () {
            // 设置成功
            console.log('分享成功')
          }
        })
        wx.updateTimelineShareData({
          title: item.reportTitle, // 分享标题
          link: 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/00/9B/rBEFwF5h-kWAXAwmABh-0pHcz1E7185931', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/01/2B/rBEFwF6EpQmARXaIAAAPjHUrsjA1404774', // 分享图标
          success: function () {
            // 设置成功
            console.log('分享成功')
          }
        })
      })
      wx.error(function (res) {
        alert('失败')
      })
    },
    // optionI () {
    //   var a = document.querySelector('.iconaddTodo-nav')
    //   a.addEventListener('click', function (e) {
    //     console.log(222222222222)
    //   })
    // },
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
  .detailInfo {
    padding-bottom: 20px;
  }
  .search_title {
    /*margin-top: 10px;*/
    text-align: center;
    font-size: 22px;
    /*padding-bottom: 3px;*/
    /*border-bottom: 1px solid #ececec;*/
  }
  .search_time {
    margin-top: 8px;
    text-align: left;
  }
  .search_info {
    margin-top: 5px;
    font-size: 12px;
    padding-bottom: 5px;
    border-bottom: 1px solid #66CCFF;
    color: #4c4c4c;
    span {
      margin-right: 5px;
    }
  }
  .search_summary {
    color: #4c4c4c;
    font-size: 13px;
    margin: 10px 5px 10px 0;
    span {
      margin-right: 8px;
    }
    .title {
      margin-bottom: 3px;
    }
    .content {
      text-indent: 2em;
    }
  }
  .search_author {
    margin-top: 5px;
    font-size: 14px;
    color: #3c3c3c;
    line-height: 24px;
    span {
      color: #9c9c9c;
    }
  }
  /*.search_summary {*/
  /*  padding-bottom: 30px;*/
  /*}*/
  .add_close {
    .iconfont{
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
    top: 60%;
    /*top: 52%;*/
  }
  .iconxiazai4 {
    /*top: 60%;*/
    top: 68%;
  }
  .iconrotateRight {
    top: 68%;
  }
  .iconjiahao {
    top: 76%;
    font-size: 35px;
    color: rgb(0, 115, 231);
  }
</style>
