// pages/bushujilu/bushujilu.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: false,
    month: true,
    userImg: '../../images/d1a20cf431adcbef63081c28abaf2edda3cc9fdb.jpg',
    active: true,
    seconedHeight: 0,
    EnrollNum: "",
    SNickname: "",
    SHeadimgurl: "",
    AwardNum: "",
    FailNum: "",
    monthnum: [],
    weeknum: [],
    weekday: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: '步数记录'
    })
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          seconedHeight: res.windowHeight - 250 / 750 * 300
        })
      },
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
        self.setData({
          SNickname: res.data.Json.Result.SNickname,
          EnrollNum: res.data.Json.Result.AwardNum + res.data.Json.Result.FailNum,
          SHeadimgurl: res.data.Json.Result.SHeadimgurl,
          AwardNum: res.data.Json.Result.AwardNum,
          FailNum: res.data.Json.Result.FailNum,
        })
      }
    })
    //获取用户本月的信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetSameMonthStepNumLog",
      method: "GET",
      data: {
        openid: openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        self.setData({
          monthnum: res.data.Json.Result
        })
      }
    })
    //获取用户本周的信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetThisWeekStepNumLog",
      method: "GET",
      data: {
        openid: openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        var xingqi = res.data.Json.Result
        self.setData({
          weeknum: xingqi
        })

      }
    })
  },
  clickweek: function () {
    var self = this
    this.setData({
      week: false,
      month: true,
      active: !this.data.active
    })
  },
  clicmonth: function () {
    var self = this
    this.setData({
      week: true,
      month: false,
      active: !this.data.active
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