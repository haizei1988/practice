var app=getApp()
// 倒计时
function countdown(that) {
  console.log(12332)
  var seter = setInterval(function() {
    // total_micro_second -= 1000;
    app.globalData.setInterval = true;
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
    src: '../../images/d1a20cf431adcbef63081c28abaf2edda3cc9fdb.jpg',
    SNickname: "",
    Autograph: "这个人很懒，什么都没留下",
    SHeadimgurl: '',
    DisplayEnrollStatus: "",
    StepNum: "",
    TotalBalanceNum: "",
    TotalIntegralNum: "",
    RewardHotCardNum: "",
    DisplayEndTime: "",
    DisplayStartTime: "",
    kaishi: true,
    jieshu: true,
    clock: "",
    end_time: "",
    zhuangtai: "",
    wubisai: false,
    ID: "",
    DisplayChallengeAmt: "",
    HaveEnrollAmt: "",
    bonus:"热卡币",
nowtime:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var time = new Date().getTime();
    console.log(time)
    that.setData({
      nowtime: time
    }) 
    wx.setNavigationBarTitle({
      title: "我的竞赛",
      success: function(res) {
        // success
      }
    })
  },
  challengMoney: function(e) {
    wx.navigateTo({
      url: '/pages/challeng/challeng?name=' + e.currentTarget.dataset.type,
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
    var that = this 
    var time = new Date().getTime();
    var openId = wx.getStorageSync('openId');
    //获取用户进行中的竞赛报名信息
    var data = {
      openid: openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetOngoingEnrollLog", 'POST', data, '', header).then(res => {
      if (res.data.Json.Result!=null){
        if (res.data.Json.Result.DisplayEnrollStatus == '进行中') {
          console.log("进入免费")
          if (res.data.Json.Result.DisplayChallengeAmt == '免费') {
            that.setData({
              bonus: "积分"
            })
          }
          that.setData({
            kaishi: false,
            wubisai: true,
            DisplayEnrollStatus: res.data.Json.Result.DisplayEnrollStatus,
            StepNum: res.data.Json.Result.StepNum,
            DisplayChallengeAmt: res.data.Json.Result.DisplayChallengeAmt,
            HaveEnrollAmt: res.data.Json.Result.HaveEnrollAmt,
            RewardHotCardNum: res.data.Json.Result.RewardHotCardNum,
            HaveEnrollNum: res.data.Json.Result.HaveEnrollNum,
            DisplayEndTime: res.data.Json.Result.DisplayEndTime,
            DisplayStartTime: res.data.Json.Result.DisplayStartTime,
          })
          var first_monday = that.data.DisplayEndTime;
          var stringTime = first_monday;
          console.log(that.data.DisplayEndTime)
          that.setData({
            end_time: StringToDate(that.data.DisplayEndTime)
          })
          console.log(app.globalData.setInterval)
          !app.globalData.setInterval ? countdown(that) : '';
        }
      }
     else{
         that.setData({
           kaishi: true,
           jieshu: true,
           wubisai: false
         })
      }

    })
    //获取用户的信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetWeXinUser",
      method: "GET",
      data:{
        openid:openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {

        if (res.data.Json.Result.Autograph == null) {
          that.setData({
            SNickname: res.data.Json.Result.SNickname,
            Autograph: "这个人很懒，什么都没留下",
            SHeadimgurl: res.data.Json.Result.SHeadimgurl,
            TotalBalanceNum: res.data.Json.Result.TotalBalanceNum,
            TotalIntegralNum: res.data.Json.Result.TotalIntegralNum
          })
        } else {
          that.setData({
            SNickname: res.data.Json.Result.SNickname,
            Autograph: res.data.Json.Result.Autograph,
            SHeadimgurl: res.data.Json.Result.SHeadimgurl,
            TotalBalanceNum: res.data.Json.Result.TotalBalanceNum,
            TotalIntegralNum: res.data.Json.Result.TotalIntegralNum
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.globalData.setInterval = false;
    console.log(app.globalData.setInterval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.setInterval = false;
    console.log(app.globalData.setInterval)
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