const app = getApp();
Page({
  data: {
      id:''
  },
 onLoad(e){
   var that =this
    console.log(typeof(e.id))
    that.setData({
      id:e.id
    })
    console.log(that.data.id)
    that.bb()
 },
  bb(){
    var that= this
    console.log(this.data.id)
    wx.request({
      url: app.globalData.url+'/selectById',
      method:"GET",
      data:{
          id:this.data.id
      },
      success (res) {
        console.log(res.data)
        that.setData({
          data:res.data.data
        })
        }
     
    })
  }
})