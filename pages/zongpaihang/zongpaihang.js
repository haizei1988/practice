// pages/zongpaihang/zongpaihang.js
var app = getApp()
Page({
  data: {
    UserName:"",
    UserHeadimgurl:"",
    StepNum:"",
    TemporaryRanking :"",
    img: '../../images/heart.png',
    zongpaihang:[],
    flag:[],
    imgs: ['../../images/heart.png', '../../images/heart-after.png'],
    status:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: "昨日步数排行榜",
      success: function (res) {
        // success
      }
    })
    // 获取用户昨日记步信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetSelfStepNumLog",
      method: "POST",
      data:{
        openid: openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == false) {
          wx.showToast({
            title: res.data.errmsg[0],
            icon: "none"
          })
          return
        } else {
          if (res.data.Json.Result.TemporaryRanking==0){
            that.setData({
              ranking: "未上榜",
              UserName: res.data.Json.Result.UserName,
              UserHeadimgurl: res.data.Json.Result.UserHeadimgurl,
              StepNum: res.data.Json.Result.StepNum
            })
          }else{
            that.setData({
              ranking: res.data.Json.Result.TemporaryRanking,
              UserName: res.data.Json.Result.UserName,
              UserHeadimgurl: res.data.Json.Result.UserHeadimgurl,
              // UserHeadimgurl: "/images/touxiang.jpg",
              StepNum: res.data.Json.Result.StepNum
            })
          }
        
        }
      }
    })
    //获取昨日排名记录集合
    wx.request({
      url: getApp().globalData.url + "/Basics/GetAllStepNumRanking",
      method: "GET",
      data:{
        openid: openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        that.setData({
          zongpaihang: res.data.Json.Result
        })
        // for(let i=0; i<res.data.length;i++){
        //   that.data.flag.push(false)
        // }
      }
    })
  },
  dianzan: function (e) {
      var that = this;
      let index = e.currentTarget.dataset.index;
      let ID = e.currentTarget.dataset.id;
      var openId = wx.getStorageSync('openId');
      var data={
        openid: openId
      }
      var header = {
        'Content-Type': 'application/json',
      }
      that.setData({
        img: "/images/heart-after .png",
        status: true
      })
      var info_id = e.currentTarget.dataset.index;
      app.getData(getApp().globalData.url + "/Basics/UpdateStepLaud?stepNumId=" + ID, 'POST', data, '', header).then(res => {
        console.log(res)
        wx.showToast({
          title: res.data.OperationDesc,
          icon: 'none',
        })
        if (res.data.IsSuccess == true) {
          //获取昨日排名记录集合
          wx.request({
            url: getApp().globalData.url + "/Basics/GetAllStepNumRanking",
            method: "GET",
            data: { openid: openId},
            header: {
              'Content-Type': 'application/json',
            },
            success: function (res) {
              that.setData({
                zongpaihang: res.data.Json.Result
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.OperationDesc,
            icon: 'none',
          })
        }
      })
  },
  nodianzan(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    console.log(index)
    let ID = e.currentTarget.dataset.id;
    console.log("dianzan")
    var openId = wx.getStorageSync('openId');
    var data = {
      stepNumId:ID,
      openid: openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    that.setData({
      img: "/images/heart.png",
      status: false
    })
    var info_id = e.currentTarget.dataset.index;
    app.getData(getApp().globalData.url + "/Basics/CancelStepLaud" , 'POST', data, '', header).then(res => {
      console.log(res)
      wx.showToast({
        title: res.data.OperationDesc,
        icon: 'none',
      })
      if (res.data.IsSuccess == true) {
        //获取昨日排名记录集合
        wx.request({
          url: getApp().globalData.url + "/Basics/GetAllStepNumRanking",
          method: "GET",
          data: { openid: openId },
          header: {
            'Content-Type': 'application/json',
          },
          success: function (res) {
            console.log(res)
            that.setData({
              zongpaihang: res.data.Json.Result
            })
            // let a = 'flag[' + index + ']'
            // that.setData({
            //   [a]: !that.data.flag[index],
            //   status: true
            // })
          }
        })
      } else {
        wx.showToast({
          title: res.data.OperationDesc,
          icon: 'none',
        })
      }
    })
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

  }
})