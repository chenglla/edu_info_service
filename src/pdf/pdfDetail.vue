<!--<template>-->
<!--  <div class="pdf" v-show="fileType === 'pdf'">-->
<!--    <p class="arrow">-->
<!--&lt;!&ndash;      // 上一页&ndash;&gt;-->
<!--      <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage===1}">Preview</span>-->
<!--      {{currentPage}} / {{pageCount}}-->
<!--&lt;!&ndash;      // 下一页&ndash;&gt;-->
<!--      <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage===pageCount}">Next</span>-->
<!--    </p>-->
<!--&lt;!&ndash;    // 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了&ndash;&gt;-->
<!--&lt;!&ndash;    // src需要展示的PDF地址&ndash;&gt;-->
<!--&lt;!&ndash;    // 当前展示的PDF页码&ndash;&gt;-->
<!--&lt;!&ndash;    // PDF文件总页码&ndash;&gt;-->
<!--&lt;!&ndash;    // 一开始加载的页面&ndash;&gt;-->
<!--&lt;!&ndash;    // 加载事件&ndash;&gt;-->
<!--    <pdf :src="src" :page="currentPage"-->
<!--    @num-pages="pageCount=$event"-->
<!--    @page-loaded="currentPage=$event"-->
<!--    @loaded="loadPdfHandler">-->
<!--    </pdf>-->
<!--&lt;!&ndash;      <div style="height: 75vh;overflow-y: auto;overflow-x: hidden;">&ndash;&gt;-->
<!--&lt;!&ndash;        <pdf :src="src"></pdf>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->
<template>
  <div class="collect_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">下载详情</div>
    </div>
    <div class="pdfIn" v-show="fileType === 'pdf'" ref="pdfView">
<!--    <div class="pdfIn" v-show="fileType === 'pdf'" ref="pdfView">-->
      <div>
        <pdf
          v-for="i in numPages"
          ref="pdfs"
          :src="src"
          :key="i"
          :page="i"
        >
        </pdf>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import BScroll from 'better-scroll'
export default {
  // metaInfo: {
  //   title: 'This is the test',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes' }
  //   ]
  // },
  components: {pdf},
  data () {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      src: '', // pdf文件地址
      numPages: 0, // 总页数
      pdfScroll: null,
    }
  },
  computed: {
    pdfInfo () {
      console.log('pdf:', this.$route.query.pdfInfo)
      return this.$route.query.pdfInfo
    }
  },
  created () {
    // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
    // this.src = pdf.createLoadingTask(this.pdfInfo.url)
    this.src = pdf.createLoadingTask(this.pdfInfo.url)
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages
    })
    this.init()
    // 通过$refs.pdfs拿到的是数组（多个canvas拼接而成）
    // this.$refs.pdfs[0].$refs.canvas // 获取canvas节点
    console.log('啥：', this.$refs.pdfs)
    // this.$refs.pdfs.$refs.canvas.style.width = '120%'
    // this.$refs.pdfs.$refs.canvas.style.width = '120%'
    // this.$refs.pdfs.$refs.canvas.style.transform = 'scale(1.5)'
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'myDownLoad'})
    },
    init () {
      this.$nextTick(() => {
        this.pdfScroll = new BScroll(this.$refs.pdfView, {
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
  .pdfIn {
    height: calc(100% - 50px);
    overflow: hidden;
  }
</style>
