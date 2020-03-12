<template>
  <div class="navbar weui-tabbar">
    <div v-for="item in menu" v-tap="[changeMenu, item.link]" :key="item.value" :class="[{'active': item.value === curMenu}, 'weui-tabbar__item', 'tabbar-item--' + item.value]">
      <template v-if="item.value !== 'special'">
        <i :class="['iconfont', item.icon, 'weui-tabbar__icon']"></i>
        <p class="weui-tabbar__label">{{item.name}}</p>
      </template>
      <template v-else>
        <div class="tabbar-add-btn">
          <i :class="['iconfont', item.icon, 'weui-tabbar__icon']"></i>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu: [{
        link: 'home',
        value: 'home',
        name: '首页',
        icon: 'iconshouye'
      }, {
        link: 'specialExpress',
        value: 'special',
        // name: '加号',
        icon: 'iconbianji'
      }, {
        link: 'my',
        value: 'my',
        name: '我的',
        icon: 'iconwo'
      }
      ]
    }
  },
  computed: {
    // 当前tab
    curMenu () {
      return this.$route.name
    }
  },
  methods: {
    changeMenu (link) {
      if (link === 'specialExpress') {
        this.$router.push({
          path: './' + link,
          query: {
            type: 1
          }
        })
      } else {
        this.$router.push({ path: './' + link })
      }
      // this.$router.push({ path: '/bbs/hot' })
    }
  }
}

</script>
<style lang="scss">
  .weui-tabbar {
    position: fixed;
    background-color: #fff;
    box-shadow: 0px -1px 3px 1px rgba(0, 0, 0, 0.1);
    &:before {
      display: none;
    }
  }

  .weui-tabbar__icon>i, i.weui-tabbar__icon {
    font-size: 22px;
    color: RGB(51,51,51);
    /*color: #000;*/
    /*opacity: 0.6;*/
    /*font-max-size: large;*/
    /*border-radius: 50%;*/
  }
  .active {
    .weui-tabbar__icon {
      /*color: #42b983;*/
      color: rgb(0, 115, 231);
      /*color: RGB(67,183,131);*/
      /*border-radius: 10px;*/
      /*opacity: 1;*/
    }
  }
  .weui-tabbar__item {
    padding-top: 0;
  }
  .weui-tabbar__label {
    margin-top: 2px;
    line-height: 1.8;
    font-size: 12px;
    color: #6b6b6b;
    /*color: silver;*/
  }
  .tabbar-add-btn {
    width: 50px;
    height: 50px;
    background: rgb(0, 115, 231);
    border-radius: 100px;
    margin: -10px auto 0;
    box-shadow: 0 0 4px 4px rgba(0, 115, 231, 0.3);
    .iconfont {
      font-size: 27px;
      color: #fff;
      /*color: rgb(216, 30, 6);*/
      line-height: 50px;
      text-align: center;
      /*margin-left: -29px;*/
    }
  }
</style>
