<template>
  <div class="special_express_info">
    <div class="score_header">
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
          <div class="s_express_sec_content" v-show="showNo === 0" v-for="(item, inde) in specialExpressList" :key="'origin' + inde">
            <div class="title">{{item.name}}</div>
            <div class="content">
              <span>{{item.author}}</span>
              <span>{{item.time}}</span>
            </div>
          </div>
          <div class="s_express_sec_content" v-show="showNo === 2" v-for="(item, index) in reportList" :key="index" @click="gotoSpcDetail(item)">
            <div class="title">{{item.report.reportTitle}}</div>
            <div class="content">
              <span>{{item.report.author}}</span>
              <span>{{item.report.insertTime | formatDate}}</span>
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
              {{item}}
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
import {getSearchReport} from '@/api/index'
// import specialExpressList from '../assets/data/data.json'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      reportList: [], // 检索报告
      noContent: '', // 没有报告时显示的内容
      showNo: 0, // 是否有此专题报告
      searchContent: '',
      categoryList: ['能源动态监测快报', '先进制造与新材料监测快报', '标准化信息快报', '海洋科技快报', '光电科技快报', '地球科学快报',
        '光信月报', '海洋科学快报', '能源动态监测快报', '先进制造与新材料监测快报', '标准化信息快报', '海洋科技快报', '光电科技快报', '地球科学快报',
        '光信月报', '海洋科学快报', '能源动态监测快报能源动态监测快报能源动态监测快报'],
      showDetail: false,
      specialExpressScroll: null,
      specialExpressList: [{
        name: '类人型人工智能实体的刑事责任主体资格审视',
        author: '王耀彬',
        time: '2020-01-30'
      }, {
        name: '美第五代战机将获得控制无人机的人工智能',
        author: '李洪兴',
        time: '2020-01-31'
      }, {
        name: '搜狗王小川：以语言为核心布局人工智能',
        author: '黄海峰',
        time: '2020-01-19'
      }, {
        name: '一种配网故障人工智能分析方法的研究',
        author: '黄园芳',
        time: '2020-01-29'
      }, {
        name: '类人型人工智能实体的刑事责任主体资格审视',
        author: '王耀彬',
        time: '2020-01-28'
      }, {
        name: '美第五代战机将获得控制无人机的人工智能',
        author: '李洪兴',
        time: '2020-01-27'
      }, {
        name: '类人型人工智能实体的刑事责任主体资格审视',
        author: '黄园芳',
        time: '2020-01-26'
      }, {
        name: '搜狗王小川：以语言为核心布局人工智能',
        author: '王耀彬',
        time: '2020-01-25'
      }, {
        name: '类人型人工智能实体的刑事责任主体资格审视',
        author: '李洪兴',
        time: '2020-01-24'
      }, {
        name: '美第五代战机将获得控制无人机的人工智能',
        author: '王耀彬',
        time: '2020-01-23'
      }]
    }
  },
  computed: {
    type () {
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
    this.showNo = this.flag
    if (this.type === 2) {
      this.getInitial()
    }
  },
  methods: {
    getInitial () {
      this.searchContent = this.$store.state.infoService.speExpreSearch
      this.gotoSearch()
      console.log(this.$store.state.infoService.speExpreSearch)
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
    gotoSearch () {
      if (this.searchContent === '') {
        console.log('搜索内容为空')
      } else {
        this.$store.commit('SET_SPE_EXP_SEARCH', this.searchContent)
        getSearchReport({
          openid: this.openid,
          category: this.searchContent,
          m: 0
        }).then(res => {
          if (res.data.errno === 0) {
            if (res.data.data.length === 0) {
              // console.log(1111111111)
              this.showNo = 1
              this.$store.commit('SET_SPE_EXP_STATUS', 1)
              this.noContent = '暂无此专题报告'
            } else {
              // console.log(222222)
              this.showNo = 2
              this.$store.commit('SET_SPE_EXP_STATUS', 2)
              this.reportList = res.data.data
            }
            console.log('检索报告：', res.data)
          }
        })
        // var content = document.querySelector('.s_express_sec_info')
        // for (const item in content.childNodes) {
        // // for (const item in content.childNodes) {
        //   console.log('item === length', item === length)
        //   console.log('val:', item)
        //   console.log('type:', typeof item)
        //   // console.log(content.childNodes[item].children)
        //   // console.log(content.childNodes[item].childNodes)
        //   if (item <= 9 && content.childNodes[item].childNodes[0].innerHTML.indexOf('配网') > -1) {
        //     // console.log(111111111333)
        //     // console.log(content.childNodes[item].childNodes)
        //     content.childNodes[item].children[0].className = 'title active'
        //     // content.childNodes[item].className = 'tanInfo_content_item current'
        //   }
        // }
        // // this.$store.commit('SET_SHOW_IMG', false)
        // // this.$store.commit('SET_SEARCH_DATA', this.searchContent)
        // // this.showImg = true
        // // const val = {'showImg': this.showImg, 'searchContent': this.searchContent}
        // // this.$emit('funcshow', val)
      }
    },
    selectDetail () { // 专题快报查看右边东西
      this.showDetail = true
    },
    colseDetail () {
      this.showDetail = false
    },
    gotoSpe (index, val) {
      console.log(index)
      // this.$store.commit('SET_SPE_EXP_SEARCH', index + ',' + val)
      // var a = document.querySelector('.tanInfo_content_item')
      var b = document.querySelector('.tanInfo_content')
      console.log(b.childNodes[index])
      console.log(b.childNodes[index].className)
      b.childNodes[index].className = 'tanInfo_content_item current'
      this.showDetail = false
      this.searchContent = val
      this.gotoSearch()
    },
    gotoSpcDetail (val) { // 跳转专题快报详情
      this.$router.push({
        name: 'speExpDetail',
        query: {
          item: val.report.id
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
    height: 50px;
    line-height: 50px;
    flex: none;
    /*z-index: 1;*/
    .iconfont {
      position: absolute;
      right: 15px;
      top: 2px;
      font-size: 20px;
      color: #fff;
    }
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
