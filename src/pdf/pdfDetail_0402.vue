<template>
  <div class="collect_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">论文详情</div>
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
  metaInfo: {
    // title: 'This is the test',
    meta: [
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0, maximum-scale=2.0, user-scalable=yes' }
    ]
  },
  components: {pdf},
  data () {
    return {
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
    this.src = pdf.createLoadingTask('http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=' + this.pdfInfo['local_access_full-text-link'])
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
