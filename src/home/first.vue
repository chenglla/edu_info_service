<template>
  <div>
    <div class="content">
      <div class="score_header" v-if="showImg && showImg !== ''">
        <div class="title">首页</div>
      </div>
      <div  class="score_header" v-if="!showImg && showImg !== ''">
        <div class="return__icon" @click="returnBack">
          <i class="iconfont iconfanhui"></i>
        </div>
        <div class="title">全文检索</div>
      </div>
      <div class="first_dialog">
        <span class="add_score" @click="scanCode">
          <span>扫一扫</span>
<!--          <i class="iconfont iconsaoma"></i>-->
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    showImg () {
      console.log('showImg:', this.$store.state.infoService.showImg)
      return this.$store.state.infoService.showImg
    }
  },
  methods: {
    scanCode () {
      this.$router.push('/scanCode')
    },
    returnBack () {
      this.$store.commit('SET_SHOW_IMG', true)
      this.$store.commit('SET_SEARCH_DATA', '')
      // this.$router.push({path: ''})
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    font-size: 18px;
    width: 100%;
    background-color: rgb(0, 115, 231);
    color: #fff;
    height: 45px;
    line-height: 45px;
  }
  .iconfont{
    color: #fff;
    font-size: 23px;
  }
  .score_header {
    text-align: center;
    letter-spacing: 0.2em;
    position: relative;
  }
  .return__icon{
    position: absolute;
    margin-left: 15px;
  }
  .iconfanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  .first_dialog{
    position: absolute;
    top: 0;
    right: 4px;
    padding: 0 10px;
    color: #f3f3f3;
  }
  .add_score{
    font-size: 14px;
    display: inline-block;
  }
</style>
