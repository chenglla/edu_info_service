<!--<template>-->
<!--  <div class="setInfo_all">-->
<!--    <div class="score_header">-->
<!--      <div class="return__icon" @click="returnBack">-->
<!--        <i class="iconfont icon_lulufanhui"></i>-->
<!--      </div>-->
<!--      <div class="title">设置</div>-->
<!--    </div>-->
<!--    <div class="setInfo_second" ref="setInfo_second">-->
<!--      <div>-->
<!--        &lt;!&ndash;      <div class="setInfo_second_snum">&ndash;&gt;-->
<!--        <x-input title="学号" v-model="content.diyid" disabled class="bind_school_1" text-align="right"></x-input>-->
<!--        &lt;!&ndash;      <x-input class="bind_school" type="password" title="确认密码" placeholder="再次输入密码" text-align="left" v-model="passwod" @on-blur="confirmPassword"></x-input>&ndash;&gt;-->
<!--        &lt;!&ndash;      </div>&ndash;&gt;-->
<!--        <div class="setInfo_second_edit">-->
<!--          <p>修改密码</p>-->
<!--          <div class="setInfo_second_edit_p">-->
<!--            <x-input class="bind_school" type="password" title="原密码" placeholder="请输入原密码" text-align="right" placeholder-align="right" v-model="oldPasswd" @on-blur="confirmOldPassword"></x-input>-->
<!--            <x-input class="bind_school" type="password" title="新密码" placeholder="请输入新密码" text-align="right" placeholder-align="right" v-model="passwd"></x-input>-->
<!--            <x-input class="bind_school" type="password" title="确认密码" placeholder="再次填写确认" text-align="right" placeholder-align="right" v-model="passwod" @on-blur="confirmPassword"></x-input>-->
<!--            <x-button plain class="bind_school_button" @click.native="bindOutUser">完成</x-button>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash;      <div class="setInfo_second_item" @click="editPassword">修改密码<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>&ndash;&gt;-->
<!--        &lt;!&ndash;      <div class="setInfo_second_item" @click="aboutUs">关于我们<i class="iconfont icon_luluchangyongtubiao-xianxingdaochu-zhuanqu-"></i></div>&ndash;&gt;-->
<!--        <div class="setInfo_second_edit">-->
<!--          <p>关于我们</p>-->
<!--          <p class="setInfo_second_edit_p">{{usText}}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import BScroll from 'better-scroll'-->
<!--export default {-->
<!--  data () {-->
<!--    return {-->
<!--      myInfo: {-->
<!--        userName: '',-->
<!--        userImg: ''-->
<!--      },-->
<!--      content: [],-->
<!--      setInfoScroll: null,-->
<!--      oldPasswd: '',-->
<!--      passwd: '',-->
<!--      passwod: '',-->
<!--      usText: '高考预测平台是在整合中科院及教育行业的科技和教育专家基础上，研发出的一款服务考生信息查询与志愿优选的参考推荐系统。\n' +-->
<!--        '通过对高校及所招专业在各省区历年录取情况的海量数据，以及各省区考试情况数据的综合建模分析，且运用大数据、机器学习、算法和数据库等技术，为高考考生提供全方位的信息查询与报考志愿预测与推荐服务。',-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    openid () {-->
<!--      return this.$store.state.exam.openid-->
<!--    }-->
<!--    // schoolNum () {-->
<!--    //   if (this.$store.state.exam.schoolNum !== '') {-->
<!--    //     return this.$store.state.exam.schoolNum-->
<!--    //   } else {-->
<!--    //     return localStorage.SET_SCHOOLNUM-->
<!--    //   }-->
<!--    // }-->
<!--  },-->
<!--  created () {-->
<!--    this.init()-->
<!--  },-->
<!--  mounted () {-->
<!--    this.getUserInfo()-->
<!--    // console.log('youma:', this.schoolNum)-->
<!--  },-->
<!--  methods: {-->
<!--    returnBack () {-->
<!--      this.$router.go(-1)-->
<!--    },-->
<!--    init () {-->
<!--      this.$nextTick(() => {-->
<!--        this.setInfoScroll = new BScroll(this.$refs.setInfo_second, {-->
<!--          click: true-->
<!--        })-->
<!--      })-->
<!--    },-->
<!--    getUserInfo () {-->
<!--      this.$axios.get('http://www.kgai.tech//getAllInfoByWechatId?wechatId=' + this.openid).then(res => {-->
<!--        this.content = res.data.userLogin-->
<!--        console.log(this.content)-->
<!--        // this.myInfo.userName = res.data.userLogin.userName-->
<!--        this.myInfo.userName = res.data.nickname-->
<!--        this.myInfo.userImg = res.data.userLogin.headimgurl-->
<!--      })-->
<!--    },-->
<!--    confirmOldPassword () { // 验证原密码-->
<!--      this.$axios({-->
<!--        url: 'http://www.kgai.tech/rest/passwordMatch',-->
<!--        method: 'get',-->
<!--        params: {-->
<!--          wechatId: this.openid,-->
<!--          diyid: this.content.diyid,-->
<!--          initialPassword: this.oldPasswd-->
<!--        }-->
<!--      }).then(res => {-->
<!--        if (res.data.errno !== 0) {-->
<!--          this.$vux.alert.show({-->
<!--            title: '警告',-->
<!--            content: '原密码不对'-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--      // console.log('原密码对')-->
<!--    },-->
<!--    confirmPassword () {-->
<!--      if (this.passwod !== this.passwd) {-->
<!--        // console.log('bupipei')-->
<!--        this.$vux.alert.show({-->
<!--          title: '警告',-->
<!--          content: '两次密码不一致'-->
<!--        })-->
<!--      } else {-->
<!--        this.$axios({-->
<!--          url: 'http://www.kgai.tech/rest/updatePassword',-->
<!--          method: 'post',-->
<!--          params: {-->
<!--            wechatId: this.openid,-->
<!--            diyid: this.content.diyid,-->
<!--            initialPassword: this.passwod-->
<!--          }-->
<!--        }).then(res => {-->
<!--          if (res.data.errno === 0) {-->
<!--            this.$vux.alert.show({-->
<!--              title: '提示',-->
<!--              content: '修改成功~'-->
<!--            })-->
<!--          }-->
<!--          // const a = res.data.errno-->
<!--          // console.log('修改成功：', a)-->
<!--        })-->
<!--      }-->
<!--    }-->
<!--    // editPassword () {-->
<!--    //   this.$router.push('/editPassword')-->
<!--    // }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped lang="scss">-->
<!--  .setInfo_all {-->
<!--    height: 100%;-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    background: #f8f8f8;-->
<!--  }-->
<!--  .score_header {-->
<!--    font-size: 16px;-->
<!--    width: 100%;-->
<!--    background-color: #42b983;-->
<!--    color: #fff;-->
<!--    height: 40px;-->
<!--    line-height: 40px;-->
<!--    flex: none;-->
<!--    z-index: 1;-->
<!--  }-->
<!--  .return__icon{-->
<!--    margin-left: 20px;-->
<!--    width: 20px;-->
<!--    height: 20px;-->
<!--    display: inline-block;-->
<!--  }-->
<!--  .iconfont {-->
<!--    margin-top: 10px;-->
<!--    font-size: 20px;-->
<!--  }-->
<!--  .title {-->
<!--    display: inline-block;-->
<!--    margin-left: 35%;-->
<!--    transform: translateX(-45%);-->
<!--  }-->
<!--  .setInfo_second {-->
<!--    margin-top: 15px;-->
<!--    position: relative;-->
<!--    overflow: hidden;-->
<!--    height: calc(100% - 50px);-->
<!--    /*margin-top: 10px;*/-->
<!--  }-->
<!--  .setInfo_second_item {-->
<!--    /*margin-top: 10px;*/-->
<!--    padding-left: 20px;-->
<!--    background-color: #fff;-->
<!--    height: 50px;-->
<!--    line-height: 50px;-->
<!--    border-bottom: 1px solid #dcdcdc;-->
<!--  }-->
<!--  .setInfo_second_item .iconfont {-->
<!--    /*color: #f0f0f0;*/-->
<!--    margin-left: 70%;-->
<!--    transform: translateX(-30%);-->
<!--    margin-top: 8px;-->
<!--    margin-right: 20px;-->
<!--    font-size: 18px;-->
<!--  }-->
<!--  .setInfo_second_snum {-->
<!--    height: 40px;-->
<!--    line-height: 40px;-->
<!--    background-color: #fff;-->
<!--    padding-left: 35px;-->
<!--  }-->
<!--  .bind_school_1 {-->
<!--    font-size: 18px;-->
<!--    background-color: #fff;-->
<!--    border-bottom: 1px solid #e9e9e9;-->
<!--    margin-top: 15px;-->
<!--    height: 40px;-->
<!--    padding: 0 34px;-->
<!--  }-->
<!--  .setInfo_second_edit {-->
<!--    /*padding: 3px;*/-->
<!--    box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);-->
<!--    border-radius: 10px;-->
<!--    margin: 20px 10px;-->
<!--    padding: 10px 10px 15px;-->
<!--    background-color: #fff;-->
<!--    p:first-child {-->
<!--      font-weight: bold;-->
<!--      font-size: 18px;-->
<!--      margin-left: 10px;-->
<!--      margin-bottom: 15px;-->
<!--    }-->
<!--    p:nth-child(2) {-->
<!--      margin: 0 10px;-->
<!--      text-indent: 2em;-->
<!--      font-size: 14px;-->
<!--      padding: 5px;-->
<!--      /*box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);*/-->
<!--      /*border-radius: 10px;*/-->
<!--    }-->
<!--  }-->
<!--  /*.setInfo_second_edit_p {*/-->
<!--  /*  margin: 0 10px;*/-->
<!--  /*  text-indent: 2em;*/-->
<!--  /*  font-size: 14px;*/-->
<!--  /*  padding: 5px;*/-->
<!--  /*  box-shadow: 1px 1px 5px 1px rgba(66,185,130,0.4);*/-->
<!--  /*  border-radius: 10px;*/-->
<!--  /*}*/-->
<!--  .bind_school {-->
<!--    /*margin-top: 10px;*/-->
<!--    border-bottom: 1px solid #e9e9e9;-->
<!--    margin: 10px 14px 0;-->
<!--  }-->
<!--  .bind_school_button {-->
<!--    margin-top: 25px;-->
<!--    width: 85%;-->
<!--    border-radius: 99px;-->
<!--    border-color: rgba(66,185,130, 0.9);-->
<!--    /*background-color: #42b982;*/-->
<!--    background-color: rgba(66,185,130, 0.9);-->
<!--    color: #fff;-->
<!--  }-->
<!--  .weui-cell:before{-->
<!--    border-top: 0;-->
<!--  }-->
<!--</style>-->
