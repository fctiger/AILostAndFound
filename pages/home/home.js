// pages/home/home.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data:{
    wuliclassify:null,
    swiperCurrent: 0,
    interval: 3500,
    majorIndex: 0,
    duration: 1500,
    situation: ['失物者','拾物者'],
    indicatorDots: true,
    autoplay: true,
    loadingMore: false, // loading中
    isEnd: false, //到底啦
    TabCur: 0,
    scrollLeft:0,
    test:[{value:"电子产品"},{value:"学习用品"},{value:"生活用品"},{value:"证件"},{value:"其他"}],
    list:['电子产品', '学习用品', '证件','其他']
  },
  onLoad: function(options) {
    this.getClassify()
  },
  tap: function (e) {
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/commit/commit?id=" + e.currentTarget.dataset.id
      })
    }
  },

 
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      loadingMore: true,
      isEnd: false
    })
    wx.showNavigationBarLoading()
    that.onLoad()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  bindMajorChange: function (e) {
    console.log(e.detail.value)
    this.setData({
    majorIndex: e.detail.value
  })
  this.getClassify()
},
tabSelect(e) {
  this.setData({
    TabCur: e.currentTarget.dataset.id,
    scrollLeft: (e.currentTarget.dataset.id-1)*60
  }) 
  this.getClassify()
},
searchpage(){
  wx.navigateTo({
    url: '/pages/search/search'
  })
},
getClassify(){
  var that = this
  wx.request({
    url: app.globalData.url+'/getClassify',
    method:"POST",
    data:{
        baseClassify:this.data.situation[this.data.majorIndex],
        classify:this.data.list[this.data.TabCur]
    },
    success (res) {
      console.log(res.data.data)
      that.setData({
        wuliclassify:res.data.data
      })
      }
  })
}
})