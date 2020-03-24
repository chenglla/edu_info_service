<template>
  <div>
<!--  <div style="height: 75vh;overflow-y: auto;overflow-x: hidden;">-->
<!--    <pdf :src="src"></pdf>-->
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  components: {pdf},
  data () {
    return {
      src: '',
    }
  },
  methods: { // 预览pdf
    previewPDF (url) {
      this.src = pdf.createLoadingTask(url)
    },
    downloadPDF (url, fileName) {
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
        let fname = `download` // 下载文件的名字
        downEle.href = objectURL
        downEle.setAttribute('download', fname)
        document.body.appendChild(downEle)
        downEle.click()
      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      })
    }
    // downloadPDF (url) { // 下载PDF
    // downloadPDF (url, fileName) { // 下载PDF
    //   this.$axios({
    //     method: 'get',
    //     // responseType: 'arraybuffer',
    //     url: url
    //   }).then(res => {
    //     // console.log('下载返回：', res.data)
    //     // this.fileDownload() // 调用下载方法，把后端传过来的流传给fileDownload方法
    //     this.fileDownload(res.data, fileName) // 调用下载方法，把后端传过来的流传给fileDownload方法
    //   })
    //   // }.bind(this)
    //   // .catch(
    //   //   // eslint-disable-next-line handle-callback-err
    //   //   function (error) {
    //   //     // this.$Message.error('网络请求出错')
    //   //     // 调试阶段可以看看报的什么错
    //   //     console.log('error', error)
    //   //   }
    //   //   // }.bind(this)
    //   // )
    // },
    // fileDownload (data, fileName) {
    //   console.log(222222222222222222222)
    //   let blob = new Blob([data], {
    //   // type类型后端返回来的数据中会有，根据自己实际进行修改
    //     type: 'application/pdf;charset-UTF-8'
    //   //   type: 'application/vnd.ms-excel'
    //   })
    //   let filename = fileName
    //   // let filename = fileName || '报表.xls'
    //   if (typeof window.navigator.msSaveBlob !== 'undefined') {
    //     window.navigator.msSaveBlob(blob, filename)
    //   } else {
    //     var blobURL = window.URL.createObjectURL(blob)
    //     // 创建隐藏<a>标签进行下载
    //     var tempLink = document.createElement('a')
    //     tempLink.style.display = 'none'
    //     tempLink.href = blobURL
    //     tempLink.setAttribute('download', filename)
    //     if (typeof tempLink.download === 'undefined') {
    //       tempLink.setAttribute('target', '_blank')
    //     }
    //     document.body.appendChild(tempLink)
    //     tempLink.click()
    //     document.body.removeChild(tempLink)
    //     window.URL.revokeObjectURL(blobURL)
    //   }
    // }
  }
}
</script>
