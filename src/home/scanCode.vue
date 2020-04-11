<template>
  <div class="scanCode_info">
<!--    <button @click="sao">{{ticketNum}}</button>-->
    <div class="score_header" v-if="ticketNum !== ''">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont icon_lulufanhui"></i>
      </div>
      <div class="title">扫码结果</div>
    </div>
    <div class="scanCode_second">{{ticketNum}}</div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      ticketNum: '',
      configContent: []
    }
  },
  mounted () {
    this.getSign()
  },
  methods: {
    returnBack () {
      this.$router.push('/home')
    },
    getSign () {
      const divI = document.getElementsByClassName('scanCode_info')[0]
      divI.style.backgroundColor = '#9c9c9c'
      let _this = this
      _this.$vux.loading.show({
        text: '加载中...'
      })
      wx.ready(function () {
        // const divI = document.getElementsByClassName('scanCode_info')[0]
        divI.style.backgroundColor = ''
        _this.$vux.loading.hide()
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            // alert('返回结果：' + res)
            // _this.ticketNum = res // 当needResult 为 1 时，扫码返回的结果
            _this.ticketNum = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            // alert(_this.ticketNum)
          }
        })
        // alert('成功')
        // wx.checkJsApi({
        //   jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        //   success: function (res) {
        //     // 以键值对的形式返回，可用的api值true，不可用为false
        //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        //     console.log('成功：', res)
        //     alert('成功' + res)
        //   }
        // })
      })
      wx.error(function (res) {
        const divI = document.getElementsByClassName('scanCode_info')[0]
        divI.style.backgroundColor = ''
        _this.$vux.loading.hide()
        console.log('微信js-sdk 配置失败000' + res.errMsg)
        alert('微信js-sdk 配置失败000' + res.errMsg)
      })
      // let url = window.location.href.split('#')[0]
      // let url = encodeURIComponent(window.location.href.split('#')[0])
      // alert('url是啥：' + url)
      // console.log('url是啥：' + url)
      // this.$axios.get('http://zhongkeruitong.top/score_analysis/wechat/getSign?url=' + url).then(res => {
      // // this.$axios.get('http://zhongkeruitong.top/wechat_login/wechat/getSign?url=' + url).then(res => {
      // // this.$axios.get('http://zhongkeruitong.top/wechat_login/wechat/getSign?url=http://zhongkeruitong.top/score_analysis/index.html').then(res => {
      //   if (res.data.code === 0) {
      //     this.configContent = res.data.data
      //     this.signWX()
      //   }
      // })
    },
    // signWX () {
    //   let _this = this
    //   // alert('appid'+this.configContent.appId+'signature'+this.configContent.signature+'nonceStr'+this.configContent.nonceStr+'jsapi_ticket'+this.configContent.jsapi_ticket+'url'+this.configContent.url)
    //   // this.configContent = JSON.stringify(this.configContent)
    //   // wx.config({
    //   //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   //   appId: this.configContent.appId, // 必填，公众号的唯一标识
    //   //   timestamp: this.configContent.timestamp, // 必填，生成签名的时间戳
    //   //   nonceStr: this.configContent.nonceStr, // 必填，生成签名的随机串
    //   //   signature: this.configContent.signature, // 必填，签名
    //   //   jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
    //   // })
    //   wx.ready(function () {
    //     const divI = document.getElementsByClassName('scanCode_info')[0]
    //     divI.style.backgroundColor = ''
    //     _this.$vux.loading.hide()
    //     wx.scanQRCode({
    //       needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    //       scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
    //       success: function (res) {
    //         // alert('返回结果：' + res)
    //         // _this.ticketNum = res // 当needResult 为 1 时，扫码返回的结果
    //         _this.ticketNum = res.resultStr // 当needResult 为 1 时，扫码返回的结果
    //         // alert(_this.ticketNum)
    //       }
    //     })
    //     // alert('成功')
    //     // wx.checkJsApi({
    //     //   jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //     //   success: function (res) {
    //     //     // 以键值对的形式返回，可用的api值true，不可用为false
    //     //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //     //     console.log('成功：', res)
    //     //     alert('成功' + res)
    //     //   }
    //     // })
    //   })
    //   wx.error(function (res) {
    //     const divI = document.getElementsByClassName('scanCode_info')[0]
    //     divI.style.backgroundColor = ''
    //     _this.$vux.loading.hide()
    //     console.log('微信js-sdk 配置失败000' + res.errMsg)
    //     alert('微信js-sdk 配置失败000' + res.errMsg)
    //   })
    // }
    // sao () {
    //   console.log('开始扫了')
    //   let _this = this
    //   wx.scanQRCode({
    //     needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    //     scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
    //     success: function (res) {
    //       _this.ticketNum = res.resultStr // 当needResult 为 1 时，扫码返回的结果
    //     }
    //   })
    // }
  }
}
</script>
<style scoped lang="scss">
  .scanCode_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f8f8f8;
    position: relative;
  }
  .score_header {
    /*padding: 0;*/
    font-size: 16px;
    /*text-align: center;*/
    width: 100%;
    background-color: rgb(0, 115, 231);
    color: #fff;
    height: 40px;
    line-height: 40px;
    flex: none;
    z-index: 1;
  }
  .return__icon{
    margin-left: 20px;
    width: 20px;
    height: 20px;
    position: absolute;
    /*margin-top: 10px;*/
    /*color: #fff;*/
    /*display: inline-block;*/
  }
  .iconfont {
    margin-top: 10px;
    font-size: 20px;
  }
  .title {
    position: absolute;
    /*display: inline-block;*/
    left: 50%;
    transform: translateX(-50%);
  }
  .scanCode_second {
    margin-top: 18%;
    text-align: center;
    color: #3c3c3c;
  }
</style>
