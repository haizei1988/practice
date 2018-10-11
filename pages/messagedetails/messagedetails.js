// pages/xiaoxitixiang/xiaoxitixiang.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MessageData: [],
    messageID:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.shouquan()
    var that = this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: '消息中心'
    })
    that.setData({
      messageID: options.messageID,
    })
    var messageID = that.data.messageID
    //获取用户的信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetWeXinUser",
      method: "GET",
      data:{
        openid: openId
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
          })
        } else {
          that.setData({
            SNickname: res.data.Json.Result.SNickname,
            Autograph: res.data.Json.Result.Autograph,
            SHeadimgurl: res.data.Json.Result.SHeadimgurl,
          })
        }

      }
    })
    //改变消息状态
    var data = {
    openid:openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/UpdateUserIsRead?messageId=" + messageID, 'POST', data, '', header).then(res => {
      console.log(res)
      that.setData({
        MessageData: res.data.Json.Result
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