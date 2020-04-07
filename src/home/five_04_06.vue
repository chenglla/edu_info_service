<template>
  <div class="four_info">
    <div class="title">
<!--      <i class="iconfont iconsousuo"></i>-->
      共搜到{{total}}条记录
    </div>
    <div class="content" ref="content">
      <div class="list-loading" v-if="loading">
        <div class="loader"></div>
      </div>
      <scroller  v-if="!loading && allSearchResult.length > 0" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
<!--      <scroller  v-if="!loading && allSearchResult.length > 0" lock-x height="400px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="5">-->
            <div class="box2">
              <div v-for="(item, index) in  allSearchResult" :key="index" class="con_info" @click="gotoDetail(item)">
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
<!--                          <span><i class="iconfont iconfenxiang"></i>分享</span>-->
                        </div>
                      </div>
                    </div>
              <p style="text-align: center;margin: 8px;color: #9c9c9c" v-if="onFetching">加载中...</p>
            </div>
          </scroller>
    </div>

<!--    <div class="content" ref="content">-->
<!--&lt;!&ndash;    <div class="content" ref="content" v-show="searchResult.length > 0">&ndash;&gt;-->
<!--      <div>-->
<!--        <div class="list-loading" v-if="loading">-->
<!--          <div class="loader"></div>-->
<!--        </div>-->
<!--        <div v-for="(item, index) in searchResult" :key="index" class="con_info" @click="gotoDetail(item)" v-if="!loading && searchResult.length > 0">-->
<!--          <div class="content_left">-->
<!--            <i class="iconfont iconpdf"></i>-->
<!--            <img :src="item['article']['local_access_pdf_header_href']" alt="" class="con_left_img">-->
<!--          </div>-->
<!--          <div class="content_right">-->
<!--            <div class="con_right_title">{{item['article']['article_article-title']}}</div>-->
<!--            <div class="con_right_author"><span v-for="(i, key) in item['article']['contrib_full-name']" :key="key">{{i}}</span></div>-->
<!--            <div class="con_right_journal">{{item['article']['source_source-title_cn']}} <span>{{item['article']['date']}}</span></div>-->
<!--            &lt;!&ndash;          <PDF ref="pdf"></PDF>&ndash;&gt;-->
<!--            <div class="con_right_option">-->
<!--              &lt;!&ndash;            <PDF ref="pdf" style="display: none"></PDF>&ndash;&gt;-->
<!--              <span @click.stop="gotoOption('collect', item['article'], index)"><i class="iconfont iconshoucang"></i>收藏</span>-->
<!--              <span @click.stop="gotoOption('downLoad', item['article'], index)"><i class="iconfont iconxiazai1"></i>下载</span>-->
<!--              &lt;!&ndash;            <span @click.stop="gotoOption('share', item['article'], index)"><i class="iconfont iconfenxiang"></i>分享</span>&ndash;&gt;-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {searchAll, collectLW, DownloadArticleList, getDownloadArticleList} from '@/api/index'
import wx from 'weixin-js-sdk'
// import _ from 'underscore'
// import {sharePdf} from '../layout/sharePdf.js'
// import PDF from '../components/doenload'
import pdf from 'vue-pdf'
// import bus from '@/utils/vueBus'
import _ from 'underscore'
import { Scroller } from 'vux'
export default {
  components: {pdf, Scroller},
  data () {
    return {
      // searchData: '',

      searchResult: [], // 单页搜索结果
      allSearchResult: [], // 所有搜索结果
      historyScroll: null,
      total: '',
      fromPage: 0,
      onFetching: false,

      loading: false,
      // searchResult: [], // 搜索结果
      // historyScroll: null,
      // total: '',
      pdfList: [], // 已经下载过的文件
      existsPdf: [], // 已经下载过的文件里面的某一个属性集合

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
        this.clearQuery()
        this.loading = true
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
    this.clearQuery()
    this.loading = true
    this.getSearchResult()
    this.getDownloadArticleList() // 获取已经库里已经存在的下载文件
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
    clearQuery () {
      this.allSearchResult = []
      this.searchResult = []
      this.total = ''
      this.fromPage = 0
      this.loading = true
    },
    getDownloadArticleList () { // 获取下载过的文件
      getDownloadArticleList({
        openid: this.openid,
        m: 0
      }).then(res => {
        this.pdfList = res.data.list
        console.log('sdfsdfsf', res.data)
        console.log('sdfsdfsf6746546', res.data.list)
        var that = this
        that.pdfList.map(function (item) {
          // var that = this
          that.existsPdf.push(item.articleid)
        })
        console.log('列表：', that.pdfList)
      })
    },
    // 下载
    // downloadWeekly (url, pdfName, uuid) {
    //   // 调用子组件的下载方法
    //   this.downloadPDF(url, pdfName, uuid)
    //   // this.$refs.pdf.downloadPDF(url, 'pdf下载')
    //   // this.$refs.pdf.downloadPDF(Vue.prototype.ApiUrl + '/reports/download/' + id,fileName)
    // },
    // downloadPDF: _.debounce(function (url, fileName, uuid) {
    //   console.log('0000000000000000')
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
    //     let objectURL = URL.createObjectURL(blob)
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
    // }, 50, true),
    gotoOption (val, item, index) {
      if (val === 'collect') {
        this.collectReport(item, index)
      } else if (val === 'downLoad') {
        this.downLoadArticle(item)
      }
    },
    downLoadArticle (item) { // 下载文章，实际只是存到库里
      if (this.existsPdf.indexOf(item['uuid']) > -1) {
        this.$vux.toast.show({
          type: 'text',
          text: '已存在‘我的-资料库’中',
          width: '8em'
        })
      } else {
        DownloadArticleList({
          uuid: item['uuid'],
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
    gotoDetail (val) { // 跳转到论文详情
      this.$router.push({
        path: '/searchDetail',
        query: {
          uuid: val.article.uuid
        }
      })
    },
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {

        this.onFetching = true
        setTimeout(() => {
          this.fromPage += 10
          // alert(this.fromPage)  // 每次提醒当前页码
          this.getSearchResult()

          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()

          })
          this.onFetching = false
        }, 200)
      }
    },

    getSearchResult () { // 找到搜索词，进行高亮显示
      searchAll({
        words: this.searchContent, // 查询字段
        from: this.fromPage, // 起始页码
        openid: this.openid
      }).then(res => {
        // console.log(res.data)
        this.total = res.data.total // 一共多少条记录
        this.searchResult = res.data.data
        // 新来的内容放入数组中
        this.allSearchResult.push.apply(this.allSearchResult, res.data.data)
        // console.log(this.searchResult)
        // console.log(this.allSearchResult)
        // this.init()
        const that = this // this不断改变，that记录当前this
        // setTimeout(function () { //规定时间后执行该函数
        this.loading = false
        // const that = this
        setTimeout(function () {
          for (const i in that.searchResult) {
            if (that.searchResult[i].favorite_status === 'true') {
              // console.log(11111111111)
              var collList = document.querySelectorAll('.iconshoucang')
              collList[i].style.color = 'red'
            }
          }
        }, 400)
        console.log('搜索词：', res.data)
        // })
      })
    },
  }
}
</script>
<style scoped lang="scss">
  .four_info {
    /*height: 100%;*/
    background-color: #fff;
    margin-top: 5px;
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
