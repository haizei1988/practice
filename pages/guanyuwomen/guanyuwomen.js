// pages/guanyuwomen/guanyuwomen.js
var WxParse = require('../../wxParse/wxParse.js');
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guanyuwomen:""
  },
  // 跳转
  goto1:function(){
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().globalData.url + "/Basics/GetBasicsExplainDTOByType",
      method: "GET",
      data: {
        typeNum: 400
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        var markdown = res.data.Json.Result.ExplainContent
        WxParse.wxParse('markdown', 'md', markdown, that, 5);
        // var content = app.convertHtmlToText(res.data.Json.Result.ExplainContent)
        // console.log(content)
        // console.log(res.data.Json.Result.ExplainContent)
        // that.setData({
        //   guanyuwomen: content
        // })
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