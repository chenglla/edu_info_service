<template>
  <div class="home-page">
<!--  <div class="home-page" ref="homeWrapper">-->
    <first></first>
    <second v-if="showImg"></second>
    <third></third>
<!--    <third @funcshow="show"></third>-->
    <div class="home_content" ref="homeWrapper">
      <div>
        <four v-show="showImg"></four>
        <five v-show="!showImg"></five>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import first from './first'
import second from './second'
import third from './third'
import four from './four'
import five from './five'
export default {
  components: { four, third, second, first, five },
  name: 'home',
  data () {
    return {
      homeScroll: null,
      key: '',
      // showImg: true
      // showImg: false, // 是否展示全文检索图片
      searchContent: '', // 搜索内容
    }
  },
  watch: {
    showImg () {
      var divScroll = document.getElementsByClassName('home_content')[0]
      if (this.showImg !== '') {
        if (this.showImg === false) {
          divScroll.className = 'home_content five'
        } else if (this.showImg === true) {
          divScroll.className = 'home_content four'
        }
      }
    }
  },
  computed: {
    showImg () {
      return this.$store.state.infoService.showImg
    }
  },
  mounted () {
    this.getInitialData()
    this.init()
    // this.$router.afterEach((to, from, next) => {
    //   window.scrollTo(0, 0)
    // })
    // this.$store.commit('SET_SHOW_IMG', true)
    // console.log(this.$store.state.exam.link)
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.homeScroll = new BScroll(this.$refs.homeWrapper, {
          click: true
        })
      })
    },
    getInitialData () {
      var divScroll = document.getElementsByClassName('home_content')[0]
      if (this.showImg !== '') {
        if (this.showImg === false) {
          divScroll.className = 'home_content five'
        } else if (this.showImg === true) {
          divScroll.className = 'home_content four'
        }
      }
    }
    // 父方法接受参数
    // show (val) {
    //   this.showImg = val.showImg
    //   this.searchContent = val.searchContent
    //   console.log(val + '父组件方法', this.showImg)
    // },
  }
}
</script>
<style scoped="">
  .home-page {
    height: 100%;
    /*height: calc(100% - 50px);*/
    /*overflow: hidden;*/
    /*flex: 1;*/
    /*background: #f8f8f8;*/
    /*background: #fff;*/
  }
  .home_content {
    /*height: calc(100% - 150px);*/
    overflow: hidden;
  }
  .four {
    height: calc(100% - 250px);
  }
  .five {
    height: calc(100% - 150px);
  }
</style>
