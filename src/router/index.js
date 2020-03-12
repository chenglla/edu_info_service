import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const home = () => import('@/home/index')
const nav = () => import('@/layout/navbar')
const my = () => import('@/my/index')
const searchDetail = () => import('@/home/search/searchDetail') // 搜索详情
const specialExpress = () => import('@/specialExpress/index') // 专题快报首页
const speExpDetail = () => import('@/specialExpress/speExpDetail') // 专题快报详情

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
      // name: 'home',
      // component: home
    },
    {
      path: '/home',
      components: {
        default: home, nav: nav
      },
      name: 'home',
      meta: { tab: 'home', title: 'home' }
    },
    {
      path: '/my',
      components: {
        default: my, nav: nav
      },
      name: 'my',
      meta: { tab: 'my', title: 'my' }
    },
    {
      path: '/searchDetail',
      components: {
        default: searchDetail, nav: nav
      },
      name: 'searchDetail',
      meta: { tab: 'searchDetail', title: 'searchDetail' }
    },
    {
      path: '/specialExpress',
      components: {
        default: specialExpress, nav: nav
      },
      name: 'specialExpress',
      meta: { tab: 'specialExpress', title: 'specialExpress' }
    },
    {
      path: '/speExpDetail',
      components: {
        default: speExpDetail, nav: nav
      },
      name: 'speExpDetail',
      meta: { tab: 'speExpDetail', title: 'speExpDetail' }
    },
  ]
})
