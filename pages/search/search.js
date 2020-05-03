// pages/search/search.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    searchInfo:null,
    flag:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  searchIcon(e){
    console.log(e.detail.value);
    this.setData({
      keyword: e.detail.value
    })
  },
  searchtap(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    //每次搜索把上次的内容清空
    that.setData({
      searchInfo:null
    })
    wx.request({
      url: app.globalData.url+'/search',
      data:{
        keyword:this.data.keyword
      },
      success (res) {
        that.setData({
          flag:1
        })
        console.log(res.data.data)
        if((res.data.data)=="成功但没有数据"){
          console.log("are you ok")
        }else{
          that.setData({
              searchInfo:res.data.data
          })
      
          console.log("test",that.data.searchInfo)
        }
        wx.showToast({
          title: '加载成功',
        })
      },
      fail(){
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  }
   
})