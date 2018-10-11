// pages/over/over.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SNickname: '于果',
    SHeadimgurl: "",
    qianming: '热爱生活热爱运动，这是一种态度。',
    overTitle: '',
    ID: "",
    StartTime: "",
    EndTime: "",
    StepNum: "",
    DisplayChallengeTime: "",
    ChallengeAmt: "",
    TotalChallengeAmt: "",
    TotalPeopleNum: "",
    HaveEnrollAmt:"",
    HaveEnrollNum :"",
    TotalChallengeAmt:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openId = wx.getStorageSync('openId');
    that.setData({
      ID: options.ID,
    })
    wx.setNavigationBarTitle({
      title: '挑战详情'
    })
    //获取用户信息
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
        that.setData({
          qianming: res.data.Json.Result.Autograph,
          SHeadimgurl: res.data.Json.Result.SHeadimgurl,
          SNickname: res.data.Json.Result.SNickname
        })
      }
    })

    //获取比赛信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetsChallengeLogByID" + "?challengeId=" + that.data.ID,
      method: "GET",
      data: {
        openid: openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        that.setData({
          StartTime: res.data.Json.Result.DisplayStartTime,
          EndTime: res.data.Json.Result.DisplayEndTime,
          StepNum: res.data.Json.Result.StepNum,
          TotalChallengeAmt: res.data.Json.Result.DisplayRewardHotCardNum,
          ChallengeAmt: res.data.Json.Result.ChallengeAmt,
          HaveEnrollNum: res.data.Json.Result.HaveEnrollNum ,
          TotalPeopleNum: res.data.Json.Result.TotalPeopleNum,
          HaveEnrollAmt: res.data.Json.Result.HaveEnrollAmt
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
    wx.setStorageSync('recordflag', false)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorageSync('recordflag', false)
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