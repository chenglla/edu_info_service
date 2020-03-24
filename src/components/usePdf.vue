<template>
  <div>
    <PDF ref="pdf"></PDF>
    <Button type="primary" size="small" @click="previewWeekly()">预览</Button>
    <Button type="primary" size="small" @click="downloadWeekly()">下载</Button>
  </div>
</template>
<script>
import PDF from '../components/doenload'
// import Vue from 'vue'
export default {
  components: {PDF},
  methods: {
    // 预览
    previewWeekly () {
      // 调用子组件的预览方法
      // 完整的地址应该是发布到服务器的地址，不应该是localhost:8080这样的
      // Vue.prototype.ApiUrl 用来读取服务器地址 比如:
      // http://192.168.8.152:8080/MixShowView-Web/reports/preview/1
      this.$refs.pdf.previewPDF('http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/00/A4/rBEFwF5iDB-AV9UcAA2XDAAfWy00181909')
      // this.$refs.pdf.previewPDF(Vue.prototype.ApiUrl + '/reports/preview/' + id)
    },
    // 下载
    downloadWeekly () {
      // 调用子组件的下载方法
      this.$refs.pdf.downloadPDF('http://47.93.225.12:8081/downloadbyfastdfspath?fastdfspath=group1/M00/00/A4/rBEFwF5iDB-AV9UcAA2XDAAfWy00181909', 'pdf下载')
      // this.$refs.pdf.downloadPDF(Vue.prototype.ApiUrl + '/reports/download/' + id,fileName)
    }
  }
}
</script>
