const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    fuck:null,
    situationindex:null,
    jiandao:'',
    classify: ['电子产品', '学习用品', '证件','其他'],
    contact:['QQ','电话','微信'],
    situation:['失物者','拾物者'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    name:'',
    phone:''
  },
  onLoad:function(e){
    
  },
  ClassifyChange(e) {
    console.log(e);
    this.setData({
      fuck: e.detail.value
    })
  },
  situationChange(e) {
    console.log(e.detail.value);
    this.setData({
      situationindex: e.detail.value
    })
  },
  ContactChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        var that =this
        wx.uploadFile({
          url: app.globalData.url+"/uploads", 
          filePath: res.tempFilePaths[0],
          name: 'upload',//名字要与后端一致
          header: {
            "Content-Type": "multipart/form-data",
  
          },
          success: function (res) {
            
            console.log(res.data)
            var data = JSON.parse(res.data)
            console.log(data.data.url)
            that.setData({
              imageUrl:data.data.url
            })
            if (data.code == 200) {
              wx.showToast({
                title: '上传成功',
                icon: "success",
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '网络异常,请稍后重试',
              icon: "none",
              duration: 1000
            })
          }
        })
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '小朋友',
      content: '确定要删除这张照片？',
      cancelText: '点错了',
      confirmText: '再见',
      success: res => {
        
        if (res.confirm) {
          this.data.imageUrl = null
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    console.log(e.detail.value)
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  contacttap(e){
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  nametap(e){
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  jiandaotap(e){
    console.log(e.detail.value)
    this.setData({
      jiandao: e.detail.value
    })
  },
  
  public(){
    var that =this
    if(app.globalData.openid==null){
      wx.showModal({
        title: '请先登录',
        content: '移步到个人中心登录',
        showCancel: false,
        success: res => {
 
        }
      })
    }
  else{
    console.log("身份",this.data.situationindex)
    console.log("内容",this.data.textareaAValue)
    console.log("选择",this.data.fuck)
    console.log("this.data.imageUrl",this.data.imageUrl)
    console.log("this.data.name",this.data.name)
    console.log("this.data.index",this.data.index)
    if(this.data.textareaAValue == null || this.data.fuck==null || this.data.imageUrl==null || this.data.name==null || this.data.index==null || this.data.phone==null || this.data.situationindex==null || this.data.jiandao==null){
      wx.showModal({
        title: '发布失败',
        content: '您还有未填写的信息',
        showCancel: false,
        success: res => {  
        }
      })
    }else{
    wx.request({
      url: 'https://cftiger.mynatapp.cc/public',
      method:"POST",
      data:{
        jiandao:this.data.jiandao,
        openId:app.globalData.openid,//唯一标识
        detail:this.data.textareaAValue,//内容
        imageUrl:this.data.imageUrl,//图片路径
        classify:this.data.classify[this.data.fuck],//分类
        name:this.data.name,//名字
        contactWay:this.data.contact[this.data.index],//联系方式
        phone:this.data.phone,//号码
        baseClassify:this.data.situation[this.data.situationindex]//身份
      },
  
      success (res) {
        console.log(res.data)
       
        that.setData({

        })
        wx.showModal({
          title: '发布成功',
          content: '恭喜',
          showCancel: false,
          success: res => {
            
          }
        })
          that.setData({
            index: null,
             ck:null,
            textareaAValue: '',
            name:'',
            phone:'',
            imgList:[],
            jiandao:'',
            baseClassify:null,
            classify:null
          })
      }     
    })
  }
  }
  }
})