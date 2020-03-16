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
      <input type="text" class="third_input" placeholder="搜索" v-model="searchContent" @keyup.enter="gotoSearch" @blur="inputBlur" @focus="getFocus">
      <i class="iconfont iconsousuo" @click="gotoSearch"></i>
<!--      <button class="third_button" @click="gotoSearch">搜索</button>-->
    </div>
<!--    <template>-->
    <div>
      <popover placement="bottom" class="popover_item" style="margin: 20px;position: absolute;top: 40%;" @on-show="onShow" @on-hide="onHide">
<!--      <popover placement="bottom" class="popover_item" style="margin: 20px;position: absolute;top: 40%;" @on-show="onShow" @on-hide="onHide" v-show="showHistory">-->
        <div slot="content" class="popover-demo-content" v-for="(item, index) in searchHistory" :key="index" @click="gotoSelect(item.words)">
          {{item.words}}
        </div>
        <!--        <button class="btn btn-default">fgf</button>-->
      </popover>
    </div>
     <!--    </template>-->
  </div>
</template>
<script>
import {getSearchHistory} from '@/api/index'
import bus from '@/utils/vueBus'
export default {
  data () {
    return {
      showHistory: false,
      searchContent: '', // 搜索内容
      searchHistory: ''
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
    // searchContent () {
    //   this.getFocus()
    //   // this.getSearchHistory()
    // },
    showImg (newVal, oldVal) {
      console.log('图片是否展示，', oldVal, newVal)
      // if (oldVal === false && newVal === true) {
      //   console.log('0000000000')
      var tips = document.querySelector('.vux-popover')
      console.log(tips)
      tips.style.display = 'none'
      console.log(tips)
      // }
    },
    searchData () {
      this.searchContent = this.searchData
    },
    // getSearchHistory () {
    //   if (this.searchContent === '') {
    //     this.getSearchHistory()
    //   }
    // }
  },
  mounted () {
    var a = document.querySelector('.vux-popover')
    console.log(a)
    a.style.display = 'none'
    // this.getSearchHistory()
    this.searchContent = this.searchData
  },
  // beforeDestroy () {
  //   bus.$emit('searchData', this.searchContent)
  // },
  methods: {
    inputBlur () { // 失去焦点
      window.scroll(0, 0)
      if (this.searchContent !== '') {
        var a = document.querySelector('.vux-popover')
        console.log('ddddddddddd')
        a.style.display = 'none'
      }
    },
    getFocus () {
      if (this.searchContent === '') {
        this.getSearchHistory()
      } else {
        var a = document.querySelector('.vux-popover')
        a.style.display = 'none'
      }
    },
    gotoSelect (val) {
      this.searchContent = val
      var a = document.querySelector('.v-transfer-dom')
      // // alert(a)
      // alert(a.style.display)
      // a.style.backgroundColor = 'red'
      // this.gotoSearch()
      // alert(345)
      // var a = document.querySelector('.vux-popover')
      a.style.display = 'none'
    },
    gotoSearch () { // 去搜索
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
    },
    getSearchHistory () { // 获取搜索历史
      var a = document.querySelector('.vux-popover')
      getSearchHistory({
        openid: this.openid
      }).then(res => {
        console.log('搜索历史：', res.data)
        this.searchHistory = res.data.list
        if (this.searchHistory.length > 0) {
          a.style.cssText = 'background-color: #fff;color: #3c3c3c;box-shadow: 0 3px 2px 1px rgba(0, 0, 0 , 0.3);display: block;top: 195px;left: 9%;width: 82%;'
          var jiantou = document.querySelector('.vux-popover-arrow')
          jiantou.style.left = '10%'
          jiantou.style.borderBottom = '5px solid #9c9c9c'
          // a.className = 'vux-popover popover_he'
          // console.log(a)
        }
        // this.showHistory = true
      })
    },
    // getSearchHistory () { // 获取搜索历史
    //   console.log('this.searchContent:', this.searchContent)
    //   var a = document.querySelector('.vux-popover')
    //   if (this.searchContent === '') {
    //     getSearchHistory({
    //       openid: this.openid
    //     }).then(res => {
    //       console.log('搜索历史：', res.data)
    //       this.searchHistory = res.data.list
    //       if (this.searchHistory.length > 0) {
    //         a.style.cssText = 'background-color: #fff;color: #3c3c3c;box-shadow: 0 3px 2px 1px rgba(0, 0, 0 , 0.3);display: block;top: 195px;left: 9%;width: 82%;'
    //         var jiantou = document.querySelector('.vux-popover-arrow')
    //         jiantou.style.left = '10%'
    //         jiantou.style.borderBottom = '5px solid #9c9c9c'
    //         // a.className = 'vux-popover popover_he'
    //         // console.log(a)
    //       }
    //       // this.showHistory = true
    //     })
    //   } else {
    //     a.style.display = 'none'
    //   }
    // },
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    },
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
  .popover_he {
    position: absolute;
    background-color: #fff;
    color: #000;
    border-radius: 3px;
    z-index: 500;
    box-shadow: 0 3px 2px 1px rgba(0, 0, 0 , 0.3);
    display: block;
    top: 195px;
    left: 10%;
    width: 80%;
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
  .popover-demo-content {
    padding: 5px 10px;
    white-space: nowrap; // 强制一行显示
    width: 90%;
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 超出部分显示省略号
  }
</style>
