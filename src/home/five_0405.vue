<template>
  <div class="four_info">
    <div class="title">
<!--      <i class="iconfont iconsousuo"></i>-->
      共搜到{{total}}条记录
    </div>
    <div class="content" ref="content" v-show="searchResult.length > 0">
      <div v-for="(item, index) in searchResult" :key="index" class="con_info" @click="gotoDetail(item)">
        <div class="content_left">
          <i class="iconfont iconpdf"></i>
          <img :src="item['article']['local_access_pdf_header_href']" alt="" class="con_left_img">
        </div>
        <div class="content_right">
<!--          <div class="con_right_title">{{item.date}}</div>-->
<!--          <div class="con_right_title">{{item.article_date}}</div>-->
<!--          <div class="con_right_title">{{item.article_article-title_cn}}</div>-->
          <div class="con_right_title">{{item['article']['article_article-title']}}</div>
<!--          <div class="con_right_title">{{item.article_article-title}}</div>-->
          <div class="con_right_author"><span v-for="(i, key) in item['article']['contrib_full-name']" :key="key">{{i}}</span></div>
          <div class="con_right_journal">{{item['article']['source_source-title_cn']}} <span>{{item['article']['date']}}</span></div>
<!--          <PDF ref="pdf"></PDF>-->
          <div class="con_right_option">
<!--            <PDF ref="pdf" style="display: none"></PDF>-->
            <span @click.stop="gotoOption('collect', item['article'], index)"><i class="iconfont iconshoucang"></i>收藏</span>
            <span @click.stop="gotoOption('downLoad', item['article'], index)"><i class="iconfont iconxiazai1"></i>下载</span>
