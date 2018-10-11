var app=getApp()
// pages/challeng/challeng.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
     xinxi:[],
     not1:true,
     ExplainContent: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.setNavigationBarTitle({
      title: options.name,
    })
    if (options.name == "一元专区") {
  
      that.setData({
        numa: "options.pric",
      })
      var data = {
        challengeAmtType: 1,
        startStepNum: 0,
        endStepNum: 0,
        userName:''
      }
      var header = {
        'Content-Type': 'application/json',
      }
      app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge",'GET', data, '', header).then(res => {
        if (res.data.Json.Result == "") {
          that.setData({
            not1: false
          })
        } else {
          that.setData({
            xinxi: res.data.Json.Result,
            not1: true
          })
        }

      })
    }
    else if (options.name == "三元专区") {
    
      that.setData({
        numa: "333333333333",
      })


      var data = {
        challengeAmtType: 3,
        startStepNum: 0,
        endStepNum: 0,
        userName: ''
      }
      var header = {
        'Content-Type': 'application/json',
      }
      app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge", 'GET', data, '', header).then(res => {
      
        if (res.data.Json.Result == "") {
          that.setData({
            not1: false
          })
        } else {
          that.setData({
            xinxi: res.data.Json.Result,
            not1: true
          })
        }
      })
    }
    else if (options.name == "五元专区") {
      var data = {
        challengeAmtType: 5,
        startStepNum: 0,
        endStepNum: 0,
        userName: ''
      }
      var header = {
        'Content-Type': 'application/json',
      }
      app.getData(getApp().globalData.url + "/Basics/GetNotBeginChallenge", 'GET', data, '', header).then(res => {
        
        if (res.data.Json.Result == "") {
          that.setData({
            not1: false
          })
        } else {
          that.setData({
            xinxi: res.data.Json.Result,
            not1: true
          })
        }
      })
    } else if (options.name=="免费专区"){
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
     
        if (res.data.Json.Result == "") {
          that.setData({
            not1: false
          })
        } else {
          that.setData({
            xinxi: res.data.Json.Result,
            not1: true
          })
        }
      })
    }
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