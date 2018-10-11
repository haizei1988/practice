// pages/user/user.js
var app=getApp()
Page({
  data: {
    SNickname:" ",
    qianming:"这个人很懒，什么都没留下",
    selectbao: true,
    selectbao1: true,
    numbers: '028-83614257',
    EnrollNum :0,
    AwardNum :0,
    FailNum:0,
    num:22,
    TotalIntegralNum :0,
    TotalHotCardNum :0,
    SHeadimgurl:"",
    UnreadMessage:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this
    var nickName = wx.getStorageSync('nickName');
    wx.setNavigationBarTitle({
      title: "我",
      success: function (res) {
        // success
      }
    })
    that.setData({
      nickName: nickName
    })
    var openId = wx.getStorageSync('openId');
  },
  
  // 点击出现弹框
  clickbao: function () {
    var that=this
    var selectbao = this.data.selectbao;
    this.setData({
      selectbao: false
    })

    //获取信息
    var data = {
      configKey: 100
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetSysConfigSettingByKey", 'GET', data, '', header).then(res => {
      console.log(res)
      that.setData({
        numbers: res.data.Json.Result.ConfigValue
      })
    })
  },
  clickclose: function () {
    var selectbao = this.data.selectbao;
    this.setData({
      selectbao: true
    })
  },
  phone: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.numbers
    })
  },
  modalinput: function () {
    this.setData({
      selectbao1: !this.data.selectbao1
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      selectbao1: true
    });
  },
  bindKeyInput: function (e) {
    var that = this
    that.setData({
      qianming: e.detail.value
    })
    console.log(that.data.qianming)
  },  
  //确认  
  confirm: function (e) {
    //编辑个性签名
    this.setData({
      qianming: this.data.qianming
    })
    var openId = wx.getStorageSync('openId');
    var qianming = this.data.qianming
    console.log(this.data.qianming)
      console.log("jinru")
      var data = {
        openid:openId
      }
      var header = {
        'Content-Type': 'application/json',
      }
      app.getData(getApp().globalData.url + "/Basics/EditUserAutograph" + "?Autograph=" + qianming, 'POST',data, '', header).then(res => {
        if (res.data.IsSuccess) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
          })
        }
      })
    this.setData({
      selectbao1: true
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
    var that = this
    var openId = wx.getStorageSync('openId');
    wx.request({
      url: getApp().globalData.url + "/Basics/GetWeXinUser",
      method: "GET",
      data:{openid:openId},
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        if (res.data.Json.Result.Autograph == null) {
          that.setData({
            qianming: "这个人很懒，什么都没留下",
            EnrollNum: res.data.Json.Result.EnrollNum,
            AwardNum: res.data.Json.Result.AwardNum,
            FailNum: res.data.Json.Result.FailNum,
            TotalIntegralNum: res.data.Json.Result.TotalIntegralNum,
            TotalHotCardNum: res.data.Json.Result.TotalHotCardNum,
            SHeadimgurl: res.data.Json.Result.SHeadimgurl,
            SNickname: res.data.Json.Result.SNickname
          })
        } else {
          that.setData({
            qianming: res.data.Json.Result.Autograph,
            EnrollNum: res.data.Json.Result.FailNum + res.data.Json.Result.AwardNum,
            AwardNum: res.data.Json.Result.AwardNum,
            FailNum: res.data.Json.Result.FailNum,
            TotalIntegralNum: res.data.Json.Result.TotalIntegralNum,
            TotalHotCardNum: res.data.Json.Result.TotalHotCardNum,
            SHeadimgurl: res.data.Json.Result.SHeadimgurl,
            SNickname: res.data.Json.Result.SNickname
          })
        }

      }
    })
    //获取未读消息
    var data = {
      openid:openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetUserNoReadMessage", 'GET', data, '', header).then(res => {
      console.log(res)
      that.setData({
        UnreadMessage: res.data
      })
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