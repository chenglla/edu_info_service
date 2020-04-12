<template>
  <div class="search_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">搜索列表</div>
    </div>
    <third></third>
    <div class="content" ref="content">
      <div style="padding-bottom: 20px">
        <div class="titleRecord">
          共搜到{{total}}条记录
        </div>
        <div class="list-loading" v-if="loading">
          <div class="loader"></div>
        </div>
        <div v-for="(item, index) in searchResult" :key="index" class="con_info" @click="gotoDetail(item)" v-if="!loading && searchResult.length > 0">
          <div class="content_left">
            <i class="iconfont iconpdf"></i>
            <img :src="item['article']['local_access_pdf_header_href']" alt="" class="con_left_img">
          </div>
          <div class="content_right">
            <div class="con_right_title">{{item['article']['article_article-title']}}</div>
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
<!--        <div style="text-align: center;margin: 10px;" v-if="(!loading && total<10) || (!loading && page>total)" >到底了...</div>-->
        <div class="school-item-end" v-if="!loading && searchResult.length !== 0 && end">到底了</div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {searchAll, getDownloadArticleList, DownloadArticleList, collectLW} from '@/api/index'
import {formatDate} from '../../utils/date'
import wx from 'weixin-js-sdk'
import pdf from 'vue-pdf'
import third from '../third'
import _ from 'underscore'
export default {
  components: {pdf, third},
  data () {
    return {
      end: false,
      searchResult: [], // 单页搜索结果
      allSearchResult: [], // 所有搜索结果
      homeScroll: null,
      total: '',
      onFetching: false,
      loading: false,
      pdfList: [], // 已经下载过的文件
      existsPdf: [], // 已经下载过的文件里面的某一个属性集合
      scrollTop: '',
      scrollY: '',
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
    searchContent () {
      this.$store.commit('SET_SEARCH_DATA', this.$route.query.searchContent)
      return this.$route.query.searchContent
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
  mounted () {
    this.$store.commit('SET_SHOW_IMG', false)
    this.getDownloadArticleList() // 获取已经库里已经存在的下载文件
    this.clearQuery()
    this.loading = true
    this.getSearchResult()
    this.init()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'home'})
      this.$store.commit('SET_SEARCH_DATA', '')
      // this.$router.go(-1)
    },
    init () {
      this.$nextTick(() => {
        // this.homeScroll = new BScroll(this.$refs.homeWrapper, {
        //   click: true
        // })
        // console.log(window)
        if (this.homeScroll) {
          this.homeScroll.refresh()
        } else {
          // this.historyScroll = new BScroll(this.$refs.content, {
          //   probeType: 3,
          //   click: true
          // })
          this.homeScroll = new BScroll(this.$refs.content, {
            scrollY: true,
            click: true,
            probeType: 3,
            // pullDownRefresh: true,
            pullDownRefresh: {
              // type: true,
              threshold: 40,
              stop: 20
            },
            pullUpLoad: {
              threshold: 30,
              moreTxt: '加载中',
              noMoreTxt: '没有更多数据了'
            }
          })
          this.homeScroll.on('pullingUp', () => {
            this.nextPage()
            this.$nextTick(() => {
              this.homeScroll.finishPullUp()
            })
          })
          this.homeScroll.on('pullingDown', () => {
            console.log('下滑')
            this.$nextTick(() => {
              // this.homeScroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
              this.homeScroll && this.homeScroll.finishPullDown()
            })
          })
        }
      })
    },
    nextPage: _.debounce(function () {
      if (this.end || this.loading) {
        return
      }
      this.page = this.page + 10
      this.getSearchResult()
    }, 50, true),
    // init () {
    //   this.$nextTick(() => {
    //     this.historyScroll = new BScroll(this.$refs.content, {
    //       click: true
    //     })
    //   })
    // },
    clearQuery () {
      // this.allSearchResult = []
      this.searchResult = []
      this.total = ''
      this.end = false
      this.page = 0
      this.loading = true
    },
    getSearchResult () { // 找到搜索词，进行高亮显示
      // alert(this.page)
      console.log('page:', this.page)
      if (this.page === 0) {
        this.end = false
        this.searchResult = []
      }
      searchAll({
        words: this.searchContent, // 查询字段
        from: this.page, // 起始页码
        openid: this.openid
      }).then(res => {
        // alert(1000+this.page)
        if (res.data.errno === 0) {
          this.loading = false
          // console.log(res.data)
          this.total = res.data.total // 一共多少条记录
          if (res.data.data && res.data.data.length < 10) {
            this.end = true
          }
          // 新来的内容放入数组中
          const uuidList = this.searchResult.map(item => item['article']['uuid'])
          res.data.data.map(item => {
            if (uuidList.indexOf(item['article']['uuid']) === -1) {
              this.searchResult.push(item)
            }
          })
          const that = this // this不断改变，that记录当前this
          setTimeout(function () {
            for (const i in that.searchResult) {
              if (that.searchResult[i].favorite_status === 'true') {
                var collList = document.querySelectorAll('.iconshoucang')
                collList[i].style.color = 'red'
              }
            }
            // that.init()
            that.$nextTick(() => {
              that.homeScroll && that.homeScroll.refresh()
            })
          }, 400)
          console.log('搜索词：', res.data)
        }
        // })
      })
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
          text: '已存在‘我的-在线云盘’中',
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
              text: '已添加到‘我的-在线云盘’中',
              width: '8em'
            })
          }
          console.log('xiazai:', res.data)
        })
      }
    },
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
  }
}
</script>
<style scoped lang="scss">
  .search_info {
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
  .titleRecord {
    padding: 10px 0 5px 15px;
    /*padding: 3px 0;*/
    border-bottom: 1px solid #ececec;
    background-color: #fff;
    color: #9c9c9c;
  }
  .content {
    position: relative;
    /*background: #fbf9fe;*/
    /*overflow: hidden;*/
    /*padding: 10px 0;*/
    height: calc(100% - 180px);
    padding: 0 5px 10px;
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
    padding: 10px 10px;
    border-bottom: 1px solid #ececec;
    background-color: #fff;
    .con_left_img {
      width: 90%;
      border: 1px solid #ececec;
    }
  }
  .school-item-end {
    text-align: center;
    color: #9a9fb7;
    position: relative;
    display: block;
    margin: 0 auto;
    width: 200px;
    &:before,
    &:after {
      content: '';
      background: #9a9fb7;
      width: 60px;
      height: 1px;
      display: block;
      top: 10px;
      left: 0;
      position: absolute;
    }
    &:after {
      left: auto;
      right: 0;
    }
  }
</style>
