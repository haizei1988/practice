// pages/chongzhi/chongzhi.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TotalBalanceNum: "",
    selectbao: true,
    price: "",
    content:"",
    hidden: true,
    challengeLogID:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // this.inputChange1()
    console.log(option.challengeLogID)
  
    var that = this
    that.setData({
      challengeLogID: option.challengeLogID
    })
    wx.setNavigationBarTitle({
      title: '充值中心'
    })


    //获取充值说明信息
    var data = {
      typeNum: 200
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetBasicsExplainDTOByType", 'GET', data, '正在加载数据', header).then(res => {
      var content = app.convertHtmlToText(res.data.Json.Result.ExplainContent)
      console.log(content)
      var markdown = res.data.Json.Result.ExplainContent
      WxParse.wxParse('markdown', 'md', markdown, that, 5);
      that.setData({
        IntegralRecord: content
      })
    })

  },
  xianshi: function () {
   
  },
  clickclose: function () {
    var that = this
    that.setData({
      selectbao: true
    })
  },
  chongzhi: function () {
    var that = this
    var openId = wx.getStorageSync('openId');
    that.setData({
      selectbao: true
    })
    console.log(that.data.price)
    if (that.data.price == "" || that.data.price == null) {
      wx.showModal({
        title: '提示',
        content: '请输入金额',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (!(/^[0-9]*$/.test(that.data.price))) {
      wx.showModal({
        title: '提示',
        content: '请输入纯数字',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    else {
      that.setData({
        selectbao: false
      })
    }

  },
  queren:function(){
    var that=this
    var openId = wx.getStorageSync('openId');
    //确认充值
    console.log(that.data.price)
    that.setData({
      selectbao: true
    })
    var data = {
      openid:openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
      app.getData(getApp().globalData.url + "/Basics/CreateRechargeLog" + "?rechargeAmt=" + that.data.price, 'POST', data,
        '正在加载数据', header).then(res => {
          console.log(res)
          // 微信充值
          wx.requestPayment({
            'timeStamp': res.data.Json.Result.TimeStamp,
            'nonceStr': res.data.Json.Result.NonceStr,
            'package': res.data.Json.Result.Package,
            'signType': 'MD5',
            'paySign': res.data.Json.Result.PaySign,
            'success': function (res) {
              console.log(res)
              // if (res.data.Json.IsSuccess == true) {
              //   console.log(909090)
              wx.showModal({
                title: '提示',
                content: '充值成功',
                success: function (res) {
                  if (res.confirm) {
                    console.log(2222)                  
                    // wx.switchTab({
                    //   url: '/pages/fabutiaozhan/fabutiaozhan',
                    // })
                    console.log(that.data.challengeLogID)
                    if (that.data.challengeLogID ==undefined){
                      wx.switchTab({
                        url: '/pages/fabutiaozhan/fabutiaozhan',
                        fail: function () {
                          console.info("跳转失败")
                        }
                      })
                      console.log(that.data.challengeLogID)
                   
                    } else if (that.data.challengeLogID != undefined){
                      wx.navigateTo({
                        url: '/pages/baomingxingqing/baomingxiangqing?challengeLogID=' + that.data.challengeLogID,
                        fail: function () {
                          console.info("跳转失败")
                        }
                      })
                    }
                   
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })      
              console.log("zhifuchengg")
            },
            'fail': function (res) {       
              wx.showModal({
                title: '提示',
                showCancel:false,
                content: '充值失败，请稍后再试',
                success: function (res) {

                }
              })

              console.log("shibai")
              console.log(res)
            },
          })
        })
  },
  inputChange1: function (e) {
    var that = this
    that.setData({
      price: e.detail.value
    })
    console.log(that.data.price)
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
    var that = this
    var openId = wx.getStorageSync('openId');
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
        console.log(res)
        that.setData({
          TotalBalanceNum: res.data.Json.Result.TotalBalanceNum,
        })
      }
    })
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