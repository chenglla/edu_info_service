<template>
  <div>

  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getSign()
  },
  methods: {
    getSign () {
      let url = encodeURIComponent(window.location.href.split('#')[0])
      // alert('url是啥：' + url)
      // console.log('url是啥：' + url)
      this.$axios.get('http://zhongkeruitong.top/towerImg/search_lu/wechat/getSign?url=' + url).then(res => {
        if (res.data.code === 0) {
          var configContent = res.data.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: configContent.appId, // 必填，公众号的唯一标识
            timestamp: configContent.timestamp, // 必填，生成签名的时间戳
            nonceStr: configContent.nonceStr, // 必填，生成签名的随机串
            signature: configContent.signature, // 必填，签名
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
          })
          wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
            // return '成功'
            alert('成功')
            wx.updateAppMessageShareData({
              title: 'aaaaaaaaaa', // 分享标题
              desc: 'bbbbbbbbbb', // 分享描述
              link: 'cccccccccccc', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '33333333', // 分享图标
              success: function () {
                // 设置成功
                alert('hahahhhhhhhhh')
              }
            })
          })
          wx.error(function (res) {
            alert('失败')
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
