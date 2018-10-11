// pages/duihuanjilu/duihuanjilu.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duihuanjilu:[],
    baseurl: getApp().globalData.url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: '兑换记录'
    })
    var that = this
    wx.request({
      url: getApp().globalData.url + "/Basics/GetExchangeLogByUser",
      method: "GET",
      data: {
        openid:openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        that.setData({
          duihuanjilu: res.data.Json.Result
        })





       


      }
    })
  },
  continueChange:function(e){
    let id = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    if (status=="下架") {
      wx.showModal({
        title: '提示',
        content: '商品已下架',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
        
      })
    }else{
      wx.navigateTo({
        url: '/pages/duihuan/duihuan?ID=' + id,
      })
    }


  }
  ,
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