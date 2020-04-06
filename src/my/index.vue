<template>
  <div class="my_info">
<!--    <div class="notification">-->
      <i class="iconfont icon_luluxiaoxitongzhi1"></i>
<!--    </div>-->
    <div class="my_info_first">
      <div class="my_info_first_info">
<!--      <div class="my_info_first_info" @click="myInfoDetail">-->
        <div class="user-basic">
<!--          <img class="user-logo" src="../assets/img/2.png"/>-->
          <img class="user-logo" :src="myInfo.userImg"/>
        </div>
        <div class="user_name_info">
<!--          <div class="user-name">教育文献情报服务</div>-->
          <div class="user-name">{{myInfo.userName}}</div>
<!--          <div class="vip-flag">未实名</div>-->
        </div>
<!--        <div class="user_iconfont">-->
<!--          <i class="iconfont iconright"></i>-->
<!--        </div>-->
<!--        <i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i>-->
      </div>
<!--      <div class="my_info_first_item" @click="bindAccount"><i class="iconfont icon_lulurenyuanbangding"></i>绑定账号<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>-->
<!--      <div class="my_info_first_item" @click="myBBS"><i class="iconfont iconquanzi"></i>我的圈子<i class="iconfont iconright"></i></div>-->
      <div class="my_info_first_item" @click="gotoOption('collect')"><i class="iconfont iconlunwentimu"></i>论文收藏<i class="iconfont iconright"></i></div>
      <div class="my_info_first_item" @click="gotoOption('SpeCollect')"><i class="iconfont iconshoucang"></i>快报收藏<i class="iconfont iconright"></i></div>
      <div class="my_info_first_item" @click="gotoOption('myDownLoad')"><i class="iconfont iconxiazai6"></i>资料库<i class="iconfont iconright" style="margin-left: 69%"></i></div>
      <div class="my_info_first_feedback" @click="gotoOption('ideaFeedback')"><i class="iconfont iconyijianfankui1"></i>意见反馈<i class="iconfont iconright" style="margin-left: 65%"></i></div>
      <div class="my_info_first_item" @click="gotoOption('aboutUs')"><i class="iconfont iconguanyuwomen1"></i>关于我们<i class="iconfont iconright"></i></div>
      <div class="my_info_first_item" @click="gotoOption('setInfo')"><i class="iconfont iconshezhi1"></i>设置<i class="iconfont iconright" style="margin-left: 73%"></i></div>
<!--      <div class="my_info_first_set" @click="gotoOption('setInfo')"><i class="iconfont iconshezhi1"></i>设置<i class="iconfont iconright" style="margin-left: 73%"></i></div>-->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {getUserInfo} from '../api'

export default {
  data () {
    return {
      myInfo: {
        userName: '',
        userImg: ''
      }
    }
  },
  computed: {
    ...mapState({
      openid: state => state.infoService.openid
    })
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getUserInfo({
        openid: this.openid
      }).then(res => {
        console.log('用户信息：', res.data)
        this.myInfo.userName = res.data.userinfo.nickName
        this.myInfo.userImg = res.data.userinfo.headimgurl
      })
    //   this.$axios.get('http://www.kgai.tech//getAllInfoByWechatId?wechatId=' + this.openid
    //   //   {
    //   //   url: 'http://www.kgai.tech//getAllInfoByWechatId',
    //   //   wechatId: this.openid
    //   // }
    //   ).then(res => {
    //     // this.myInfo.userName = res.data.userLogin.userName
    //     this.myInfo.userName = res.data.nickname
    //     this.myInfo.userImg = res.data.userLogin.headimgurl
    //   })
    },
    gotoOption (val) {
      this.$router.push({name: val})
    },
    // collect () {
    //   this.$router.push({path: '/collect'})
    //   // this.$router.push('/collect')
    // },
    // setInfo () {
    //   this.$router.push('/setInfo')
    // },
    // bindAccount () {
    //   this.$router.push('/bindAccount')
    // },
    myInfoDetail () {
      this.$router.push('/myInfoDetail')
    },
    // myBBS () {
    //   this.$router.push('/myBBS')
    // },
    // suggestFeedback () {
    //   this.$router.push('/ideaFeedback')
    // },
    // statement () {
    //   this.$router.push('/statement')
    // }
  }
}
</script>
<style scoped lang="scss">
  .my_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    /*background: #f8f8f8;*/
    position: relative;
  }
