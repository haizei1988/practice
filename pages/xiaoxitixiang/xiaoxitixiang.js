// pages/xiaoxitixiang/xiaoxitixiang.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MessageData: [],
    MessageData1: [],
    Color:"red"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: '消息中心'
    })
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
      success: function(res) {
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

  },
  Msgdetail: function() {
    var that = this
    var openId = wx.getStorageSync('openId');
    let item = that.data.MessageData
    for (let i = 0; i < item.length;i++) {
      if (!item[i].IsRead) {
        wx.request({
          url: getApp().globalData.url + "/Basics/UpdateUserIsRead?messageId=" + item[i].ID,
          method: "POST",
          data:{
            openid: openId
          },
          header: {
            'Content-Type': 'application/json',
          },
          success: function (res) {

          }
        })
      }
    }  
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
    var openId = wx.getStorageSync('openId');
    var that = this
    //获取未读消息
    var data = {
      openid: openId
    }
    var header = {
      'Content-Type': 'application/json',
    
    }
    app.getData(getApp().globalData.url + "/Basics/GetMessageByUserID", 'GET', data, '', header).then(res => {
      console.log(res)
      that.setData({
        MessageData: res.data.Json.Result
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.Msgdetail()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.Msgdetail()
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