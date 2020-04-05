<template>
  <div class="collect_info">
    <div class="score_header">
      <div class="return__icon" @click="returnBack">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="title">意见反馈</div>
      <div>
        <group  class="score_input">
            <!-- <popup-picker title="请选择" placeholder="" :data="list" v-model="value5" value-text-align="left"></popup-picker> -->
          <x-input placeholder="请输入意见" ></x-input>
          <x-textarea :max="200" name="description" placeholder="请详细描述问题" ></x-textarea>
        </group>
          <x-button id="btn" class="score_button" @click.native="showPosition('middle')" type="primary">提交反馈</x-button>

        <group>

        </group>
        <toast v-model="showPositionValue"  :time="1000" is-show-mask text="提交成功" :position="position"></toast>
      </div>
      <!-- <x-button type="primary" class="score_button">提交意见</x-button> -->

    </div>
  </div>
</template>
<script>
 import { Toast,XButton, XTextarea, Group, XInput,PopupPicker} from 'vux'
export default {
  data () {
       return {
        position: 'default',
        showPositionValue: false,
  //       //value5: ['A'],
  //       list: [['意见1', '意见2', '意见3']],
       }
     },
  methods: {
    // 提交之后消息框设置
    showPosition (position) {
          this.position = position
          this.showPositionValue = true
          document.getElementById("btn").style.backgroundColor="gray"
        },


    returnBack () {
      this.$router.push({name: 'my'})
    },
   },
  components: {
      XButton,
      XTextarea,
      Group,
      XInput,
      Toast,
      PopupPicker
    },
}
</script>
<style scoped lang="scss">
  .collect_info {
    height: 100%;
    background-color:#F9F9FA;
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
  }
  .return__icon{
    position: absolute;
    margin-left: 15px;
  }
  .iconfanhui {
    margin-top: 10px;
    font-size: 20px;
  }
  // 底部页面
  .score_input{
    color: black;
    margin: 40px 8px 40px 10px;
    border-left: solid gainsboro 1px;
    border-right:solid gainsboro 1px ;
    border-bottom:solid gainsboro 1px ;
    box-shadow: 2px 2px 6px 2px gainsboro ; /*边框周围阴影 insert:内阴影、x轴正方向长度、y轴负方向长度、阴影模糊度、扩展半径、阴影颜色*/
  } 
  .score_button{
    width: 70%;
    height: 42px;
    padding: 0px 6px 25px 6px;
    border-radius: 5px!important;
    border-color:#1AAD19!important;
    color: white!important;
    margin-top: 20px;
  }
  #btn{
    background-color:#0073E7;
  }

</style>
