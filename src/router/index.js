import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const home = () => import('@/home/index')
const nav = () => import('@/layout/navbar')
const my = () => import('@/my/index')
const collect = () => import('@/my/collect')
const myDownLoad = () => import('@/my/myDownLoad')
const pdfDetail = () => import('@/pdf/pdfDetail')
// const pdfDetail = () => import('@/pdf/pdfDetail_0402')
const share = () => import('@/home/share') // 分享论文
// const usePdf = () => import('@/components/usePdf')
const SpeCollect = () => import('@/my/SpeCollect')
const searchDetail = () => import('@/home/search/searchDetail') // 搜索详情
const searchInfo = () => import('@/home/search/searchInfo') // 搜索详情
const specialExpress = () => import('@/specialExpress/index') // 专题快报首页
const speExpDetail = () => import('@/specialExpress/speExpDetail') // 专题快报详情
const ideaFeedback = () => import('@/my/ideaFeedback')
const aboutUs = () => import('@/my/aboutUs')
const scanCode = () => import('@/home/scanCode') // 扫码

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
      path: '/collect',
      components: {
        default: collect
      },
      name: 'collect',
      meta: { tab: 'collect', title: 'collect' }
    },
    {
      path: '/myDownLoad',
      components: {
        default: myDownLoad
      },
      name: 'myDownLoad',
      meta: { tab: 'myDownLoad', title: 'myDownLoad' }
    },
    {
      path: '/pdfDetail', // 预览pdf页面
      components: {
        default: pdfDetail
      },
      name: 'pdfDetail',
      meta: { tab: 'pdfDetail', title: 'pdfDetail' }
    },
    {
      path: '/share', // 分享链接
      components: {
        default: share
      },
      name: 'share',
      meta: { tab: 'share', title: 'share' }
    },
    {
      path: '/SpeCollect',
      components: {
        default: SpeCollect
      },
      name: 'SpeCollect',
      meta: { tab: 'SpeCollect', title: 'SpeCollect' }
    },
    {
      path: '/scanCode',
      // path: '/share/:exam_name',
      components: {
        default: scanCode
      },
      name: 'scanCode',
      meta: { tab: 'scanCode', title: 'scanCode' }
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
      path: '/searchInfo',
      components: {
        default: searchInfo, nav: nav
      },
      name: 'searchInfo',
      meta: { tab: 'searchInfo', title: 'searchInfo' }
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
    // {
    //   path: '/usePdf',
    //   components: {
    //     default: usePdf
    //   },
    //   name: 'usePdf',
    //   meta: { tab: 'usePdf', title: 'usePdf' }
    // }
    {
      path: '/ideaFeedback',
      components: {
        default: ideaFeedback
      },
      name: 'ideaFeedback',
      meta: { tab: 'ideaFeedback', title: 'ideaFeedback' }
    },
    {
      path: '/aboutUs',
      components: {
        default: aboutUs
      },
      name: 'aboutUs',
      meta: { tab: 'aboutUs', title: 'aboutUs' }
    },
  ]
})
