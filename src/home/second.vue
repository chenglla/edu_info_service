<template>
  <div class="second_info">
    <div class="second_left">
      <img src="../assets/img/logo.png" class="second_left_img">
    </div>
    <div class="second_right">
      <p class="second_right_p1">全文检索</p>
      <p class="second_right_p2">Full Text Search</p>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped lang="scss">
  .second_info {
    height: 90px;
    width: 100%;
    background-color: #fff;
    /*text-align: center;*/
  }
  .second_left, .second_right {
    display: inline-block;
    width: 50%;
    text-align: center;
    /*position: relative;*/
  }
  .second_left {
    /*position: absolute;*/
    margin-left: 8%;
    margin-top: 35px;
  }
  .second_left_img {
    width: 55px;
  }
  .second_right p{
    font-family: "黑体";
    font-weight: bold;
    position: absolute;
    /*top: 85px;*/
    left: 45%;
    /*font-size: 33px;*/
  }
  .second_right_p1 {
    top: 80px;
    /*left: 160px;*/
    font-size: 28px;
  }
  .second_right_p2 {
    font-size: 14px;
    top: 117px;
    /*left: 160px;*/
  }
</style>