<!--            <span @click.stop="gotoOption('share', item['article'], index)"><i class="iconfont iconfenxiang"></i>分享</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {searchAll, collectLW, DownloadArticleList} from '@/api/index'
import wx from 'weixin-js-sdk'
// import _ from 'underscore'
// import {sharePdf} from '../layout/sharePdf.js'
// import PDF from '../components/doenload'
import pdf from 'vue-pdf'
import bus from '@/utils/vueBus'
import _ from 'underscore'
export default {
  components: {pdf},
  data () {
    return {
      // searchData: '',
      searchResult: [], // 搜索结果
      historyScroll: null,
      total: ''
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
        // console.log('ratch:')
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
    // this.getSign()
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
    // 下载
    downloadWeekly (url, pdfName, uuid) {
      // 调用子组件的下载方法
      this.downloadPDF(url, pdfName, uuid)
      // this.$refs.pdf.downloadPDF(url, 'pdf下载')
      // this.$refs.pdf.downloadPDF(Vue.prototype.ApiUrl + '/reports/download/' + id,fileName)
    },
    downloadPDF: _.debounce(function (url, fileName, uuid) {
      console.log('0000000000000000')
      const _this = this
      fetch(url).then(function (response) {
        if (response.ok) {
          return response.arrayBuffer()
        }
        throw new Error('Network response was not ok.')
      }).then(function (arraybuffer) {
        let blob = new Blob([arraybuffer], {
          type: `application/pdf;charset-UTF-8` // word文档为msword,pdf文档为pdf
        })
        let objectURL = URL.createObjectURL(blob)
        let downEle = document.createElement('a')
        let fname = fileName // 下载文件的名字
        // let fname = `download` // 下载文件的名字
        downEle.href = objectURL
        downEle.setAttribute('download', fname)
        document.body.appendChild(downEle)
        downEle.click()
        // console.log(_this.total)
        DownloadArticleList({
          uuid: uuid,
          openid: _this.openid
        }).then(res => {
          if (res.data.errno === 0) {
            alert('下载完成')
          }
          console.log('xiazai:', res.data)
        })
        // _this.$store.commit('SET_PDFLIST', {url: url, name: fileName})
        // localStorage.setItem('pdfList', {url: url, name: fileName})
        // console.log('下载的有多少：', _this.$store.state.infoService.pdfList)
      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message)
      })
    }, 50, true),
    gotoOption (val, item, index) {
      if (val === 'collect') {
        this.collectReport(item, index)
      } else if (val === 'downLoad') {
        this.downloadWeekly(item['local_access_full-text-link'], item['article_article-title'], item['uuid'])
        // this.downloadWeekly(item['local_access_full-text-link'], item['article_article-title'], item[''])
        // this.$router.push({name: 'usePdf'})
      } else if (val === 'share') {
        this.getShareInfo(item)
        // this.getSign()
        // this.$router.push({name: 'share'})
        // const a = sharePdf()
        // console.log('000000000000', a)
      }
    },
    // getShareInfo (item) {
    //   // let url = window.location.href.split('#')[0]
    //   let url = encodeURIComponent(window.location.href.split('#')[0])
    //   alert('url是啥：' + url)
    //   console.log('url是啥：' + url)
    //   this.$axios.get('http://zhongkeruitong.top/towerImg/search_lu/wechat/getSign?url=' + url).then(res => {
    //   // this.$axios.get('http://zhongkeruitong.top/towerImg/search_lu/wechat/getSign?url=http://www.zhongkeruitong.top/towerImg/search_lu/').then(res => {
    //     if (res.data.code === 0) {
    //       var configContent = res.data.data
    //       wx.config({
    //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: configContent.appId, // 必填，公众号的唯一标识
    //         timestamp: configContent.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: configContent.nonceStr, // 必填，生成签名的随机串
    //         signature: configContent.signature, // 必填，签名
    //         jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    //         // jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    //       })
    //       // wx.checkJsApi({
    //       //   jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //       //   success: function (resp) {
    //       //     console.log(78787887878877)
    //       //     // 以键值对的形式返回，可用的api值true，不可用为false
    //       //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //       //   }
    //       // });
    //       wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
    //         wx.onMenuShareTimeline({
    //         // wx.updateAppMessageShareData({
    //           title: item['article_article-title'], // 分享标题
    //           desc: item['article_abstract'].substr(0, 100), // 分享描述
    //           link: item['local_access_full-text-link'], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //           imgUrl: item['local_access_pdf_header_href'], // 分享图标
    //           success: function () {
    //             // 设置成功
    //             console.log('分享成功')
    //           }
    //         })
    //       })
    //       wx.error(function (res) {
    //         alert('失败')
    //       })
    //     }
    //   })
    // },
    getShareInfo (item) {
      // let url = window.location.href.split('#')[0]
      // let url = encodeURIComponent(window.location.href.split('#')[0])
      // alert('url是啥：' + url)
      // console.log('url是啥：' + url)
      wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          // wx.updateAppMessageShareData({
          title: item['article_article-title'], // 分享标题
          desc: item['article_abstract'].substr(0, 100), // 分享描述
          link: item['local_access_full-text-link'], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: item['local_access_pdf_header_href'], // 分享图标
          success: function () {
            // 设置成功
            console.log('分享成功')
          }
        })
        wx.updateTimelineShareData({
          title: item['article_article-title'], // 分享标题
          link: item['local_access_full-text-link'], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: item['local_access_pdf_header_href'], // 分享图标
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
    collectReport: _.debounce(function (item, index) { // 收藏论文
      // window.event? window.event.cancelBubble = true : e.stopPropagation()
      collectLW({
        uuid: item['uuid'],
        openid: this.openid
      }).then(res => {
        if (res.data.errno === 0) {
          var collList = document.querySelectorAll('.iconshoucang')
          collList[index].style.color = 'red'
          // this.showCollect = true
        }
        console.log('没', res.data)
      })
    }, 50, true),
    // getSearchData () {
      // let that = this
      // bus.$on('searchData', (data) => {
      //   that.searchData = data
      //   console.log('hehheh', that.searchData)
      //   that.getSearchResult()
      // })
    // },
    gotoDetail (val) { // 跳转到论文详情
      this.$router.push({
        path: '/searchDetail',
        query: {
          uuid: val.article.uuid
        }
      })
    },
    getSearchResult () { // 找到搜索词，进行高亮显示
      searchAll({
        words: this.searchContent,
        // from: 11,
        openid: this.openid
      }).then(res => {
        // console.log(res.data)
        this.total = res.data.total
        this.searchResult = res.data.data
        // this.init()
        const that = this
        setTimeout(function () {
          for (const i in that.searchResult) {
            if (that.searchResult[i].favorite_status === 'true') {
              // console.log(11111111111)
              var collList = document.querySelectorAll('.iconshoucang')
              collList[i].style.color = 'red'
              // collList[i].style.backgroundColor = 'red'
              // var collList = document.querySelector('.content_right')
              // console.log(collList)
              // console.log(111111111)
            }
          }
        }, 400)
        // if (this.searchResult.favorite_status === 'true') {
        //   console.log(1111111)
        //   var shouC = document.querySelector('.iconshoucang11')
        //   console.log(shouC)
        //   shouC.style.color = 'red'
        //   // shouC.unbind('click')
        // }
        // console.log('搜索词：', this.searchContent)
        console.log('搜索词：', res.data)
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
      bottom: 0;
      /*top: 74%;*/
      /*left: 68%;*/
      right: 8%;
      color: #CC3636;
      font-size: 20px;
    }
  }
  .content_right {
    width: 65%;
  }
  .con_right_title {
    position: absolute;
    top: -123px;
    color: #44BF87;
    white-space: nowrap; // 强制一行显示
    width: 100%;
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 超出部分显示省略号
  }
  .con_right_author {
    white-space: nowrap; // 强制一行显示
    width: 100%;
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 超出部分显示省略号
    position: absolute;
    top: -90px;
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
    top: -58px;
    color: #3c3c3c;
    font-size: 14px;
    span {
      margin-left: 10px;
    }
  }
  .con_right_option {
    position: absolute;
    top: -25px;
    font-size: 13px;
    color: #9c9c9c;
    span {
      margin-right: 25px;
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
      border: 1px solid #ececec;
    }
  }
</style>
