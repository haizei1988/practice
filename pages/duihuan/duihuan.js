// pages/duihuan/duihuan.js
var app=getApp()
Page({
  data: {
    selectbao: true,
    selectbao2: true,
    showModal: false,
    ID:"",
    StroongAttachments:"",
    GoodName:"",
    GoodPriceStr:"",
    ExchangeDetail:"",
    phone:"",
    TotalHotCardNum:"",
    wx:"",
    baseurl: getApp().globalData.url ,
    hidden:true
  },
  // 点击出现弹框
  clickbao: function () {
    var selectbao = this.data.selectbao;
    this.setData({
      selectbao: false
    })
  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });

  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  inputChange1:function(e){
    var that=this
    // var phone=e.detail.phone
    that.setData({
      phone: e.detail.value
    })
  },
  inputChange2: function (e) {
    var that = this
    // var phone=e.detail.phone
    that.setData({
      wx: e.detail.value
    })
  },
  onConfirm: function () {
    var that = this
    if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(that.data.phone))) {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的手机号码',
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

    var openId = wx.getStorageSync('openId');
    var selectbao = this.data.selectbao;
    if (that.data.phone==""){
      wx.showModal({
        title: '提示',
        content: '请输入信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      that.hideModal();
      that.setData({
        hidden:false
      })
      // 开始兑换
      var data = {
        openid: openId
      }
      var header = {
        'Content-Type': 'application/json',
      }
      app.getData(getApp().globalData.url + "/Basics/CreateBasicsGood" + "?goodId=" + that.data.ID + "&userPhone=" + that.data.phone + "&userWeXinNum=" + that.data.wx, 'POST', data,
        '', header).then(res => {
          console.log(res)
          that.setData({
            hidden: true
          })
          if (res.data.OperationDesc != "热卡币不足，无法兑换！") {
            //获取用户的热卡币
            app.getData(getApp().globalData.url + "/Basics/GetUserTotalHotCard", 'GET', data, '', header).then(res => {
              if (res.data.Success == false) {
                wx.showToast({
                  title: res.data.errmsg[0],
                  icon: "none"
                })
                return
              } else {
                wx.showToast({
                  title: "兑换商品成功",
                  icon: "none"
                })
                that.setData({
                  TotalHotCardNum: res.data.SparefieldOne
                })
              }
            })   
            that.setData({
              selectbao: true,
              selectbao2: false
            })
          } else {
    
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.OperationDesc,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })   
          }
        })








      // wx.request({
      //   url: getApp().globalData.url + "/api/Basics/CreateBasicsGood" + "?goodId=" + that.data.ID + "&userPhone=" + that.data.phone
      //   + "&userWeXinNum=" + that.data.wx,
      //   method: "POST",
      //   data: {

      //   },
      //   header: {
      //     'Content-Type': 'application/json',
      //     "sessionId": sessionId
      //   },
      //   success: function (res) {
      //     console.log(res)
      //     if (res.data.OperationDesc != "热卡币不足，无法兑换！") {
      //       that.setData({
      //         selectbao: true,
      //         selectbao2: false
      //       })
      //     } else {
      //       wx.showToast({
      //         title: res.data.OperationDesc,
      //         icon: "none"
      //       })
      //     }
      //   }
      // })

          // wx.request({
          //   url: getApp().globalData.url + "/api/Basics/GetWeXinUser",
          //   method: "GET",
          //   header: {
          //     'Content-Type': 'application/json',
          //     "sessionId": sessionId
          //   },
          //   success: function (res) {
          //     console.log(res)
          //     that.setData({
          //       TotalHotCardNum: res.data.Json.Result.TotalHotCardNum
          //     })
          //   }
          // })


    }
  },
  clickclose: function () {
    var selectbao = this.data.selectbao;
    this.setData({
      selectbao: true,
      selectbao2: false
    })
  },
  clickclose2: function () {
    var selectbao = this.data.selectbao;
    this.setData({
      selectbao2: true
    })
    wx.navigateTo({
      url: '/pages/duihuanjilu/duihuanjilu',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that=this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: "商品兑换",
      success: function (res) {
        // success
      }
    })
    that.setData({
      ID: options.ID,
    })
    //获取详细兑换信息
    var data = {
      goodId: that.data.ID,
      openid:openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetBasicsGoodById", 'GET', data,
      '', header).then(res => {
        var content="" 
        if (res.data.Json.Result.ExchangeDetail==null){
          content:"暂无介绍"
        }else{
          content = app.convertHtmlToText(res.data.Json.Result.ExchangeDetail)
        }
        
        console.log(content)
        console.log(res)
        that.setData({
          StroongAttachments: res.data.Json.Result.StroongAttachments[0].AttachmentURL,
          SmallAttachments: res.data.Json.Result.SmallAttachments[0].AttachmentURL,
          GoodName: res.data.Json.Result.GoodName,
          GoodPriceStr: res.data.Json.Result.GoodPriceStr,
          ExchangeDetail: content,
          GoodPrice: res.data.Json.Result.GoodValuation
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