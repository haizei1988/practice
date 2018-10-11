// pages/jinsai/jinsai.js
var WxParse = require('../../wxParse/wxParse.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var App = getApp()
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SNickname: "",
    qianming: "热爱生活热爱运动，这是一种态度",
    SHeadimgurl: "",
    array: ['3元', '5元'],
    index: 0,
    num: "请输入3到66人",
    bushu: "6000到10000步",
    befor: false,
    after: true,
    shengming: true,
    arraytime: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    index1: 0,
    index2: 23,
    time_hour: "",
    time_over: "",
    time_over_hour: '',
    date: "2018-05-09",
    date_over: "2018-05-10",
    mianze: "",
    checkbox: '../../images/after.png',
    status: true,
    money: false,
    xuanze: true,
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
  
  },
  clickclose() {
    this.setData({
      status: true,
      shengming: !this.data.shengming,
      checkbox: '../../images/after.png'
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
  readDecs() {
    this.setData({
      shengming: !this.data.shengming
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var date = new Date();
    console.log(date.getHours())
    console.log(date.getMinutes())

    var userDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1)
    var time = date.getHours() + ':' + date.getMinutes()
    var that = this
    var openId = wx.getStorageSync('openId');
    this.$wuxToast = App.wux(this).$wuxToast
    wx.setNavigationBarTitle({
      title: "发布挑战",
      success: function(res) {
        // success
      }
    })
    that.setData({
      date: userDate,
      date_over: userDate,
      time: time,
      time_over: time
    })

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    var aa = obj1.dateTimeArray.pop()
    console.log(obj1.dateTimeArray)

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    //获取用户的信息

    var data = {
      openid: openId
    }
    var header = {
      'Content-Type': 'application/json',

    }
    App.getData(getApp().globalData.url + "/Basics/GetWeXinUser", 'GET', data, '正在加载数据', header).then(res => {
      console.log(res)
      if (res.data.Json.Result.Autograph == null) {
        that.setData({
          qianming: "这个人很懒，什么都没留下",
          SHeadimgurl: res.data.Json.Result.SHeadimgurl,
          SNickname: res.data.Json.Result.SNickname
        })
      } else {
        that.setData({
          qianming: res.data.Json.Result.Autograph,
          SHeadimgurl: res.data.Json.Result.SHeadimgurl,
          SNickname: res.data.Json.Result.SNickname
        })
      }

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
        var markdown = res.data.Json.Result.ExplainContent
        WxParse.wxParse('markdown', 'md', markdown, that, 5);
        // var content = App.convertHtmlToText(res.data.Json.Result.ExplainContent)
        // console.log(content)
        // console.log(res)
        // that.setData({
        //   mianze: content ,

        // })
      }
    })
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },

  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {

    this.setData({
      index1: e.detail.value
    })

  },
  bindDateChange2: function(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange2: function(e) {
    // console.log(e.detail.value)
    // var yourString = e.detail.value
    // var result = yourString.split(":");
    // this.setData({
    //   time_over: e.detail.value,
    //   time_over_hour: result[0]
    // })
    this.setData({
      index2: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log(e.detail.formId)
    var formId = e.detail.formId
    console.log(3232323)
    console.log(e.detail.value.bushu)
    var openId = wx.getStorageSync('openId');
    var p_num = Number(e.detail.value.num)
    var bushu = Number(e.detail.value.bushu)
    if (!(/^[0-9]*$/.test(p_num))) {
      wx.showModal({
        title: '提示',
        content: '请正确输入人数',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    if (!(/^[0-9]*$/.test(bushu))) {
      wx.showModal({
        title: '提示',
        content: '请正确输入步数',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    var that = this
    if (!that.data.status) {
      that.$wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: '请阅读用户协议',
        success: () => console.log('文本内容')
      })
      return
    }
    var years = that.data.dateTimeArray1[0][that.data.dateTime1[0]] + "-" + that.data.dateTimeArray1[1][that.data.dateTime1[1]] + "-" +
      that.data.dateTimeArray1[2][that.data.dateTime1[2]]
    var startTime = years+ ' ' + that.data.dateTimeArray1[3][that.data.dateTime1[3]] + ":00"
    var endTime = years + ' ' + that.data.arraytime[that.data.index2] + ":00"
    // var startTime = that.data.date + ' ' + that.data.arraytime[that.data.index1] + ":00"   //改过
    // var endTime = that.data.date + ' ' + that.data.arraytime[that.data.index2] + ":00" //改过
    console.log(years)
    console.log(startTime)
    console.log(endTime)
    if (that.data.arraytime[that.data.index2] == 24) {
      endTime = years  + ' ' + "23:59"
    }

    var challengeAmt = that.data.array[that.data.index]
    var index = 1
    if (challengeAmt == "请选择金额") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择金额',
        success: function(res) {

        }
      })
    }
    if (challengeAmt == "3元") {
      index = 3
    }
    if (challengeAmt == "5元") {
      index = 5
    }
    //提交信息
    var data = {
      openid: openId,
      formid: formId,
    }
    var header = {
      'Content-Type': 'application/json',
    }

    // if (endTime - startTime > 7) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '比赛时间应小于7天',
    //     success: function(res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    //   return
    // }

    if (index == 5) {
      if (bushu < 10000 || bushu > 50000 || p_num < 3 || p_num > 40) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的步数或人数',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        var data2={
          openid: openId,
          startTime: startTime,
          endTime: endTime,
          challengeAmt: index,
          totalPeopleNum: p_num,
          stepNum: bushu
        }
        console.log("进入发布挑战")
        App.getData(getApp().globalData.url + "/Basics/CreateChallengeLog", 'POST', data2, '正在加载数据', header).then(res => {
          console.log(res)
          if (res.data.IsSuccess == false) {
            wx.showModal({
              title: '提示',
              content: res.data.OperationDesc,
              showCancel: false,
              success: function(res) {}
            })
          } else {
            var ID = res.data.SparefieldOne
            wx.showModal({
              title: '提示',
              content: "发布竞赛成功，是否参加此次比赛",
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  //  参加比赛
                  App.getData(getApp().globalData.url + "/Basics/CreateBasicsEnrollLog" + "?challengeLogID=" + ID, 'POST', data, '正在加载数据', header).then(res => {
                    console.log(res)
                    if (res.data.OperationDesc == "报名成功") {
                      wx.showModal({
                        title: '提示',
                        content: res.data.OperationDesc,
                        showCancel: false,
                        success: function(res) {
                          if (res.confirm) {
                            wx.setStorageSync('recordflag', true)
                            console.log('用户点击取消')
                            wx.navigateTo({
                              url: '/pages/tiaozhanjilu/tiaozhanjilu',
                            })
                          }
                        }
                      })
                    } else {
                      if (res.data.OperationDesc == "报名失败，欲报名竞赛时段和已报名竞赛时段冲突！") {
                        wx.setStorageSync('recordflag', true)
                        console.log('用户点击取消')
                        wx.navigateTo({
                          url: '/pages/tiaozhanjilu/tiaozhanjilu',
                        })
                        return
                      }
                      wx.showModal({
                        title: '提示',
                        content: res.data.OperationDesc,
                        success: function(res) {
                          if (res.confirm) {
                            console.log(ID)
                            wx.navigateTo({
                              url: '/pages/chongzhi/chongzhi?challengeLogID=' +ID,
                            })
                          } else if (res.cancel) {
                            wx.setStorageSync('recordflag', false)
                            console.log('用户点击取消')
                            wx.navigateTo({
                              url: '/pages/tiaozhanjilu/tiaozhanjilu',
                            })
                          }
                        }
                      })
                    }

                  })
                } else if (res.cancel) {
                  wx.setStorageSync('recordflag', false)
                  wx.navigateTo({
                    url: '/pages/tiaozhanjilu/tiaozhanjilu',
                  })
                  console.log('用户点击取消')
                }
              }
            })
          }

        }).catch(err => {
          
        })
      }
      // }
    }
    //  {
    else if (index == 3) {
      if (bushu < 6000 || bushu > 10000 || p_num < 3 || p_num > 66) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的步数或人数',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        var data2 = {
          openid: openId,
          startTime: startTime,
          endTime: endTime,
          challengeAmt: index,
          totalPeopleNum: p_num,
          stepNum: bushu
        }
        App.getData(getApp().globalData.url + "/Basics/CreateChallengeLog", 'POST', data2, '正在加载数据', header).then(res => {
          console.log(res)
          if (res.data.IsSuccess == false) {
            wx.showModal({
              title: '提示',
              content: res.data.OperationDesc,
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  console.log(33333)
                  console.log('用户点击确定')

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

          } else {
            var ID = res.data.SparefieldOne
            wx.showModal({
              title: '提示',
              content: "发布竞赛成功，是否参加此次比赛",
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  //  参加比赛
                  App.getData(getApp().globalData.url + "/Basics/CreateBasicsEnrollLog" + "?challengeLogID=" + ID, 'POST', data, '正在加载数据', header).then(res => {
                    console.log(res)
                    let content = res.data.OperationDesc
                    wx.showModal({
                      title: '提示',
                      content: res.data.OperationDesc,
                      success: function(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                          if (content == "报名成功") {
                            // wx.showModal({
                            //   title: '提示',
                            //   content: res.data.OperationDesc,
                            //   showCancel: false,
                            //   success: function(res) {
                            //     if (res.confirm) {
                            wx.setStorageSync('recordflag', true)
                            console.log('用户点击取消')
                            wx.navigateTo({
                              url: '/pages/tiaozhanjilu/tiaozhanjilu',
                            })
                            //     }
                            //   }
                            // })
                          } else if (content == "报名失败，欲报名竞赛时段和已报名竞赛时段冲突！") {
                            wx.setStorageSync('recordflag', true)
                            console.log('用户点击取消')
                            wx.navigateTo({
                              url: '/pages/tiaozhanjilu/tiaozhanjilu',
                            })
                            return
                          } else {
                            console.log(ID)
                            wx.navigateTo({
                              url: '/pages/chongzhi/chongzhi? challengeLogID=' + ID,
                            })
                          }

                        } else if (res.cancel) {
                          wx.setStorageSync('recordflag', false)
                          console.log('用户点击取消')
                          wx.navigateTo({
                            url: '/pages/tiaozhanjilu/tiaozhanjilu',
                          })
                        }
                      }
                    })


                  })
                } else if (res.cancel) {
                  wx.setStorageSync('recordflag', false)
                  wx.navigateTo({
                    url: '/pages/tiaozhanjilu/tiaozhanjilu',
                  })
                  console.log('用户点击取消')
                }
              }
            })
          }

        })
      }
    }

    // }

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

  },
  bindPickerChange: function(e) {
    this.setData({
      money: true,
      xuanze: false
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // if (e.detail.value == 0) {
    //   this.setData({
    //     num: "请输入3到200人",
    //     bushu: "五千到一万步"
    //   })
    // } 
    if (e.detail.value == 0) {
      this.setData({
        num: "请输入3到66人",
        bushu: "6000到10000步",
        money: true,
        xuanze: false
      })
    }
    if (e.detail.value == 1) {
      this.setData({
        num: "请输入3到40人",
        bushu: "10000到50000步",
        money: true,
        xuanze: false
      })
    }
    this.setData({
      index: e.detail.value
    })
  },
  // dianji:function(){
  //   this.setData({
  //     shengming:false
  //   })
  // },
  shengmingsure: function() {
    this.setData({
      shengming: true,
      befor: true,
      after: false
    })
  }
})