.my_info:after { // 实现背景图片的透明度为0.8
  content: '';
  background: #f8f8f8 url("../../src/assets/img/28.jpg") no-repeat;
  opacity: 0.8;
  background-size: 100% 200px;
  z-index: -1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
}
.icon_luluxiaoxitongzhi1 {
  font-size: 18px;
  position: absolute;
  color: rgb(196, 223, 184);
  /*color: indianred;*/
  margin-left: 88%;
  margin-top: 15px;
}
  .my_info_first {
    margin-top: 30%;
    /*padding-left: 20px;*/
    font-size: 15px;
    .iconfont {
      font-size: 17px;
      /*margin-left: 70%;*/
    }
  }
  .my_info_first_info {
    /*line-height: 30px;*/
    padding-left: 20px;
    height: 60px;
    margin-bottom: 30px;
    .iconfont {
      color: #f0f0f0;
      margin-left: 46%;
      /*display: inline-block;*/
      /*transform: translateX(-31%);*/
      margin-right: 20px;
      /*position: fixed;*/
      /*margin-top: 25px;*/
    }
  }
  .user-basic {
    height: 60px;
    width: 60px;
    float: left;
    /*line-height: 70px;*/
    /*display: inline-block;*/
  }
  .user-logo {
    height: 100%;
    width: 100%;
    /*margin-top: 10px;*/
    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);
    border-radius: 50%;
    /*border-radius: 10px;*/
    /*display: inline-block;*/
  }
  /*div.ellipsis {*/
  /*  padding-left: 5px;*/
  /*  text-align: left;*/
  /*  text-overflow:ellipsis;*/
  /*  overflow: hidden;*/
  /*  white-space: nowrap;*/
  /*}*/
  .user_name_info {
    text-overflow:ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 60px;
    width: 130px;
    max-width: 130px;
    /*overflow: hidden;*/
    margin-top: 20px;
    float: left;
    /*position: relative;*/
    /*height: 70px;*/
    /*border: 1px solid red;*/
    margin-left: 15px;
    /*display: inline-block;*/
    /*line-height: 35px;*/
  }
  .user_iconfont {
    /*display: inline-block;*/
    float: right;
    margin-top: 8px;
    margin-right: 20px;
    /*transform: translateX(-70%);*/
    line-height: 60px;
  }
  .user-name {
    /*margin-top: -44px;
    position: fixed;*/
    font-size: 16px;
  }
  .vip-flag {
    /*position: fixed;
    margin-top: -20px;*/
    color: #9c9c9c;
    font-size: 6px;
    border: 1px dashed hotpink;
    border-radius: 4px;
  }
  .my_info_first_item {
    padding-left: 20px;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dcdcdc;
  }
  .my_info_first_feedback {
    padding-left: 20px;
    background-color: #fff;
    margin-top: 13px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dcdcdc;
  }
  .my_info_first_set {
    padding-left: 20px;
    background-color: #fff;
    margin-top: 13px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dcdcdc;
  }
  .my_info_first_item i:nth-child(2) {
    margin-left: 65%;
  }
  /*.icon_lulurenyuanbangding {*/
  /*  margin-right: 8px;*/
  /*  color: #72b7e4;*/
  /*}*/
  .iconquanzi {
    margin-right: 8px;
    color: #42b983;
  }
  .iconshoucang {
    color: red;
    margin-right: 8px;
  }
  .iconxiazai6 {
    color: #CC9999;
    margin-right: 8px;
  }
  .iconxinchanpin {
    color: red;
    margin-right: 8px;
  }
  .iconshezhi1 {
    color: #bcbcbc;
    /*color: #BEE9F9;*/
    margin-right: 8px;
  }
  .iconright {
    color: #acacac;
  }
  .iconyijianfankui1 {
    color: #ffbe00;
    margin-right: 8px;
  }
  .iconguanyuwomen1 {
    color: rgb(0, 115, 231);
    margin-right: 8px;
  }
  .iconlunwentimu {
    color: #42b983;
    margin-right: 8px;
  }
  .icon_lulumianzeshengmingcopy {
    color: #FFCCCC;
    margin-right: 8px;
  }
</style>
