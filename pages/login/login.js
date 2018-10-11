// pages/login/login.js
var app = getApp()
Page({

  // /**
  //  * 页面的初始数据
  //  */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    disabled:false,
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var openId = wx.getStorageSync('openId');
    console.log("Login" + openId);
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: getApp().globalData.url + "/api/Basics/OnLogin",
    //         data: {
    //           code:'001tAzrI1xZSV70cXtnI1IrwrI1tAzrz'
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
    // wx.login({
    //   success: res => {
    //     var that = this;
    //     // var nickName = e.detail.userInfo.nickName;
    //     // var avatarUrl = e.detail.userInfo.avatarUrl;
    //     // var city = e.detail.userInfo.city;
    //     // var country = e.detail.userInfo.country;
    //     // var gender = e.detail.userInfo.gender;
    //     // var province = e.detail.userInfo.province;
    //     var code = res.code;
    //     console.log(code)
    //     wx.request({
    //       url: getApp().globalData.url + "/api/Basics/OnLogin",
    //       method: 'GET',
    //       data: { code: code },
    //       dataType:'json',
    //       success: function (rs) {
    //         console.log(rs)
    //         console.log(rs.data.Json.Result.sessionId)
    //         // if (res.Json.IsSuccess==false){
    //         //   wx.showModal({
    //         //     title: '提示',
    //         //     showCancel:false,
    //         //     content: res.Json.OperationDesc+"请重新登录",
    //         //   })
    //         // }
    //         // wx.setStorageSync('sessionId', rs.data.Json.Result.sessionId)
    //         // wx.switchTab({
    //         //   url: '/pages/index/index',
    //         // })
    //         this.setData({
    //           disabled: false
    //         })
    //         var openId = rs.data.Json.Result.openId
    //         //   wx.request({
    //         //   url: getApp().globalData.url + '/api/Basics/OnRegister' + "?nickName=" + nickName + "&avatarUrl=" + avatarUrl
    //         //   + "&city=" + city + "&country=" + country + "&gender=" + gender + "&province=" + province + "&openid=" + openId,
    //         //   method: "POST",
    //         //   data: {},
    //         //   header: {
    //         //     'Content-Type': 'application/json',
    //         //   },
    //         //   success: function (res) { 
    //         //     console.log(res);
    //         //   }
    //         // })               
    //       },
    //       fail: function (res) {
    //         console.log(res)
    //       },
    //       complete: function (res) {
    //         console.log(res)
    //       },
    //     })
    //   }
    // })
  },
  // //获取用户信息   
  bindGetUserInfo: function(e) {
    var that=this;
    that.setData({
      disabled: true,
      hidden:false
    });
    var nickName = e.detail.userInfo.nickName;
    var avatarUrl = e.detail.userInfo.avatarUrl;
    var city = e.detail.userInfo.city;
    var country = e.detail.userInfo.country;
    var gender = e.detail.userInfo.gender;
    var province = e.detail.userInfo.province;
    var openId = wx.getStorageSync('openId');
    wx.request({
              url: getApp().globalData.url + '/Basics/OnRegister',
              method: "POST",
              dataType: 'json',
              data: {
                nickName: nickName,
                avatarUrl: avatarUrl,
                city:city,
                country:country,
                gender:gender,
                province:province,
                openid: openId
              },
              header: {
                'Content-Type': 'application/json',
              },
              success: function (res) { 
                that.setData({
                  disabled: false,
                  hidden: true
                });
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            })    
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})