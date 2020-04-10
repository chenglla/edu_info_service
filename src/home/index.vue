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
        <five v-show="!showImg" ref="list" :page="page"></five>
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
      page: 0
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
    // this.$nextTick(() => {
    //   this.$refs.list.init()
    // })
    // this.$router.afterEach((to, from, next) => {
    //   window.scrollTo(0, 0)
    // })
    // this.$store.commit('SET_SHOW_IMG', true)
    // console.log(this.$store.state.exam.link)
  },
  methods: {
    init () {
      this.$nextTick(() => {
        // this.homeScroll = new BScroll(this.$refs.homeWrapper, {
        //   click: true
        // })
        console.log(window)
        if (this.homeScroll) {
          this.homeScroll.refresh()
        } else {
          // this.historyScroll = new BScroll(this.$refs.content, {
          //   probeType: 3,
          //   click: true
          // })
          this.homeScroll = new BScroll(this.$refs.homeWrapper, {
            scrollY: true,
            click: true,
            probeType: 3,
            // pullDownRefresh: true,
            pullDownRefresh: {
              // type: true,
              threshold: 40,
              stop: 20
            },
            pullUpLoad: {
              threshold: 30,
              moreTxt: '加载中',
              noMoreTxt: '没有更多数据了'
            }
          })
          // console.log(4444444)
          // this.homeScroll.on('scroll', (pos) => {
          //   // console.log(window)
          //   this.scrollY = Math.abs(Math.round(pos.y))
          //   console.log(this.scrollY)
          //   // console.log(window.scrollTop())
          //   console.log('滑动')
          // })

          this.homeScroll.on('pullingUp', () => {
            if(this.$refs.list.total===''||this.page<this.$refs.list.total||this.page===0){
            // this.page 会取整，例如total=67，page会停在70

              console.log('上滑')
              this.page += 10
              if(this.$refs.list.total===''){
               this.page=0
              }

              alert(this.page)
              this.$refs.list.getSearchResult()
              this.$nextTick(() => {
                this.homeScroll.finishPullUp()
              })
            }
            // if (!this.loading) {
            // // if (!this.end && !this.loading) {
            //   console.log('上滑')
            //   // this.nextPage()
            //   this.$nextTick(() => {
            //     this.historyScroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
            //     this.historyScroll && this.historyScroll.finishPullUp()
            //   })
            // }
          })
          this.homeScroll.on('pullingDown', () => {
            console.log('下滑')
            this.$nextTick(() => {
              this.homeScroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
              this.homeScroll && this.homeScroll.finishPullDown()
            })
          })
        }
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
