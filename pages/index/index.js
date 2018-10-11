// pages/jinsai/jinsai.js
var bmap = require('../../libs/bmap-wx.min.js');
var time = require('../../utils/util.js');
var app = getApp();
var markersData = {
  latitude: '', //纬度
  longitude: '', //经度
  key: "f33634b0ddd5c593ff81affb3ffd6902"
};
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
    // console.log(NowTime)
    var total_micro_second = EndTime - NowTime || [];
    that.setData({
      clock: dateformat(total_micro_second)
    });
    if (total_micro_second <= 0) { 
      var time=that.data.time
      var jiesu = wx.getStorageSync("jiesu")
      that.setData({
        daojishi: total_micro_second
      })
      console.log(jiesu)
      if (jiesu==1){
        console.log("倒计时结束")
        that.kaishi() 
        this.dat
        return clearInterval(seter)     
      }
    
     if(time==true){
      //  that.setData({
      //    clock: "立即开始"
      //  });       
      //  return clearInterval(seter)
     }    
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
    hidden: false,
    weatherData: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentCity: "",
    pm25: 0,
    temperature: "",
    weatherDesc: "",
    city: null,
    country: null,
    currentTemp: null,
    forecast: [],
    pinyin: null,
    isFirst: false,
    adcode: '',
    nickName: "",
    gender: "",
    avatarUrl: "",
    city: "",
    country: "",
    province: "",
    // sessionid:"",
    sessionIds: "",
    ranking: 0,
    todayRun: 0,
    HotCard: 0,
    IntegralRecord: "",
    StepNum: "",
    ing: false,
    changdu: 7,
    animation: '',
    msgList: [],
    status: "未参加竞赛",
    status2: "即将开始",
    end_time: "",
    clock: "",
    jishu: 1,
    jishi:true,
    wujishi: false,
    settime:false,
    time:true,
    id:"",
    daojishi:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  rotateAni: function(n) {
    console.log("rotate==" + n)
    this.animation.rotate(180 * (n)).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  shuaxin: function() {
    //获取今日步数
    var openId = wx.getStorageSync('openId');
    var sessionkey = wx.getStorageSync('sessionkey');
    var that = this
    wx.getWeRunData({
      success(res) {
        var encryptedData = res.encryptedData
        var iv = res.iv
        var data = {
          openid: openId,
          sessionkey: sessionkey,
          encryptedData: encryptedData,
          iv: iv
        }
        var header = {
          'Content-Type': 'application/json'
        }
        app.getData(getApp().globalData.url + "/Basics/GetDecodedTodayStepNumLog", 'GET', data, '', header).then(res => {
          if (res.data.Json.IsLogin == false) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
            return;
          }

          if (res.data.Json.IsSuccess == false) {
            wx.showToast({
              title: '刷新失败',
              icon: "none"
            })
          } else {
            that.setData({
              todayRun: res.data.Json.Result.StepNum
            })
            wx.showToast({
              title: '刷新成功',
              icon: "none"
            })
          }
        })
      }
    })
  },
  onShow: function(options) {
    var that = this;
    var sessionkey = wx.getStorageSync('sessionkey');
    var header = {
      'Content-Type': 'application/json',
    }
    wx.setNavigationBarTitle({
      title: '天天来竞赛'
    })
    //获取用户当地天气
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'XfcMG33Ufq2H5POGvvycjFWqYR7NSmLM'
    });
    var fail = function(data) {

    };
    var success = function(data) {
      var weatherData = data.currentWeather[0].currentCity;
      that.setData({
        currentCity: data.currentWeather[0].currentCity,
        temperature: data.currentWeather[0].temperature,
        weatherDesc: data.currentWeather[0].weatherDesc,
        pm25: data.currentWeather[0].pm25,
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
    //获取首页积分记录集合
    var temp = '';
    app.getOpenId().then(() => {
      var openId = wx.getStorageSync('openId');
      var data = {
        openid: openId
      };
      app.getData(getApp().globalData.url + "/Basics/GetWeXinUser", 'GET', data, '', header).then(res => {
        console.log(res)
        if (res.data.Json.IsSuccess == false) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else {
          // 热卡币
          app.getData(getApp().globalData.url + "/Basics/GetUserTotalHotCard", 'GET', data, '', header).then(res => {
            console.log(res)
            if (res.data.IsLogin == false) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
            if (res.data.success == false) {
              wx.showToast({
                title: "加载失败",
                icon: "none"
              })

              // return
            } else {
              that.setData({
                HotCard: res.data.SparefieldOne,
                hidden: true
              })
            }
          })

         
          // 加载时获取用户今日步数
          // this.shuaxin()
          var openId = wx.getStorageSync('openId');
          var sessionkey = wx.getStorageSync('sessionkey');
          wx.getWeRunData({
            success(res) {
              var encryptedData = res.encryptedData
              var iv = res.iv
              var selfdata = {
                openid: openId,
                sessionkey: sessionkey,
                encryptedData: encryptedData,
                iv: iv
              }
              app.getData(getApp().globalData.url + "/Basics/GetDecodedTodayStepNumLog", 'GET', selfdata, '', header).then(res => {
                console.log(res)
                if (res.data.Json.IsLogin == false) {
                  wx.showToast({
                    title: "步数加载失败，请点击刷新按钮",
                    icon: "none"
                  })
                }
                if (res.data.Json.SparefieldOne != "") {
                  // wx.showToast({
                  //   title: res.data.Json.SparefieldOne,
                  //   icon: "none"
                  // })
                }
                if (res.data.Json.success == false) {
                  that.setData({
                    hidden: true,
                    todayRun: 0
                  })

                } else {
                  that.setData({
                    hidden: true,
                    todayRun: res.data.Json.Result != null ? res.data.Json.Result.StepNum : "0"
                  })
                }
              })
            }
          })
          // 排名
          app.getData(getApp().globalData.url + "/Basics/GetSelfStepNumLog", 'POST', data, '', header).then(res => {
            console.log(res)
            if (res.data.Json.IsLogin == false) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
            if (res.data.Json.IsSuccess == false) {

            } else {
              that.setData({
                ranking: res.data.Json.Result == null ? "0" : res.data.Json.Result.TemporaryRanking
              })
            }
          })
         
        }
      })
    })


    var openId = wx.getStorageSync('openId');
    var data = {
      openid: openId
    };
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetOngoingEnrollLog", 'POST', data, '', header).then(res => {
      console.log(res)

      if (res.data.Json.IsLogin == false) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
      if (res.data.Json.Result == null) {
        console.log(1212121)
        that.setData({
          status: "未参加比赛",
          StepNum: "当前无进行中的比赛",
          ing: true,
          jishu: 1
        })

      } else {
        console.log("uouo")
        if (res.data.Json.Result.DisplayEnrollStatus == '已报名') {
          var first_monday = res.data.Json.Result.DisplayStartTime
          var stringTime = first_monday;
          that.setData({
            end_time: StringToDate(stringTime), //项目截止时间，时间戳，单位毫秒
            id:res.data.Json.Result.ID
          })
          !that.data.settime ? countdown(that) : '';
          var zhuangtai=wx.getStorageSync("zhuangtai")
          
          if (zhuangtai==false&&that.data.daojishi < 0) {
            console.log("hahahhahahhhhhhhhhhhhh")
            that.setData({
              status: "未参加比赛",
              StepNum: "当前无进行中的比赛",
              jishi: true,
              ing: true,
              wujishi: false,
              jishu: 1
            })
          }else{
            that.setData({
              ing: false,
              StepNum: res.data.Json.Result.StepNum + "步达标赛",
              status: "离开始比赛还有：" + that.data.clock,
              jishu: 1,
              wujishi: true,
              jishi: false
            })
          }
        } else {
          that.setData({
            status: "您当前比赛" + res.data.Json.Result.CurrentStepNum + "步，请提交",
            status2: "正在进行",
            StepNum: res.data.Json.Result.StepNum + "步达标赛",
            ing: false,
            jishu: 2,
            wujishi: false,
            jishi: true
          })
        }
      }
    })
  },
  onReady() {
    let that = this;
    var header = {
      'Content-Type': 'application/json',
    }
    var openId = wx.getStorageSync('openId');
    var data = {
      openid: openId
    }
    app.getData(getApp().globalData.url + "/Basics/GetPrizeWinForPage", 'GET', '', '', header).then(res => {
      console.log("jinqu2222")
      that.setData({
        IntegralRecord: res.data.Json.Result,
      })
    })
    //获取首页热卡币记录集合
    app.getData(getApp().globalData.url + "/Basics/GetHotCardLogForPage", 'POST', '', '', header).then(res => {
      console.log(res)
      that.setData({
        msgList: res.data.Json.Result,
        changdu: res.data.Json.Result.length
      })
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function() {
    var that=this
    // 获取用户进行中的竞赛报名信息
    console.log(that.data.jishu)
    wx.setStorageSync("jiesu", that.data.jishu)
    
  },
  begin: function() {
    var that = this
    if (that.data.jishu != 2) {
      console.log("jieshu")
      return
    } else {
      that.setData({
        time: false
      })
      var openId = wx.getStorageSync('openId');
      var sessionkey = wx.getStorageSync('sessionkey');
      var that = this
      var data = {
        openid: openId
      };
      var header = {
        'Content-Type': 'application/json'
      }
      app.getData(getApp().globalData.url + "/Basics/GetOngoingEnrollLog", 'POST', data, '', header).then(res => {
        console.log(res)
        wx.setStorageSync('zhuangtai', res.data.Json.IsLogin)
        if (res.data.Json.IsLogin == false) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return;
        }
        if (res.data.Json.IsSuccess == false) {
          wx.showToast({
            title: '提交失败',
            icon: "none"
          })
        } else {
          that.setData({
            status: "您当前比赛" + res.data.Json.Result.CurrentStepNum + "步，请提交",
            jishu: 2,    
          })
          wx.setStorageSync("jiesu", that.data.jishu)
          wx.showToast({
            title: '提交成功',
            icon: "none"
          })
        }
      })


    }
  },
  test: function test(resolve, reject) {
    var timeOut = Math.random() * 2;

    setTimeout(function() {
      if (timeOut < 1) {

        resolve('200 OK');
      } else {

        reject('timeout in ' + timeOut + ' seconds.');
      }
    }, timeOut * 1000);
  },
  getWeXinUser: function getWeXinUser(resolve, reject) {

  },
  kaishi(){
    console.log("caonima")
    
    var openId = wx.getStorageSync('openId');
    var that = this
    var daojishi = that.data.daojishi

    console.log(that.data.id)
    var data = {
      enrollId:that.data.id
    };
    var header = {
      'Content-Type': 'application/json'
    }
    app.getData(getApp().globalData.url + "/Basics/GettEnrollIsNotSuccess", 'GET', data, '', header).then(res => {
      console.log(res)
      if (res.data.IsSuccess == true ) {
        that.setData({
          clock: "立即开始"
        });
      } else if (res.data.IsSuccess == false ){
        console.log("weichenggong")
        that.setData({
          status: "未参加比赛",
          StepNum: "当前无进行中的比赛",
          jishi:true,
          ing: true,
          wujishi:false,
          jishu: 1
        })
        console.log(that.data.status)
      }
    })
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