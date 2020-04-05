<template>
  <div class="four_info">
    <div class="title">
<!--      <i class="iconfont iconsousuo"></i>-->
      共搜到{{total}}条记录
    </div>
    <div class="content" ref="content" v-show="searchResult.length > 0">
      <scroller  lock-x height="400px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="5">
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
                          <span><i class="iconfont iconfenxiang"></i>分享</span>
                        </div>
                      </div>
                    </div>
              <p style="text-align: center" v-if="onFetching">loading...</p>
            </div>
          </scroller>
        </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {searchAll, collectLW} from '@/api/index'
// import PDF from '../components/doenload'
import pdf from 'vue-pdf'
import bus from '@/utils/vueBus'
import _ from 'underscore'
import { Scroller } from 'vux'
export default {
  components: {pdf,Scroller},
  data () {
    return {
      // searchData: '',
      searchResult: [], // 单页搜索结果
      allSearchResult:[], // 所有搜索结果
      historyScroll: null,
      total: '',
      fromPage:0,
      onFetching:false
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
    downloadWeekly (url, pdfName) {
      // 调用子组件的下载方法
      this.downloadPDF(url, pdfName)
      // this.$refs.pdf.downloadPDF(url, 'pdf下载')
      // this.$refs.pdf.downloadPDF(Vue.prototype.ApiUrl + '/reports/download/' + id,fileName)
    },
    downloadPDF (url, fileName) {
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
        alert('下载完成')
        console.log(_this.total)
        _this.$store.commit('SET_PDFLIST', {url: url, name: fileName})
        localStorage.setItem('pdfList', {url: url, name: fileName})
        console.log('下载的有多少：', _this.$store.state.infoService.pdfList)
      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message)
      })
    },
    gotoOption (val, item, index) {
      if (val === 'collect') {
        this.collectReport(item, index)
      } else if (val === 'downLoad') {
        this.downloadWeekly(item['local_access_full-text-link'], item['article_article-title'])
        // this.$router.push({name: 'usePdf'})
      }
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
        this.total = res.data.total //一共多少条记录
        this.searchResult = res.data.data
        // 新来的内容放入数组中
        this.allSearchResult.push.apply(this.allSearchResult,res.data.data)

        //console.log(this.searchResult)
        //console.log(this.allSearchResult)
        // this.init()
        const that = this // this不断改变，that记录当前this
        setTimeout(function () { //规定时间后执行该函数
          for (const i in that.searchResult) {
            if (that.searchResult[i].favorite_status === 'true') {
              // console.log(11111111111)
              var collList = document.querySelectorAll('.iconshoucang')
              collList[i].style.color = 'red'

            }
          }
        }, 400)

        console.log('搜索词：', res.data)
      })

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
      border: 1px solid #ececec;
    }
  }
</style>
