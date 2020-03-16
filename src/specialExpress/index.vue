<template>
  <div class="special_express_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">专题快报</div>
      <i class="iconfont iconsanheng1" @click="selectDetail" v-if="!showDetail"></i>
      <i class="iconfont iconchahao21" @click="colseDetail" v-if="showDetail"></i>
    </div>
    <div class="special_express_second" ref="specialExpressSecond">
      <div class="detailInfo">
        <div class="search_info">
          <input type="text" class="third_input" placeholder="搜索" v-model="searchContent" @input="gotoSearch" @keyup.enter="gotoSearch"  @blur="inputBlur">
          <i class="iconfont iconsousuo" @click="gotoSearch"></i>
        </div>
<!--        <div class="s_express_sec_title">先进制造与新材料动态监测快报（总共74期）</div>-->
        <div class="s_express_sec_info">
          <div class="s_express_sec_content" v-show="showNo === 0" v-for="(item, inde) in reportList" :key="'origin' + inde" @click="gotoSpcDetail(item)">
            <div class="title">{{item.report.reportTitle}}</div>
            <div class="content">
              <span>{{item.report.author}}</span>
              <span>{{item.report.insertTime | formatDate}}</span>
            </div>
            <div>
              <span>类别：{{item.report.category}}</span>
            </div>
          </div>
          <div class="s_express_sec_content" v-show="showNo === 2" v-for="(item, index) in reportList" :key="index" @click="gotoSpcDetail(item)">
            <div class="title">{{item.report.reportTitle}}</div>
            <div class="content">
              <span>{{item.report.author}}</span>
              <span>{{item.report.insertTime | formatDate}}</span>
            </div>
            <div>
              <span>类别：{{item.report.category}}</span>
            </div>
          </div>
          <div class="noData" v-show="showNo === 1">{{noContent}}</div>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showDetail" position="right">
        <div class="tanInfo">
          <div class="tanInfo_title">
            订阅类别
          </div>
          <div class="tanInfo_content">
            <div v-for="(item, index) in categoryList" :key="index" class="tanInfo_content_item" @click="gotoSpe(index, item)">
              {{item.category}}
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import {formatDate} from '../utils/date.js'
import BScroll from 'better-scroll'
import {TransferDom} from 'vux'
import {getSearchReport, getReportCategory} from '@/api/index'
// import specialExpressList from '../assets/data/data.json'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      reportList: [], // 检索报告
      noContent: '', // 没有报告时显示的内容
      showNo: 0, // 是否有此专题报告,0表示初始状态，啥都没搜索；1表示没有搜到；2表示搜索到了
      searchContent: '',
      requestParam: {}, // 请求参数
      categoryList: [], // 分类列表
      showDetail: false,
      specialExpressScroll: null,
      category: '', // 订阅分类
    }
  },
  computed: {
    type () { // 1表示点击下面的按钮进入快报，2表示从详情页返回的快报
      return parseInt(this.$route.query.type)
    },
    openid () {
      return this.$store.state.infoService.openid
    },
    flag () {
      return parseInt(this.$store.state.infoService.speExpreStatus)
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
      // return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted () {
    this.init()
    this.getReportCategory() // 获取分类
    this.showNo = this.flag
    // if (this.type === 2) {
    //   this.getInitial()
    // } else if (this.type === 1) { // 表示点击按钮进入快报
    //   this.requestParam = {
    //     m: 0,
    //     openid: this.openid
    //   }
    //   this.getRequestReport()
    // }
  },
  methods: {
    returnBack () { // 点击返回键的话，所有的搜索全清空
      this.category = ''
      this.searchContent = ''
      this.$store.commit('SET_SPE_EXP_SEARCH', '')
      this.$store.commit('SET_SPE_EXP_CATEGORY', '')
      var itemList = document.querySelectorAll('.tanInfo_content_item')
      // console.log(typeof itemList)
      for (var i = 0; i < itemList.length; i++) { // 排他思想
        itemList[i].className = 'tanInfo_content_item'
      }
      this.requestParam = {
        m: 0,
        openid: this.openid
      }
      this.getRequestReport()
      var returnIcon = document.querySelector('.return__icon')
      returnIcon.style.display = 'none'
      // this.$router.go(-1)
    },
    getInitial () { // 从详情页过来的话，要查看下之前存下的搜索词
      this.searchContent = this.$store.state.infoService.speExpreSearch
      const categoryIndex = this.$store.state.infoService.speExpreCategory
      console.log('有无分类：', categoryIndex)
      if (categoryIndex !== '') {
        this.category = categoryIndex.split(',')[0]
        this.categoryBold(parseInt(categoryIndex.split(',')[1]))
      }
      // console.log('2过来留下的搜索词：', this.$store.state.infoService.speExpreSearch)
      this.gotoSearch()
      // console.log(this.$store.state.infoService.speExpreSearch)
    },
    init () {
      this.$nextTick(() => {
        this.specialExpressScroll = new BScroll(this.$refs.specialExpressSecond, {
          click: true
        })
      })
    },
    inputBlur () {
      window.scroll(0, 0)
    },
    getReportCategory () { // 获取所有快报分类
      getReportCategory({
        openid: this.openid
      }).then(res => {
        this.categoryList = res.data.list
        console.log('分类：', this.categoryList)
        this.$nextTick(() => {
          if (this.type === 2) {
            this.getInitial()
          } else if (this.type === 1) { // 表示点击按钮进入快报
            this.requestParam = {
              m: 0,
              openid: this.openid
            }
            this.getRequestReport()
          }
        })
      })
    },
    getRequestReport () { // 获取请求快报
      getSearchReport(this.requestParam).then(res => {
        if (res.data.errno === 0) {
          if (res.data.data.length === 0) {
            this.showNo = 1
            this.$store.commit('SET_SPE_EXP_STATUS', 1)
            this.noContent = '暂无此专题报告'
          } else {
            this.showNo = 2
            this.$store.commit('SET_SPE_EXP_STATUS', 2)
            this.reportList = res.data.data
          }
          // console.log('检索报告：', res.data)
        }
        // this.reportList = res.data.data
        console.log('所有快报：', res.data.data)
      })
    },
    gotoSearch () {
      // if (this.searchContent === '') {
      //   console.log('搜索内容为空')
      // } else {
      var returnIcon = document.querySelector('.return__icon')
      returnIcon.style.display = 'block'
      this.$store.commit('SET_SPE_EXP_SEARCH', this.searchContent)
      if (this.category !== '') {
        this.requestParam = {
          category: this.category,
          words: this.searchContent,
          m: 0,
          openid: this.openid
        }
        this.getRequestReport()
      } else {
        this.requestParam = {
          words: this.searchContent,
          m: 0,
          openid: this.openid
        }
        this.getRequestReport()
      }
      // }
    },
    //     // var content = document.querySelector('.s_express_sec_info')
    //     // for (const item in content.childNodes) {
    //     // // for (const item in content.childNodes) {
    //     //   console.log('item === length', item === length)
    //     //   console.log('val:', item)
    //     //   console.log('type:', typeof item)
    //     //   // console.log(content.childNodes[item].children)
    //     //   // console.log(content.childNodes[item].childNodes)
    //     //   if (item <= 9 && content.childNodes[item].childNodes[0].innerHTML.indexOf('配网') > -1) {
    //     //     // console.log(111111111333)
    //     //     // console.log(content.childNodes[item].childNodes)
    //     //     content.childNodes[item].children[0].className = 'title active'
    //     //     // content.childNodes[item].className = 'tanInfo_content_item current'
    //     //   }
    //     // }
    //     // // this.$store.commit('SET_SHOW_IMG', false)
    //     // // this.$store.commit('SET_SEARCH_DATA', this.searchContent)
    //     // // this.showImg = true
    //     // // const val = {'showImg': this.showImg, 'searchContent': this.searchContent}
    //     // // this.$emit('funcshow', val)
    //   }
    // },
    selectDetail () { // 专题快报查看右边东西
      this.category = ''
      this.showDetail = true
    },
    colseDetail () {
      this.showDetail = false
    },
    gotoSpe (index, val) {
      console.log(index)
      var returnIcon = document.querySelector('.return__icon')
      returnIcon.style.display = 'block'
      this.categoryBold(index)
      // var b = document.querySelector('.tanInfo_content')
      // var itemList = document.querySelectorAll('.tanInfo_content_item')
      // // console.log(typeof itemList)
      // for (var i = 0; i < itemList.length; i++) { // 排他思想
      //   itemList[i].className = 'tanInfo_content_item'
      // }
      // b.childNodes[index].className = 'tanInfo_content_item current'
      this.$store.commit('SET_SPE_EXP_CATEGORY', val.category + ',' + index)
      this.$store.commit('SET_SPE_EXP_SEARCH', '')
      this.searchContent = ''
      this.showDetail = false
      this.category = val.category
      // this.searchContent = val
      this.requestParam = {
        category: this.category,
        m: 0,
        openid: this.openid
      }
      this.getRequestReport()
    },
    categoryBold (index) { // 提出的分类加粗方法
      var b = document.querySelector('.tanInfo_content')
      var itemList = document.querySelectorAll('.tanInfo_content_item')
      // console.log(typeof itemList)
      for (var i = 0; i < itemList.length; i++) { // 排他思想
        itemList[i].className = 'tanInfo_content_item'
      }
      b.childNodes[index].className = 'tanInfo_content_item current'
    },
    gotoSpcDetail (val) { // 跳转专题快报详情
      this.$router.push({
        name: 'speExpDetail',
        query: {
          item: val.report.id,
          type: 'list' // 从列表页过去
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .special_express_info {
    height: 100%;
    color: #3c3c3c;
  }
  .score_header {
    z-index: 999;
    text-align: center;
    letter-spacing: 0.2em;
    position: relative;
    font-size: 18px;
    width: 100%;
    background-color: rgb(0, 115, 231);
    color: #fff;
    height: 45px;
    line-height: 45px;
    flex: none;
    /*z-index: 1;*/
    .iconsanheng1, .iconchahao21 {
      position: absolute;
      right: 15px;
      top: 1px;
      font-size: 20px;
      color: #fff;
    }
  }
  .return__icon{
    display: none;
    position: absolute;
    margin-left: 15px;
  }
  .iconfanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  .special_express_second {
    margin-top: 13px;
    height: calc(100% - 100px);
    overflow: hidden;
    /*.s_express_sec_title {*/
    /*  background-color: rgb(239, 220, 196);*/
    /*  text-align: center;*/
    /*  font-size: 14px;*/
    /*  line-height: 24px;*/
    /*}*/
  }
  .search_info {
    border: 1px solid #bcbcbc;
    margin: 10px 15px;
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
  .detailInfo {
    /*margin-top: 10px;*/
    /*padding-bottom: 20px;*/
  }
  .s_express_sec_info {
    margin: 5px 20px 10px;
    padding-bottom: 20px;
    .s_express_sec_content {
      padding: 8px 0;
      border-bottom: 1px solid #ececec;
      .title {
        color: #3c3c3c;
        /*color: #009966;*/
        /*color: #44BF87;*/
      }
      span {
        font-size: 13px;
        color: #9c9c9c;
        margin-right: 10px;
      }
      .active {
        color: rgb(0, 115, 231);
      }
    }
  }
  .tanInfo {
    margin-top: 60px;
    width: 200px;
    letter-spacing: 0.1em;
  }
  .tanInfo_title {
    margin-left: 15px;
    color: #9c9c9c;
    font-size: 14px;
  }
  .tanInfo_content {
    margin-top: 7px;
  }
  .current {
    font-weight: bold;
  }
  .tanInfo_content_item {
    padding: 5px 15px 3px;
    color: #666;
    font-size: 15px;
    display: inline-block;
    white-space: nowrap;
    width: calc(100% - 25px);
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .noData {
    font-size: 14px;
    margin-top: 25%;
    text-align: center;
    color: #9c9c9c;
  }
</style>
