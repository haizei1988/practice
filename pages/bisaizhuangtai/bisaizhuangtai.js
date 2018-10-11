// pages/bisaizhuangtai/bisaizhuangtai.js
var app=getApp()
// 倒计时
function countdown(that) {
  console.log(12332)
  var seter = setInterval(function () {
    // total_micro_second -= 1000;
    that.setData({
      settime:true
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
    ID:"",
    kaishi:false,
    jieshu:true,
    first:"",
    second:"",
    third:"",
    touxiang:"",
    WhetherDrawn:"",
    DisplayPersonalBonus:"",
    RankingNum:"",
    ChallengeAmt:"",
    src: '../../images/d1a20cf431adcbef63081c28abaf2edda3cc9fdb.jpg',
    SNickname: "",
    Autograph: "热爱生活热爱运动，这是一种态度",
    SHeadimgurl: '',
    DisplayEnrollStatus: "",
    StepNum: "",
    HaveEnrollAmt: "",
    TotalBalanceNum: "",
    TotalIntegralNum: "",
    PersonalBonus: "",
    DisplayEndTime:"",
    StartTime: "",
    kaishi: false,
    jieshu: true,
    clock: "",
    end_time: "",
    zhuangtai: "",
    wubisai: true,
    DisplayChallengeAmt:"",  
    bonus:"热卡币",
    status:"",
    settime:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this
    app.globalData.setInterval = false;
    wx.setNavigationBarTitle({
      title: "我的竞赛",
      success: function (res) {
      }
    })
    var openId = wx.getStorageSync('openId');
    that.setData({
      ID: options.ID,
      status: options.status
    })
    console.log(that.data.ID)
    //获取用户的信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetWeXinUser",
      method: "GET",
      data: {
        openid: openId
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
    //从挑战记录页面跳转过来的信息

    wx.request({
      url: getApp().globalData.url + "/Basics/GetEnrollLogById",
      method: "GET",
      data: {
        openid: openId,
        enrollId: that.data.ID
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        if (res.data.Json.Result.DisplayChallengeAmt=='免费'){
          that.setData({
            bonus:"积分"
          })
        }
      
      if (res.data.Json.Result.DisplayEnrollStatus!="已结束"){
         that.setData({
            kaishi:false,
            jieshu:true,
            DisplayEnrollStatus: res.data.Json.Result.DisplayEnrollStatus,
            StepNum: res.data.Json.Result.StepNum,
            TotalChallengeAmt: res.data.Json.Result.TotalChallengeAmt ,
            PersonalBonus: res.data.Json.Result.PersonalBonus,
            RewardHotCardNum: res.data.Json.Result.RewardHotCardNum,
            HaveEnrollNum: res.data.Json.Result.HaveEnrollNum,
            HaveEnrollAmt: res.data.Json.Result.HaveEnrollAmt,
            StartTime: res.data.Json.Result.DisplayStartTime,
            EndTime: res.data.Json.Result.DisplayEndTime,
            DisplayChallengeAmt: res.data.Json.Result.DisplayChallengeAmt,
         })
         if (res.data.Json.Result.DisplayEnrollStatus == "已报名"){
           var first_monday = that.data.StartTime;
           var stringTime = first_monday;
           
          
           that.setData({
             RewardHotCardNum: res.data.Json.Result.RewardHotCardNum,
             end_time: StringToDate(stringTime),
             zhuangtai: "离开始比赛还有："
           })
         }
         if (res.data.Json.Result.DisplayEnrollStatus == "进行中") {
           that.setData({
             kaishi: false,
             wubisai: true,
             zhuangtai: "离结束比赛还有：",
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
           that.setData({
             end_time: StringToDate(stringTime),
           })
         } 
         !that.data.settime ? countdown(that) : '';
        // countdown(that);
      }else{
              var arr=[]
              var arr1 = []
          for (var i = 0; i < res.data.Json.Result.BasicsWinUsers.length;i++){
            arr1 = arr.push(res.data.Json.Result.BasicsWinUsers[i])
            console.log(res.data.Json.Result.BasicsWinUsers[i])
          }
          // arr = arr.push(arr1)
          
          console.log(arr)
        that.setData({
          kaishi: true,
          jieshu: false,
          zhuangtai:"离结束比赛还有：",   
          touxiang: arr,
          // first: res.data.Json.Result.BasicsWinUsers[0].SHeadimgurl,
          // second: res.data.Json.Result.BasicsWinUsers[1].SHeadimgurl,
          // third: res.data.Json.Result.BasicsWinUsers[2].SHeadimgurl,        
          DisplayEnrollStatus: res.data.Json.Result.DisplayEnrollStatus,
          StepNum: res.data.Json.Result.StepNum,
          DisplayPersonalBonus: res.data.Json.Result.DisplayPersonalBonus,
          RankingNum: res.data.Json.Result.RankingNum,
          TotalChallengeAmt: res.data.Json.Result.TotalChallengeAmt,
          PersonalBonus: res.data.Json.Result.PersonalBonus,
          RewardHotCardNum: res.data.Json.Result.RewardHotCardNum,
          HaveEnrollNum: res.data.Json.Result.HaveEnrollNum,
          HaveEnrollAmt: res.data.Json.Result.HaveEnrollAmt,
          StartTime: res.data.Json.Result.DisplayStartTime,
          ChallengeAmt: res.data.Json.Result.ChallengeAmt,
          EndTime: res.data.Json.Result.DisplayEndTime,
          DisplayChallengeAmt: res.data.Json.Result.DisplayChallengeAmt,
          WhetherDrawn: res.data.Json.Result.WhetherDrawn,
        })
        var first_monday = that.data.DisplayEndTime;
        var stringTime = first_monday;
        that.setData({
          end_time: StringToDate(stringTime).getTime()
        })
        !that.data.settime ? countdown(that) : '';
      }
      }
    })
  },
  challengMoney: function (e) {
    wx.navigateTo({
      url: '/pages/challeng/challeng?name=' + e.currentTarget.dataset.type,
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
  // onLoad: function () {

  // },

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