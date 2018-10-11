var app=getApp()
// pages/rekadetail/rekadetail.js
Page({
  data: {
    SNickname: "",
    Autograph: "",
    SHeadimgurl: "",
    TotalIntegralNum: "",
    reka:"",
    TotalHotCardNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: '热卡比详情'
    })
    //获取用户的信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetWeXinUser",
      method: "GET",
      data:{
        openid:openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        if (res.data.Json.Result.Autograph == null) {
          that.setData({
            SNickname: res.data.Json.Result.SNickname,
            Autograph: "这个人很懒，什么都没留下",
            SHeadimgurl: res.data.Json.Result.SHeadimgurl,
            TotalIntegralNum: res.data.Json.Result.TotalIntegralNum,
            TotalHotCardNum: res.data.Json.Result.TotalHotCardNum
          })
        } else {
          that.setData({
            SNickname: res.data.Json.Result.SNickname,
            Autograph: res.data.Json.Result.Autograph,
            SHeadimgurl: res.data.Json.Result.SHeadimgurl,
            TotalIntegralNum: res.data.Json.Result.TotalIntegralNum,
            TotalHotCardNum: res.data.Json.Result.TotalHotCardNum
          })
        }
      }
    })
    //获取用户的热卡币详情
    var data = {
      openid: openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetHotCardLogByUser", 'GET', data, '', header).then(res => {
      console.log(res)
      that.setData({
        reka: res.data.Json.Result
      })
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