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
<!--      <i class="iconfont iconrotateRight" @click="gotoOption('share')"></i>-->
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
// import { Toast } from 'vux'
import {getEachSearch, collectLW, DownloadArticleList, getDownloadArticleList} from '@/api/index'
import wx from 'weixin-js-sdk'
export default {
  // components: {
  //   Toast
  // },
  data () {
    return {
      showOption: false, // 是否展示一系列操作
      searchDetail: [],
      pdfList: [], // 已经下载过的文件
      existsPdf: [], // 已经下载过的文件里面的某一个属性集合
      // summary: '随着移动互联网、物联网、５Ｇ通信网等新兴技术的迅猛发展，数以亿计的网络接入点、联网设备以及网络应\n' +
      //   '用产生的海量数据，给网络故障排查、网络安全保障等带来了极大的挑战，同时也为人们深度挖掘和充分利用网络大\n' +
      //   '数据的巨大价值带来了机遇。大数据分析可以处理海量数据，并从中抽取有价值的潜在知识，帮助决策者发现隐藏的\n' +
      //   '关系和模式，近年来引起了学术界和工业界的广泛关注。文中围绕大数据分析技术应用于网络领域的最新研究成果，\n' +
      //   '首先阐述了网络大数据的概念、分类和数据分析方法；然后从无线网络、ＳＤＮ网络、光纤网络和网络安全４个层面着\n' +
      //   '重介绍了大数据分析技术在故障检测、流量监控、网络优化、流量预测、ＡＰＴ攻击检测、网络异常检测等网络领域中的\n' +
      //   '解决方案，重点分析和归纳了这些解决方案中大数据分析技术的思路；接着回顾了大数据分析技术在工业界中应用的\n' +
      //   '情况；在此基础上，给出了基于大数据分析的网络设计周期；最后总结了大数据分析技术在网络领域中面临的机遇和\n' +
      //   '挑战，并指出下一步需要关注的研究方向。',
      searchScroll: null
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
  created () {
    // this.init()
    this.getEachSearch()
    this.getDownloadArticleList() // 获取已经库里已经存在的下载文件
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
    getDownloadArticleList () { // 获取下载过的文件
      getDownloadArticleList({
        openid: this.openid,
        m: 0
      }).then(res => {
        this.pdfList = res.data.list
        var that = this
        that.pdfList.map(function (item) {
          // var that = this
          that.existsPdf.push(item.articleid)
        })
        console.log('列表：', that.pdfList)
      })
    },
    gotoOption (val) {
      if (val === 'collect') {
        this.collectReport()
      } else if (val === 'downLoad') {
        this.downLoadArticle()
        // this.downloadWeekly(this.searchDetail['article']['local_access_full-text-link'], this.searchDetail['article']['article_article-title'], this.searchDetail['article']['uuid'])
      }
    },
    downLoadArticle () { // 下载文章，实际只是存到库里
      if (this.existsPdf.indexOf(this.searchDetail['article']['uuid']) > -1) {
        // console.log(888888888888)
        // var _this = this
        this.$vux.toast.show({
          type: 'text',
          text: '已存在‘我的-资料库’中',
          width: '8em'
        })
      } else {
        DownloadArticleList({
          uuid: this.searchDetail['article']['uuid'],
          openid: this.openid
        }).then(res => {
          if (res.data.errno === 0) {
            // 显示
            this.$vux.toast.show({
              text: '已添加到‘我的-资料库’中',
              width: '8em'
            })
          }
          console.log('xiazai:', res.data)
        })
      }
    },
    // 下载
    // downloadWeekly (url, pdfName, uuid) {
    //   // 调用子组件的下载方法
    //   this.downloadPDF(url, pdfName, uuid)
    //   // this.$refs.pdf.downloadPDF(url, 'pdf下载')
    //   // this.$refs.pdf.downloadPDF(Vue.prototype.ApiUrl + '/reports/download/' + id,fileName)
    // },
    // downloadPDF (url, fileName, uuid) {
    //   const _this = this
    //   fetch(url).then(function (response) {
    //     if (response.ok) {
    //       return response.arrayBuffer()
    //     }
    //     throw new Error('Network response was not ok.')
    //   }).then(function (arraybuffer) {
    //     let blob = new Blob([arraybuffer], {
    //       type: `application/pdf;charset-UTF-8` // word文档为msword,pdf文档为pdf
    //     })
    //
    //     let objectURL = URL.createObjectURL(blob)
    //
    //     let downEle = document.createElement('a')
    //     let fname = fileName // 下载文件的名字
    //     // let fname = `download` // 下载文件的名字
    //     downEle.href = objectURL
    //     downEle.setAttribute('download', fname)
    //     document.body.appendChild(downEle)
    //     downEle.click()
    //     // console.log(_this.total)
    //     DownloadArticleList({
    //       uuid: uuid,
    //       openid: _this.openid
    //     }).then(res => {
    //       if (res.data.errno === 0) {
    //         alert('下载完成')
    //       }
    //       console.log('xiazai:', res.data)
    //     })
    //     // _this.$store.commit('SET_PDFLIST', {url: url, name: fileName})
    //     // localStorage.setItem('pdfList', {url: url, name: fileName})
    //     // console.log('下载的有多少：', _this.$store.state.infoService.pdfList)
    //   }).catch(function (error) {
    //     console.log('There has been a problem with your fetch operation: ', error.message)
    //   })
    // },
    collectReport () {
      collectLW({
        uuid: this.uuid,
        openid: this.openid
      }).then(res => {
        if (res.data.errno === 0) {
          var collect = document.querySelector('.iconshoucang11')
          collect.style.color = '#FFFF00'
          // collect.style.color = '#ffb91b'
          // collect.style.color = 'red'
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
      console.log('000000000')
      getEachSearch({
        uuid: this.uuid,
        openid: this.openid
      }).then(res => {
        if (res.data.errno === 0) {
          console.log(111111111111111)
          this.searchDetail = res.data.article
          this.getShareInfo(this.searchDetail.article)
          // var pdfInfo = {'article_title': this.searchDetail.article[0]['article_article-title'], 'articleid': this.searchDetail.article[0]['uuid'], 'local_access_full-text-link': this.searchDetail.article[0]['local_access_full-text-link']}
          // let url = window.location.href.split('#')[0] + '#/pdfDetail?pdfInfo=' + JSON.stringify(pdfInfo)
          // console.log('sdfsfsfsfsfsdf', url)
          this.init()
          console.log(this.searchDetail.favorite_status === 'true')
          if (this.searchDetail.favorite_status === 'true') {
            // console.log(1111111)
            var shouC = document.querySelector('.iconshoucang11')
            console.log(shouC)
            shouC.style.color = '#FFFF00'
            // shouC.style.color = '#ffb91b'
            // shouC.style.color = 'red'
            // shouC.unbind('click')
          }
        }
        console.log('论文详情：', res.data)
      })
    },
    getShareInfo (item) {
      // http://localhost:8080/pdfInfo = {"article_title":"面向多维稀疏销售数据仓库的欺诈行为挖掘模型","articleid":"49b0180bd6967899128912abbfc38cbd","local_access_full-text-link":"http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/00/AF/rBEFwF5iH_2AIygiABJN4GbXr5g3633587"}
      // http://localhost:8080/#/pdfDetail?pdfInfo=%7B%22article_title%22%3A%22%E5%AD%A6%E4%B9%A0%E5%BC%8F%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%3A%E6%8C%91%E6%88%98%E4%B8%8E%E6%9C%BA%E9%81%87%22,%22articleid%22%3A%22322d903b3e37f0aea8ba7b0ef0441408%22,%22local_access_full-text-link%22%3A%22group1%2FM00%2F00%2FAA%2FrBEFwF5iGDKAIDWVABL_8lWIwWw9173296%22%7D
      // var pdfInfo = {'article_title': item['article_article-title'], 'articleid': item['uuid'], 'local_access_full-text-link': item['local_access_full-text-link']}
      // let url = window.location.href.split('#')[0] + '#/pdfDetail?pdfInfo=' + JSON.stringify(pdfInfo)
      let url = window.location.href
      console.log(url)
      let imgUrl = 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=' + item['local_access_pdf_header_href']
      console.log(imgUrl)
      // let url = window.location.href.split('#')[0]
      // let url = encodeURIComponent(window.location.href.split('#')[0])
      // alert('url是啥：' + url)
      // console.log('url是啥：' + url)
      // this.$axios.get('http://zhongkeruitong.top/towerImg/search_lu/wechat/getSign?url=' + url).then(res => {
      // if (res.data.errno === 0) {
      //   var configContent = res.data.data
      //   wx.config({
      //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //     appId: configContent.appId, // 必填，公众号的唯一标识
      //     timestamp: configContent.timestamp, // 必填，生成签名的时间戳
      //     nonceStr: configContent.nonceStr, // 必填，生成签名的随机串
      //     signature: configContent.signature, // 必填，签名
      //     jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
      //     // jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
      //   })
      // }
      // wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
      //   wx.updateAppMessageShareData({
      //     // wx.updateAppMessageShareData({
      //     title: item['article_article-title'], // 分享标题
      //     desc: item['article_abstract'].substr(0, 100), // 分享描述
      //     link: item['local_access_full-text-link'], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //     imgUrl: item['local_access_pdf_header_href'], // 分享图标
      //     success: function () {
      //       // 设置成功
      //       console.log('分享成功')
      //     }
      //   })
      //   wx.updateTimelineShareData({
      //     title: item['article_article-title'], // 分享标题
      //     link: item['local_access_full-text-link'], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //     imgUrl: item['local_access_pdf_header_href'], // 分享图标
      //     success: function () {
      //       // 设置成功
      //       console.log('分享成功')
      //     }
      //   })
      // })
      wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
        // alert('78945612313' + JSON.stringify(item))
        wx.updateAppMessageShareData({
          // wx.updateAppMessageShareData({
          title: item['article_article-title'], // 分享标题
          desc: item['article_abstract'].substr(0, 100), // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          // imgUrl: require('../../assets/img/article.jpg'), // 分享图标
          imgUrl: imgUrl, // 分享图标
          // imgUrl: item['local_access_pdf_header_href'], // 分享图标
          success: function () {
            // 设置成功
            console.log('分享成功')
          }
        })
        wx.updateTimelineShareData({
          title: item['article_article-title'], // 分享标题
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=' + item['local_access_pdf_header_href'], // 分享图标
          success: function () {
            // 设置成功
            console.log('分享成功')
          }
        })
      })
      // wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
      //   wx.updateTimelineShareData({
      //     title: '', // 分享标题
      //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //     imgUrl: '', // 分享图标
      //     success: function () {
      //       // 设置成功
      //     }
      //   })
      // })
      wx.error(function (res) {
        alert('失败')
      })
      // })
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
    top: 60%;
    /*top: 52%;*/
  }
  .iconxiazai4 {
    top: 68%;
    /*top: 60%;*/
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
