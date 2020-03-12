import request from '@/utils/request'

export function getUserInfo (req) {
  return request({
    url: 'getuserinfo',
    method: 'get',
    params: req
  })
}
export function searchAll (req) { // 全文检索
  return request({
    url: 'searcharticle',
    method: 'get',
    params: req
  })
}
export function getEachSearch (req) { // 获取某一篇论文详情
  return request({
    url: 'getarticlebyuuid',
    method: 'get',
    params: req
  })
}
export function getScanHistory (req) { // 获取浏览历史
  return request({
    url: 'getscanhistory',
    method: 'get',
    params: req
  })
}
export function getSearchReport (req) { // 检索报告
  return request({
    url: 'searchreport',
    method: 'get',
    params: req
  })
}
export function getEachReportDetail (req) { // 获取某一篇报告
  return request({
    url: 'getreportbyid',
    method: 'get',
    params: req
  })
}
export function collectLW (req) { // 收藏一篇论文
  return request({
    url: 'favoriteonearticle',
    method: 'get',
    params: req
  })
}
export function collectReport (req) { // 收藏一篇报告
  return request({
    url: 'favoriteonereport',
    method: 'get',
    params: req
  })
}
