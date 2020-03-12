<!--<template>-->
<!--  <div class="feedBack_info">-->
<!--    <div class="score_header">-->
<!--      <div class="return__icon" @click="returnBack">-->
<!--        <i class="iconfont icon_lulufanhui"></i>-->
<!--      </div>-->
<!--      <div class="title">功能异常</div>-->
<!--    </div>-->
<!--    <div class="feedBack_second">-->
<!--&lt;!&ndash;      <group title="反馈">&ndash;&gt;-->
<!--        <x-input placeholder="请输入功能点：如录入成绩" class="feedBack_second_input" v-model="title"></x-input>-->
<!--        <x-textarea placeholder="请描述具体问题" :show-counter="false" :rows="5" autosize class="feedBack_second_input" v-model="content"></x-textarea>-->
<!--        <x-button plain class="bind_school_button" @click.native="submitFeedBack">提交</x-button>-->
<!--&lt;!&ndash;        <x-textarea :max="200" name="description" placeholder="具体描述" :autosize="true"></x-textarea>&ndash;&gt;-->
<!--&lt;!&ndash;      </group>&ndash;&gt;-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import {feedBack} from '@/api/index'-->
<!--import { XTextarea } from 'vux'-->
<!--export default {-->
<!--  components: {XTextarea},-->
<!--  data () {-->
<!--    return {-->
<!--      title: '',-->
<!--      content: ''-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    openid () {-->
<!--      return this.$store.state.exam.openid-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    returnBack () {-->
<!--      this.$router.go(-1)-->
<!--    },-->
<!--    submitFeedBack () {-->
<!--      feedBack({-->
<!--        userOpenid: this.openid,-->
<!--        content: this.title + '&#45;&#45;' + this.content-->
<!--      }).then(res => {-->
<!--        if (res.data.code === 0) {-->
<!--          this.$vux.toast.text('反馈成功啦~')-->
<!--        }-->
<!--      })-->
<!--      // console.log('提交')-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--  .feedBack_info {-->
<!--    height: 100%;-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    /*background: #fff;*/-->
<!--    background: #f8f8f8;-->
<!--  }-->
<!--  .score_header {-->
<!--    /*padding: 0;*/-->
<!--    font-size: 16px;-->
<!--    /*text-align: center;*/-->
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
<!--    /*margin-top: 10px;*/-->
<!--    /*color: #fff;*/-->
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
<!--  .feedBack_second {-->
<!--    margin-top: 20px;-->
<!--    /*border: 1px solid red;*/-->
<!--  }-->
<!--  .feedBack_second_input {-->
<!--    padding-top: 25px;-->
<!--  }-->
<!--  .bind_school_button {-->
<!--    margin-top: 25px;-->
<!--    width: 85%;-->
<!--    height: 40px;-->
<!--    line-height: 40px;-->
<!--    border-radius: 99px;-->
<!--    border-color: rgba(66,185,130, 0.9);-->
<!--    /*background-color: #42b982;*/-->
<!--    background-color: rgba(66,185,130, 0.9);-->
<!--    color: #fff;-->
<!--  }-->
<!--</style>-->
