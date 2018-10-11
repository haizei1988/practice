// pages/baomingxingqing/baomingxiangqing.js
var WxParse = require('../../wxParse/wxParse.js');
var App = getApp()

var util = require('../../utils/util.js');
// 倒计时
// 倒计时
function countdown(that) {
  console.log(12332)
  var seter = setInterval(function () {
    // total_micro_second -= 1000;
    that.setData({
      settime: true
    })
    // app.globalData.setInterval = true;
    var EndTime = new Date(that.data.end_time).getTime() || [];
    var NowTime = new Date().getTime();
    var total_micro_second = EndTime - NowTime || [];
    // 渲染倒计时时钟
    that.setData({
      clock: dateformat(total_micro_second)
    });
    if (total_micro_second <= 0) {
      that.setData({
        clock: "已经截止"
      });
      return clearInterval(seter)
      // return app.clearInterval('seter');
    }
  }, 1000)
}
// 1532620797381
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
  // 总秒数
  var second = Math.floor(micro_second / 1000);
  // 天数
  var day = Math.floor(second / 3600 / 24);
  // 小时
  var hr = Math.floor(second / 3600 % 24);
  // 分钟
  var min = Math.floor(second / 60 % 60);
  // 秒
  var sec = Math.floor(second % 60);
  return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
}
// 转时间戳
function StringToDate(value) {
  var d = new Date(value);
  d.setYear(parseInt(value.substring(0, 4), 10));
  d.setMonth(parseInt(value.substring(5, 7) - 1, 10));
  d.setDate(parseInt(value.substring(8, 10), 10));
  d.setHours(parseInt(value.substring(11, 13), 10));
  d.setMinutes(parseInt(value.substring(14, 16), 10));
  console.log(d)
  return d;
};

Page({
  data: {
    selectbao: true,
    checkbox: '../../images/after.png',
    status: true,
    befor: false,
    after: true,
    challengeLogID: "",
    StartTime: "",
    EndTime: "",
    TotalPeopleNum: "",
    HaveEnrollNum: "",
    StepNum: "",
    HaveEnrollAmt: "",
    time: "",
    id: '',
    result: [],
    end_time: '',
    clock: '',
    DisplayStartDate: "",
    WeXinUserName: "",
    ChallengeAmt: "",
    mianze: "",
    content: "",
    hidden: true,
    formId: "",
    settime:false
  },

  onLoad: function(option) {
    var that = this
    this.$wuxToast = App.wux(this).$wuxToast
    wx.setNavigationBarTitle({
      title: "报名参加",
      success: function(res) {}
    })
    that.setData({
      challengeLogID: option.challengeLogID,
    })
    var challengeLogID = that.data.challengeLogID
    App.getOpenId().then(() => {
      var openId = wx.getStorageSync('openId');
      var data = {
        openid: openId
      };
      var header = {
        'Content-Type': 'application/json',
      }
      App.getData(getApp().globalData.url + "/Basics/GetWeXinUser", 'GET', data, '', header).then(res => {
        if (res.data.Json.IsSuccess == false) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else {
          App.getData(getApp().globalData.url + "/Basics/GetsChallengeLogByID" + "?challengeId=" + challengeLogID, 'GET', data, '正在加载数据', header).then(res => {
            console.log(res)
            if (res.data.IsLogin == false) {
              wx.navigateTo({
                url: '/pages/login/login',
              })          
            }
            that.setData({
              StartTime: res.data.Json.Result.DisplayStartTime,
              EndTime: res.data.Json.Result.DisplayEndTime,
              DisplayStartDate: res.data.Json.Result.DisplayStartDate,
              // DisplayShortStartTime: res.data.Json.Result.DisplayShortStartTime,
              TotalPeopleNum: res.data.Json.Result.TotalPeopleNum,
              HaveEnrollNum: res.data.Json.Result.HaveEnrollNum,
              StepNum: res.data.Json.Result.StepNum,
              HaveEnrollAmt: res.data.Json.Result.HaveEnrollAmt,
              ChallengeAmt: res.data.Json.Result.DisplayChallengeAmt,
              WeXinUserName: res.data.Json.Result.WeXinUserName
            })
            var first_monday = res.data.Json.Result.DisplayShortStartTime;
            var stringTime = first_monday;
            // var fm_timestamp = Date.parse(new Date(stringTime));
            that.setData({
              end_time:StringToDate(stringTime), //项目截止时间，时间戳，单位毫秒
            })
            !that.data.settime ? countdown(that) : '';
          })
        }
      })
    })
    //获取免责声明
    wx.request({
      url: getApp().globalData.url + "/Basics/GetBasicsExplainDTOByType",
      method: "GET",
      data: {
        typeNum: 600
      },
      header: {
        'Content-Type': 'application/json',

      },
      success: function(res) {
        console.log(res)
        var markdown = res.data.Json.Result.ExplainContent
        WxParse.wxParse('markdown', 'md', markdown, that, 5);
      }
    })
  },
  lookDesc() {
    this.setData({
      selectbao: false,
    })
  },
  checkType: function() {
    var self = this
    if (!self.data.status) {
      self.setData({
        status: !self.data.status,
        checkbox: '../../images/after.png'
      })
    } else {
      self.setData({
        status: !self.data.status,
        checkbox: '../../images/before.png'
      })
    }
  },
  // 点击出现弹框
  submit: function(e) {
    console.log(e.detail.formId);
    const that = this
    that.setData({
      formId: e.detail.formId
    })
    wx.showModal({
      title: '提示',
      content: '确认参加本次比赛，每个用户同一时段只能参加一次比赛',
      success: function(res) {
        if (res.confirm) {
          that.clickbao()
        }
      }
    })
  },
  clickbao: function() {
    console.log(this.data.formId)
    var formId = this.data.formId
    var that = this
    if (!this.data.status) {
      this.$wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: '请阅读用户协议',
        success: () => console.log('文本内容')
      })
    } else {
      var challengeLogID = this.data.challengeLogID
      var openId = wx.getStorageSync('openId');
      var data = {
        openid: openId,
        formid: formId,
        challengeLogID: challengeLogID
      };
    
      var header = {
        'Content-Type': 'application/json',
      }
      // 发起请求

      App.getOpenId().then(() => {
        App.getData(getApp().globalData.url + "/Basics/CreateBasicsEnrollLog", 'POST', data,
          '正在加载数据', header).then(res => {
            console.log(res)
            if (res.data.IsLogin == false) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
           
         
          var content = res.data.OperationDesc
          this.setData({
            content: res.data.OperationDesc,
            hidden: false
          })
          wx.showModal({
            title: '提示',
            content: res.data.OperationDesc,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                if (content == "余额不足，请充值后重试！") {
                  wx.navigateTo({
                    url: '/pages/chongzhi/chongzhi?challengeLogID=' + that.data.challengeLogID,
                  })
                  return
                }
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/tiaozhanjilu/tiaozhanjilu',
                })

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        })
      })
    }
  },
  confirm1: function() {
    var that = this
    if (this.data.content == "余额不足，请充值后重试！") {
      wx.navigateTo({
        url: '/pages/chongzhi/chongzhi?challengeLogID=' + that.data.challengeLogID,
      })
      this.setData({
        hidden: true
      });
    } else {
      wx.navigateTo({
        url: '/pages/tiaozhanjilu/tiaozhanjilu',
      })
      this.setData({
        hidden: true
      });
    }

  },
  clickclose: function() {
    var selectbao = this.data.selectbao;
    this.setData({
      selectbao: true,
      befor: true,
      after: false,
      status: true,
      checkbox: '../../images/after.png'
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