<template>
  <div class="collect_info">
      <div class="score_header">
        <div class="return__icon" @click="returnBack">
          <i class="iconfont iconfanhui"></i>
        </div>
        <div class="title">关于我们</div>
      </div>
      <div class="contentInfo" ref="content">
        <div class="content" style="position: relative">
          <h3>智禾搜论文产品服务介绍</h3>
          <div class="text_body">
            <p>智禾搜论文系统将不同来源的论文信息整合在一起并以易读的形式再现给用户，为用户提供大数据下的论文搜索及快报搜索服务，并向用户提供高效的、准确的、安全的搜索体验。</p>
            <p>该产品实现了对论文及快报文章内容的全文检索、关键字检索、模糊检索、历史检索，即通过输入论文关键词或内容即可完成对相关论文的快速检索，也可通过“扫一扫”功能，对论文进行识别搜索。同时该产品更加关注用户的个性化需求，满足用户对论文及快报的查看、下载、转发和收藏的需要，提升了阅读体验。</p>
            <p style="font-weight: bold;text-indent: 0">主要功能 :</p>

            <p>1、论文搜索 :</p>
            <p>点击公众号左下方“搜论文”，即可跳转到论文全文搜索界面，输入论文题目或关键词后即可进行全文搜索，也可通过搜索历史或者浏览历史进行文章的快速搜索。选择相应文章即可查看该论文的论文摘要等信息，点击右下方“＋”号按钮即可对论文进行“收藏”，“下载”，“转发”功能。也可以通过点击论文下的“收藏”，“下载”，“分享”，对论文进行快速操作。</p>
            <div class="imgInfo one">
              <img src="../assets/img/图1.png" alt="" @load="gotoLoad()">
            </div>
            <p>2、快报搜索 :</p>
            <p>点击公众号中下方“读快报”，即可跳转到专题快报搜索界面，输入要搜索的快报名称或关键词后即可进行快报搜索，也可以滑动下方目录栏快速浏览最新快报。点击自己想要查看的快报即可查看该快报的本期摘要。点击右下方“＋”号按钮即可对论文进行“收藏”，“下载”，“转发”。此外点击右上角功能栏，即可查看专题快报的订阅类别，方便用户进行类别切换。</p>
            <div class="imgInfo two">
              <img src="../assets/img/图2.png" alt="" @load="gotoLoad()">
            </div>
            <p>3、我的功能 :</p>
            <p>点击公众号右下方“我的”，即可跳转到我的功能界面，其中可以查看自己的“论文收藏”，“快报收藏”，设置等功能，为用户提供个性化操作服务。</p>
            <div class="imgInfo three">
              <img src="../assets/img/图3.png" alt="" @load="gotoLoad()">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      aboutScroll: null
    }
  },
  mounted () {
    this.init()
    // this.init()
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'my'})
    },
    gotoLoad () {
      this.aboutScroll && this.aboutScroll.refresh()
    },
    init () {
      this.$nextTick(() => {
        this.aboutScroll = new BScroll(this.$refs.content, {
          click: true,
          bounce: false
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  /*头部标题*/
  .collect_info {
    height: 100%;
  }
  .score_header {
    text-align: center;
    letter-spacing: 0.2em;
    /*position: relative;*/
    font-size: 18px;
    width: 100%;
    background-color: rgb(0, 115, 231);
    color: #fff;
    height: 45px;
    line-height: 45px;
    flex: none;
    z-index: 1;
  }
  .return__icon{
    position: absolute;
    margin-left: 15px;
  }
  .iconfanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  /*文本div*/
  .contentInfo{
    background-color: #fff;
    /*position: relative;*/
    color: #3c3c3c;
    overflow: hidden;
    height: calc(100% - 52px);
  }
  .content{
    /*position: relative;*/
    padding: 10px 15px;
  }
  /*文本标题*/
  h3{
    padding: 15px 0 10px;
    border-bottom: 1px dashed darkgray;/* dotted,dashed*/
  }

  .text_body {
    margin-top: 10px;
    .imgInfo {
      -webkit-backface-visibility: hidden;
      -webkit-transform-style: preserve-3d;
      overflow: hidden;
      text-align: center;
      margin: 20px 0 20px 2%;
      width: 96%;
    }
    img{
      width: 100%;
      /*height: 100%;*/
    }
    p{
      font-size: 15px;
      line-height: 27px;
      margin-top: 5px;
      text-indent: 2em;
    }
  }
  /*.imgInfo {*/
  /*  background-image: url('../assets/img/图1.png');*/
  /*  background-size: 90%;!* 第一个值为宽，第二个值为高，当设置一个值时，将其作为图片宽度来等比缩放 *!*/
  /*  width: 90%;*/
  /*  !*height: 100px;*!*/
  /*}*/
</style>
