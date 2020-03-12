<template>
  <div class="third_info">
    <div class="search_info">
      <input type="text" class="third_input" placeholder="搜索" v-model="searchContent" @keyup.enter="gotoSearch"  @blur="inputBlur">
      <button class="third_button" @click="gotoSearch">搜索</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchContent: '', // 搜索内容
      // showImg: false, // 图片是否展示
    }
  },
  computed: {
    showImg () {
      return this.$store.state.infoService.showImg
    },
    searchData () {
      console.log('搜索内容：', this.$store.state.infoService.searchData)
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
  methods: {
    inputBlur () {
      window.scroll(0, 0)
    },
    gotoSearch () {
      if (this.searchContent === '') {
        console.log('搜索内容为空')
      } else {
        this.$store.commit('SET_SHOW_IMG', false)
        this.$store.commit('SET_SEARCH_DATA', this.searchContent)
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
    border: 2px solid rgba(0, 112, 192, 0.8);
    margin: 0 15px;
    border-radius: 10px;
    /*margin-top: 10px;*/
  }
  .third_input {
    margin-left: 10px;
    border: 0;
    height: 35px;
    width: 81%;
    outline: 0;
  }
  .third_button {
    /*float: right;*/
    right: 1px;
    color: #fff;
    /*font-size: 14px;*/
    text-align: center;
    background-color: rgba(0, 112, 192, 0.8);
    border-color: rgba(0, 112, 192, 0.8);
    border-radius: 5px;
    padding: 3px 7px 5px;
    outline: 0;
  }
</style>
