// pages/shopping/shopping.js
var app = getApp();
Page({
  data: {
    chongzhi: false,
    gouwu: true,
    huiyuan: true,
    active: false,
    scrollLeft: 0,
    color: "red",
    shoppingType: '1',
    cards: [],
    cardshuiyuan: [],
    chongzhicards: [],
    baseurl: getApp().globalData.url,
    IntegralRecord: "",
    wu: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: "商城",
      success: function(res) {
        // success
      }
    })

    function Foo() {
      getName = function() {
        console.log(1);
      };
      return this;
    }
    Foo.getName = function() {
      console.log(2);
    };
    console.log(Foo.getName())
    //获取首页积分记录集合
    wx.request({
      url: getApp().globalData.url + "/Basics/GetPrizeWinForPage",
      method: "GET",
      header: {
        'Content-Type': 'application/json',
      },
      success: function(res) {
        console.log(res)
        that.setData({
          IntegralRecord: res.data.Json.Result,
        })
      }
    })
    //获取充值卡信息
    var data = {
      typenum: 100,
      openid:openId
    }
    var header = {
      'Content-Type': 'application/json',
     
    }
    app.getData(getApp().globalData.url + "/Basics/GetGoodByGoodType", 'GET', data, '', header).then(res => {
      console.log(res)
      if (res.data.Json.Result == "") {
        that.setData({
          wu: false,
        })
      } else {
        that.setData({
          wu: true,
          chongzhicards: res.data.Json.Result,

        })
      }

    })
  },
  // 切换菜单
  clickchongzhi: function(e) {
    var that = this
    chongzhi: this.data.chongzhi
    gouwu: this.data.gouwu
    huiyuan: this.data.huiyuan
    isA: this.data.isA
    var openId = wx.getStorageSync('openId');
    that.setData({
      chongzhi: false,
      gouwu: true,
      huiyuan: true,
      shoppingType: e.target.dataset.shopping
    })
    //获取充值卡信息
    var data = {
      typenum: 100,
      openid:openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetGoodByGoodType", 'GET', data, '', header).then(res => {
      if (res.data.Json.Result == "") {
        that.setData({
          wu: false,
        })
      } else {
        that.setData({
          wu: true,
          chongzhicards: res.data.Json.Result,
        })
      }
    })
  },
  clickgouwu: function(e) {
    var that = this
    chongzhi: this.data.chongzhi
    gouwu: this.data.gouwu
    huiyuan: this.data.huiyuan
    isA: this.data.isA
    that.setData({
      chongzhi: true,
      gouwu: false,
      huiyuan: true,
      shoppingType: e.target.dataset.shopping
    })
    //获取购物卡信息
    var openId = wx.getStorageSync('openId');
    var data = {
      typenum: 200,
      openid:openId
    }
    var header = {
      'Content-Type': 'application/json'
    }
    app.getData(getApp().globalData.url + "/Basics/GetGoodByGoodType", 'GET', data, '', header).then(res => {
      if (res.data.Json.Result == "") {
        that.setData({
          wu: false,
        })
      } else {
        that.setData({
          wu: true,
          cards: res.data.Json.Result,

        })
      }
    })
  },
  clickhuiyuan: function(e) {
    var that = this
    chongzhi: this.data.chongzhi
    gouwu: this.data.gouwu
    huiyuan: this.data.huiyuan
    isA: this.data.isA
    that.setData({
      chongzhi: true,
      gouwu: true,
      huiyuan: false,
      shoppingType: e.target.dataset.shopping
    })
    //获取会员卡信息
    var openId = wx.getStorageSync('openId');
    var data = {
      typenum: 300,
      openid:openId
    }
    var header = {
      'Content-Type': 'application/json',
   
    }
    app.getData(getApp().globalData.url + "/Basics/GetGoodByGoodType", 'GET', data, '', header).then(res => {
      if (res.data.Json.Result == "") {
        that.setData({
          wu: false,
        })
      } else {
        that.setData({
          wu: true,
          cardshuiyuan: res.data.Json.Result,

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