<template>
  <div class="third_info">
    <div class="search_info">
<!--      <search-->
<!--        @on-result-click="resultClick"-->
<!--        @on-change="getResult"-->
<!--        :results="results"-->
<!--        v-model="key"-->
<!--        class="searchColor"-->
<!--        :placeholder="placeholder"-->
<!--        @on-submit="onSubmit"-->
<!--        @on-cancel="cancelSearch"-->
<!--        auto-scroll-to-top-->
<!--        ref="search"></search>-->
      <input type="text" class="third_input" placeholder="搜索" v-model="searchContent" @keyup.enter="gotoSearch"  @blur="inputBlur">
      <i class="iconfont iconsousuo" @click="gotoSearch"></i>
<!--      <button class="third_button" @click="gotoSearch">搜索</button>-->
    </div>
  </div>
</template>
<script>
// import {searchAll} from '@/api/index'
import bus from '@/utils/vueBus'
export default {
  data () {
    return {
      searchContent: '', // 搜索内容
      // showImg: false, // 图片是否展示
    }
  },
  computed: {
    openid () {
      return this.$store.state.infoService.openid
    },
    showImg () {
      return this.$store.state.infoService.showImg
    },
    searchData () {
      // console.log('搜索内容：', this.$store.state.infoService.searchData)
      return this.$store.state.infoService.searchData
    }
  },
  watch: {
    searchData () {
      this.searchContent = this.searchData
    }
  },
  mounted () {
    this.searchContent = this.searchData
  },
  // beforeDestroy () {
  //   bus.$emit('searchData', this.searchContent)
  // },
  methods: {
    inputBlur () {
      window.scroll(0, 0)
    },
    gotoSearch () {
      if (this.searchContent === '') {
        console.log('搜索内容为空')
      } else {
        // console.log('hahahah')
        this.$store.commit('SET_SHOW_IMG', false)
        this.$store.commit('SET_SEARCH_DATA', this.searchContent)
        // sendMsg () {
        // bus.$emit('searchData', this.searchContent)
        // }
        // searchAll({
        //   words: this.searchContent,
        //   // from: 3,
        //   openid: this.openid
        // }).then(res => {
        //   console.log(res.data)
        // })
        // this.showImg = true
        // const val = {'showImg': this.showImg, 'searchContent': this.searchContent}
        // this.$emit('funcshow', val)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .third_info {
    padding-top: 15px;
    background-color: #fff;
    padding-bottom: 15px;
  }
  .search_info {
    border: 1px solid #3c3c3c;
    margin: 0 15px;
    position: relative;
    /*border-radius: 10px;*/
    /*margin-top: 10px;*/
  }
  .third_input {
    margin-left: 10px;
    border: 0;
    height: 35px;
    width: 81%;
    outline: 0;
  }
  .iconsousuo {
    position: absolute;
    font-weight: bold;
    float: right;
    right: 8px;
    top: 6px;
  }
  /*.third_button {*/
  /*  !*float: right;*!*/
  /*  right: 1px;*/
  /*  color: #fff;*/
  /*  !*font-size: 14px;*!*/
  /*  text-align: center;*/
  /*  background-color: rgba(0, 112, 192, 0.8);*/
  /*  border-color: rgba(0, 112, 192, 0.8);*/
  /*  border-radius: 5px;*/
  /*  padding: 3px 7px 5px;*/
  /*  outline: 0;*/
  /*}*/
</style>
