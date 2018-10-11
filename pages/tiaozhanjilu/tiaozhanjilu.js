var app = getApp()

Page({
  data: {
    borderbottom: "red",
    recordflag: '',
    recordflag1: true,
    status: true,
    status2: "1",
    status3:"",
    xinxi: [],
    canjiaxinxi: [],
    wu:true
  },
  over(e) {
    if (e.currentTarget.dataset.over === '1') {
      wx.navigateTo({
        url: '/pages/over/over',
      })
    }
  },
  // 改变样式
  serviceSelection() {
    this.setData({
      recordflag: !this.data.recordflag
    })
  },
  serviceSelection1(e) {
    this.setData({
      status2: e.target.dataset.type
    })
    this.canjia(this.data.status2)
  },
  serviceSelection2(e) {  
    this.setData({
      status2: e.target.dataset.type
    })
    this.canjia(this.data.status2)
  },
  serviceSelection3(e) {
    this.setData({
      status2: e.target.dataset.type
    })
    this.canjia(this.data.status2)
  },
  serviceSelection4(e) {
    this.setData({
      status2: e.target.dataset.type
    })
    this.canjia(this.data.status2)
  },

// 发起挑战
  serviceSelection5(e) {
    this.setData({
      status3: e.target.dataset.type
    })
    this.faqi(this.data.status3)
  },
  serviceSelection6(e) {
    this.setData({
      status3: e.target.dataset.type
    })
    this.faqi(this.data.status3)
  },
  serviceSelection7(e) {
    this.setData({
      status3: e.target.dataset.type
    })
    this.faqi(this.data.status3)
  },
  serviceSelection8(e) {
    this.setData({
      status3: e.target.dataset.type
    })
    this.faqi(this.data.status3)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '挑战记录'
    })
    that.setData({
      recordflag: wx.getStorageSync('recordflag')
    })
    // 获取用户发起的挑战
    var openId = wx.getStorageSync('openId');
    var data = {
      openid: openId,
      statusType: 0
    };
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetMyChallengeLogs", 'GET', data,
      '', header).then(res => {
        console.log(res)
        that.setData({
          xinxi: res.data.Json.Result,
          wu: true
        })
        if (res.data.Json.Result == "") {
          that.setData({
            wu: false
          })
        }
      })
    // 获取用户参加的挑战
    app.getData(getApp().globalData.url + "/Basics/GetMyEnrollLogs", 'GET', data,
      '', header).then(res => {
        that.setData({
          canjiaxinxi: res.data.Json.Result,
          wu: true
        })
        if (res.data.Json.Result == "") {
          that.setData({
            wu: false
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
  //用户参加的挑战
  canjia:function(e){
    console.log(e)
    var that=this
    var statusCode=e
    var openId = wx.getStorageSync('openId');
    var data = {
      openid: openId,
      statusType: statusCode
    };
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetMyEnrollLogs", 'GET', data,
      '', header).then(res => {
        that.setData({
          canjiaxinxi: res.data.Json.Result,
          wu:true
        })
        if (res.data.Json.Result == "") {
          that.setData({
            wu: false
          })
        }
      })
  },
  //用户发起挑战
faqi: function (e) {
    console.log(e)
    var that = this
    var statusCode = e
    var openId = wx.getStorageSync('openId');
    var data = {
      openid: openId,
      statusType: statusCode
    };
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetMyChallengeLogs", 'GET', data,
      '', header).then(res => {
        that.setData({
          xinxi: res.data.Json.Result,
          wu: true
        })
        if (res.data.Json.Result == "") {
          that.setData({
            wu: false
          })
        }
      })
  },
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.setStorageSync('recordflag', true)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.setStorageSync('recordflag', true)
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