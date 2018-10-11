// pages/baoming/baoming.js
var app = getApp()
Page({
  data: {
    selectArea: true,
    selectfeiyong: true,
    xinxi: [],
    id: 0,
    start: 0,
    end: 0,
    wu: true,
    you: true,
    feiyong:"报名费用",
    jinsaibushu:"竞赛步数",
    ExplainContent: "",
    userName:""
  },
  clickArea: function () {
    this.setData({
      selectArea: !this.data.selectArea,
      selectfeiyong: true,

    })
  },
  challengMoney: function (e) {
    wx.navigateTo({
      url: '/pages/challeng/challeng?name=' + e.currentTarget.dataset.type,
    })
  },
  clickfeiyong: function () {
    this.setData({
      selectArea: true,
      selectfeiyong: !this.data.selectfeiyong,

    })
  },
  /**
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: "挑战竞赛",
      success: function (res) {
      }
    })
    var data = {
      challengeAmtType: 0,
      startStepNum: 0,
      endStepNum: 0,
      userName: ""
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge", 'GET', data, '', header).then(res => {
      console.log(res)
      if (res.data.Json.Result == "") {
        that.setData({
          wu: false,
          you: true
        })
      } else {
        that.setData({
          xinxi: res.data.Json.Result,
          wu: true,
          you: false
        })
      }
    })

  },

  notMoney: function () {
    var that = this
    var data = {
      challengeAmtType: 6,
      startStepNum: 0,
      endStepNum: 0,
      userName: ""
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge", 'GET', data, '', header).then(res => {
      console.log(res)
      if (res.data.Json.Result== "") {
        that.setData({
          wu: false,
          you: true
        })
      } else {
        that.setData({
          xinxi: res.data.Json.Result,
          wu: true,
          you: false
        })
      }
    })
  },
  oneMoney: function (e) {
    var that = this
    that.setData({
      id: e.currentTarget.dataset.id,
    })
    var data = {
      challengeAmtType: that.data.id,
      startStepNum: that.data.start,
      endStepNum: that.data.end,
      userName: ""
    }
    if (that.data.id==1){
      that.setData({
        feiyong: "一元",
      })
    } else if (that.data.id == 3){
      that.setData({
        feiyong: "三元",
      })
    } else if (that.data.id == 5) {
      that.setData({
        feiyong: "五元",
      })
    } else if (that.data.id == 0) {
      that.setData({
        feiyong: "更多",
      })
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge", 'GET', data, '', header).then(res => {
      if (res.data.Json.Result== "") {
        that.setData({
          wu: false,
          you: true
        })
      } else {
        that.setData({
          xinxi: res.data.Json.Result,
          wu: true,
          you: false
        })
      }
    })
  },
  stepnum: function (e) {
    var that = this
    that.setData({
      start: e.currentTarget.dataset.start,
      end: e.currentTarget.dataset.end
    })
    if (that.data.start == 5000 && that.data.end==10000) {
      that.setData({
        jinsaibushu: "五千到一万",
      })
    } else if (that.data.start == 10000 && that.data.end == 30000) {
      that.setData({
        jinsaibushu: "一万到三万",
      })
    } else if (that.data.start == 0 && that.data.end == 0) {
      that.setData({
        jinsaibushu: "更多",
      })
    } 
    var data = {
      challengeAmtType: that.data.id,
      startStepNum: that.data.start,
      endStepNum: that.data.end,
      userName: ""
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge", 'GET', data, '', header).then(res => {
      if (res.data.Json.Result== "") {
        that.setData({
          wu: false,
          you: true
        })
      } else {
        that.setData({
          xinxi: res.data.Json.Result,
          wu: true,
          you: false
        })
      }
    })
  },
  // 创建人搜索
  bindkeyinput:function(e){
    console.log(e.detail.value)
    this.setData({
      userName: e.detail.value
    })
  },
  search:function(){
    var that=this
    var data = {
      challengeAmtType: that.data.id,
      startStepNum: that.data.start,
      endStepNum: that.data.end,
      userName: that.data.userName
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge", 'GET', data, '', header).then(res => {
      if (res.data.Json.Result == "") {
        that.setData({
          wu: false,
          you: true
        })
      } else {
        that.setData({
          xinxi: res.data.Json.Result,
          wu: true,
          you: false
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