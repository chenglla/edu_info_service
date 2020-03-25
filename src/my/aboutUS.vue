<template>
  <div class="collect_info">
      <div class="score_header">
        <div class="return__icon" @click="returnBack">
          <i class="iconfont iconfanhui"></i>
        </div>
        <div class="title">关于我们</div>
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <div class="text_title">
            <h3>智禾搜论文产品服务介绍</h3>
          </div>
          <div class="text_body">
            <p>智禾搜论文系统将不同来源的论文信息整合在一起并以易读的形式再现给用户，为用户提供大数据下的论文搜索及快报搜索服务，并向用户提供高效的、准确的、安全的搜索体验。</p>
            <p>该产品实现了对论文及快报文章内容的全文检索、关键字检索、模糊检索、历史检索，即通过输入论文关键词或内容即可完成对相关论文的快速检索，也可通过“扫一扫”功能，对论文进行识别搜索。同时该产品更加关注用户的个性化需求，满足用户对论文及快报的查看、下载、转发和收藏的需要，提升了阅读体验。</p>
            <h4>主要功能 :</h4>

            <h5>论文搜索 :</h5>
            <p>点击公众号左下方“搜论文”，即可跳转到论文全文搜索界面，输入论文题目或关键词后即可进行全文搜索，也可通过搜索历史或者浏览历史进行文章的快速搜索。选择相应文章即可查看该论文的论文摘要等信息，点击右下方“＋”号按钮即可对论文进行“收藏”，“下载”，“转发”功能。也可以通过点击论文下的“收藏”，“下载”，“分享”，对论文进行快速操作。</p>
            <img src="../assets/img/图1.png" alt="">
            <h5>快报搜索 :</h5>
            <p>点击公众号中下方“读快报”，即可跳转到专题快报搜索界面，输入要搜索的快报名称或关键词后即可进行快报搜索，也可以滑动下方目录栏快速浏览最新快报。点击自己想要查看的快报即可查看该快报的本期摘要。点击右下方“＋”号按钮即可对论文进行“收藏”，“下载”，“转发”。此外点击右上角功能栏，即可查看专题快报的订阅类别，方便用户进行类别切换。</p>
            <img src="../assets/img/图2.png" alt="">
            <h5>我的功能 :</h5>
            <p>点击公众号右下方“我的”，即可跳转到我的功能界面，其中可以查看自己的“论文收藏”，“快报收藏”，设置等功能，为用户提供个性化操作服务。</p>
            <img src="../assets/img/图3.png" alt="">
          </div>
        </div>
      </div>
  </div>
</template>

<script scoped>
  import BScroll from 'better-scroll'
export default {
  data () {
    return {
      Time:"3天前"
    }
  },
  methods: {
    returnBack () {
      this.$router.push({name: 'my'})
    },
   },
  mounted () {
    this.$nextTick(()=>{
      this.scroll = new BScroll(this.$refs.wrapper,{
        scrollY:true,
        click:true
      })
    })
  }

}
</script>

<style>
  /*头部标题*/
  .collect_info {
    height: 100%;

  }
  .score_header {

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
    z-index: 1;
    //box-shadow: 2px 2px 3px 0.5px #0069D9;

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
  .wrapper{
    display: flex;
    overflow-x: hidden;
    height:100% ;
    display: flex;
    scroll-behavior: smooth;
    margin: 10px 1px 5px 20px;
    /*上，右，下，左*/
  }
  .content{

    width: 100%;

  }
  /*文本标题*/
  .text_title h3{
    font-size: 25px;
    font-weight: 400;
    text-align: center;
    margin-bottom:10px;
    padding-bottom: 8px;
    border-bottom: dashed darkgray 1px;/* dotted,dashed*/
  }

  .text_body p{
    font-size: 16px;
    margin-top: 5px;
    text-indent: 2em;
  }
  .text_body img{
    width: 350px;
    vertical-align: middle;
    margin: 10px 0px 20px 0px;
  }
  .text_body h4{
    margin-top: 10px;
    font-size: 18px;
  }
  .text_body h5{
    font-size: 16px;
    letter-spacing: 1px;
  }
</style>
