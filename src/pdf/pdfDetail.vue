<template>
  <div class="collect_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">论文详情</div>
    </div>
    <div class="arrow" v-if="!loading">
      <!--      // 上一页-->
      <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage===1}">上一页</span>
      <!--        {{currentPage}} / {{pageCount}}-->
      <div style="color: #3c3c3c">{{currentPage}} / {{pageCount}}</div>
      <!--      // 下一页-->
      <!--        <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage===pageCount}">下一页</span>-->
      <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage===pageCount}" style="float: right;margin-right: 15px;margin-left: 0">下一页</span>
    </div>
    <div class="pdf" v-show="fileType === 'pdf'" ref="pdfInfo">
      <div>
        <div class="list-loading" v-if="loading">
          <div class="loader"></div>
        </div>
        <!--    // 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了-->
        <!--    // src需要展示的PDF地址-->
        <!--    // 当前展示的PDF页码-->
        <!--    // PDF文件总页码-->
        <!--    // 一开始加载的页面-->
        <!--    // 加载事件-->
        <pdf :src="src" :page="currentPage"
             @num-pages="pageCount=$event"
             @page-loaded="currentPage=$event"
             @loaded="loadPdfHandler">
        </pdf>
        <!--      <div style="height: 75vh;overflow-y: auto;overflow-x: hidden;">-->
        <!--        <pdf :src="src"></pdf>-->
        <!--      </div>-->
      </div>

    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import Divider from 'vux/src/components/divider/index'
// import AnyTouch from 'any-touch'
import BScroll from 'better-scroll'
export default {
  metaInfo: {
    // title: 'This is the test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0, maximum-scale=2.0, user-scalable=yes' }
    ]
  },
  components: {Divider, pdf},
  data () {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      src: '', // pdf文件地址
      loading: false,
      // numPages: 0, // 总页数
      pdfScroll: null,
    }
  },
  computed: {
    pdfInfo () {
      console.log('pdf:', this.$route.query.pdfInfo)
      return JSON.parse(this.$route.query.pdfInfo)
    }
  },
  created () {
    // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
    // this.src = pdf.createLoadingTask(this.pdfInfo.url)
    // http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=
    this.loading = true
    this.src = pdf.createLoadingTask('http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=' + this.pdfInfo['local_access_full-text-link'])
    console.log('created:', this.src)
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'myDownLoad'})
    },
    init () {
      this.$nextTick(() => {
        this.pdfScroll = new BScroll(this.$refs.pdfInfo, {
          click: true
        })
      })
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage (val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },
    // pdf加载时
    loadPdfHandler (e) {
      console.log('加载中：', e)
      this.currentPage = 1 // 加载的时候先加载第一页
      this.loading = false
      this.init()
      console.log(333333333333)
    }
  }
}

</script>
<style lang="scss" scoped>
  .collect_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    /*background: #f8f8f8;*/
    position: relative;
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
  .arrow {
    position: fixed;
    bottom: 0;
    z-index: 10;
    /*margin: 8px 0;*/
    height: 45px;
    line-height: 45px;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ececec;
    box-shadow: -1px 0 3px rgba(0,0,0, .2);
    /*overflow: hidden;*/
    /*font-size: 14px;*/
    span {
      /*width: 15%;*/
      color: rgb(0, 115, 231);
      float: left;
      letter-spacing: 0.2em;
      margin-left: 15px;
      /*overflow: hidden;*/
    }
    div {
      /*flex: 1;*/
      position: absolute;
      margin-left: 50%;
      transform: translateX(-50%);
      font-weight: bold;
      /*display: inline-block;*/
      /*text-align: center;*/
    }
  }
  .grey {
    color: #9c9c9c!important;
  }
  .pdf {
    text-align: center;
    height: calc(100% - 95px);
    overflow: hidden;
    /*font-weight: bold;*/
    /*display: flex;*/
    /*position: relative;*/
  }
  .pdfIn {
    height: calc(100% - 50px);
    overflow: hidden;
  }
</style>
