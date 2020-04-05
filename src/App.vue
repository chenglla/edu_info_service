<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
    <router-view name="nav"></router-view>
  </div>
</template>

<script>
import {getUserInfo} from './api'
// import wx from 'weixin-js-sdk'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    openid () {
      return this.$store.state.infoService.openid
    }
  },
  watch: {
    '$route': function () {
      this.checkRedict()
    }
  },
  mounted () {
    // console.log('空吗：', localStorage.openid)
    // console.log('空吗2：', localStorage.SET_OPENID)
    document.documentElement.style.fontSize = 14 * document.documentElement.clientWidth / 320 + 'px'
    if (localStorage.openid !== '') {
      this.$store.commit('SET_OPENID', localStorage.openid)
      console.log('openid', localStorage.openid)
    }
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
    this.setWxjs()
  },
  methods: {
    checkRedict () {
      getUserInfo({
        openid: this.openid
      }).then(res => {
        console.log('用户信息：', res.data)
      })
    },
    setWxjs () { // 微信分享接口
      /* eslint-disable */
      let url = encodeURIComponent(window.location.href.split('#')[0])
      // alert('url是啥：' + url)
      // console.log('url是啥：' + url)
      this.$axios.get('http://zhongkeruitong.top/towerImg/search_lu/wechat/getSign?url=' + url).then(res => {
        if (res.data.code === 0) {
          wx.config({
            debug: false,
            appId: res.data.data.appId,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
          })
          // wx.ready(() => {
          //   wx.updateAppMessageShareData(share)
          //   wx.updateTimelineShareData(share)
          // })
        }
      })
      /* eslint-enable */
    }
    //   this.$axios.get('http://www.kgai.tech//getAllInfoByWechatId?wechatId=' + this.openid
    //     // this.$axios(
    //     //   {
    //     // method: 'get',
    //     // url: 'http://www.kgai.tech//getAllInfoByWechatId',
    //     // wechatId: this.openid
    //     // }
    //   ).then(res => {
    //     console.log('成功：', res.data.errno)
    //     console.log('成功码类型：', typeof res.data.errno)
    //     console.log(res.data)
    //     if (res.data.errno === 0) {
    //       // this.$store.commit('SET_USER_NAME', res.data.userLogin.userName)
    //       this.$store.commit('SET_USER_NAME', res.data.nickname)
    //       this.$store.commit('SET_USER_IMG', res.data.userLogin.headimgurl)
    //       if (res.data.userLogin.diyid !== '') {
    //         this.$store.commit('SET_SCHOOLNUM', res.data.userLogin.diyid)
    //         // this.$store.commit('SET_LEVEL_NAME', res.data.gradeLevel)
    //       }
    //       console.log('name :', res.data.nickname)
    //       console.log('img: :', res.data.userLogin.headimgurl)
    //     }
    //   })
    // },
  }
}
</script>

<style lang="scss">
  @import './styles/index.scss'; /*全局自定义样式*/
  #app,
  html, body{
    width: 100%;
    height: 100%;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
  }
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
