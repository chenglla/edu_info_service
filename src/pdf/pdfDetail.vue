<template>
  <div class="collect_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">论文详情</div>
    </div>
    <div class="pdf" v-show="fileType === 'pdf'">
      <p class="arrow">
        <!--      // 上一页-->
        <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage===1}">上一页</span>
        {{currentPage}} / {{pageCount}}
        <!--      // 下一页-->
        <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage===pageCount}">下一页</span>
      </p>
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
</template>

<script>
import pdf from 'vue-pdf'
// import AnyTouch from 'any-touch'
// import BScroll from 'better-scroll'
export default {
  metaInfo: {
    // title: 'This is the test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0, maximum-scale=2.0, user-scalable=yes' }
    ]
  },
  components: {pdf},
  data () {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      src: '', // pdf文件地址
      // numPages: 0, // 总页数
      // pdfScroll: null,
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
    this.src = pdf.createLoadingTask('http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=' + this.pdfInfo['local_access_full-text-link'])
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'myDownLoad'})
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
      this.currentPage = 1 // 加载的时候先加载第一页
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
  .pdf {
    text-align: center;
    .arrow {
      margin: 8px 0;
      /*font-size: 14px;*/
    }
    .grey {
      color: #9c9c9c;
    }
  }
  .pdfIn {
    height: calc(100% - 50px);
    overflow: hidden;
  }
</style>
