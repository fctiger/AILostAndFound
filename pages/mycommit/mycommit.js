const App = getApp()


Page({
  data: {
    itemData:null
  },
  touchS: function (e) {  // touchstart
    this.setData({ itemData: App.Touches.touchStart(e) })
  },
  touchM: function (e) {  // touchmove
    let item = App.Touches.touchMove(e)
    item && this.setData({ [`itemData[${App.Touches.getItemIndex(e)}]`]: item })
  },
  touchE: function (e) {  // touchend
    let item = App.Touches.touchEnd(e)
    item && this.setData({ [`itemData[${App.Touches.getItemIndex(e)}]`]: item })
  },
  itemDelete: function(e){  // itemDelete
    this.data.itemData.splice(App.Touches.getItemIndex(e), 1)
    this.initTouchData()
    this.setData({ itemData: this.data.itemData })
    console.log("e.currentTarget.dataset.id",e.currentTarget.dataset.id)
    wx.request({
      url: App.globalData.url+'/deleteById',
      data:{
          id:e.currentTarget.dataset.id
      },
      success(res){
        console.log(res.data)
      }
    })
  },
  initTouchData() {
    App.Touches.initData({
      datalist: this.data.itemData,
      operationWrapperWidth: 200
    })
  },
  getClassify(){
    var that = this
    wx.request({
      url: App.globalData.url+'/getClassifyByOpenId',
      method:"GET",
      data:{
         openId:App.globalData.openid
      },
      success (res) {
        console.log(res.data)
        that.setData({
          itemData:res.data.data
          
        })
        that.initTouchData()
        }
    })
  },
  tocommit(e){
      console.log(e.currentTarget.dataset.index)
      if (e.currentTarget.dataset.id != 0) {
        wx.navigateTo({
          url: "/pages/commit/commit?id=" + e.currentTarget.dataset.id
        })
      }
  },
  onLoad: function (options) {
    this.getClassify()
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})