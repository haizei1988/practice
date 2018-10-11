// pages/over/over.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SNickname: '于果',
    SHeadimgurl:"",
    qianming: '热爱生活热爱运动，这是一种态度。',
    overTitle: '',
    ID:"",
    StartTime:"",
    EndTime:"",
    StepNum:"",
    DisplayChallengeTime:"",
    DisplayRewardHotCardNum:"",
    ChallengeAmt:"",
    TotalChallengeAmt:"",
    TotalPeopleNum:"",
    RankingNum:"",
    first:"",
    second:"",
    third:"",
    neirong:"111",
    touxiang: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openId = wx.getStorageSync('openId');
    var that = this
    that.setData({
      ID: options.ID,
    })
    console.log(that.data.ID)
    wx.setNavigationBarTitle({
      title: '挑战详情'
    })
    //获取用户信息
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
        that.setData({
          qianming: res.data.Json.Result.Autograph,
          SHeadimgurl: res.data.Json.Result.SHeadimgurl,
          SNickname: res.data.Json.Result.SNickname
        })
      }
    })

    //获取比赛信息
    wx.request({
      url: getApp().globalData.url + "/Basics/GetEnrollLogById",
      method: "GET",
      data:{
        enrollId:that.data.ID,
        openid: openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        if (res.data.Json.Result.ChallengeAmt == 1 || res.data.Json.Result.ChallengeAmt== 6) {
          that.setData({
            StartTime: res.data.Json.Result.DisplayStartTime,
            EndTime: res.data.Json.Result.DisplayEndTime,
            StepNum: res.data.Json.Result.StepNum,
            DisplayChallengeTime: res.data.Json.Result.DisplayChallengeTime,
            ChallengeAmt: res.data.Json.Result.DisplayChallengeAmt,
            TotalChallengeAmt: res.data.Json.Result.TotalChallengeAmt,
            TotalPeopleNum: res.data.Json.Result.TotalPeopleNum,
            RankingNum: res.data.Json.Result.RankingNum,
            DisplayRewardHotCardNum: res.data.Json.Result.DisplayRewardHotCardNum,
            neirong: "您获得" + res.data.Json.Result.DisplayPersonalBonus +"，再接再厉"
          })
        } else {
          var arr = []
          var arr1 = []
          for (var i = 0; i < res.data.Json.Result.BasicsWinUsers.length; i++) {
            arr1 = arr.push(res.data.Json.Result.BasicsWinUsers[i].SHeadimgurl)
            console.log(res.data.Json.Result.BasicsWinUsers[i].SHeadimgurl)
          }
          console.log(arr)
          if (res.data.Json.Result.RankingNum <= 3 && res.data.Json.Result.RankingNum>=1){
            that.setData({
              StartTime: res.data.Json.Result.DisplayStartTime,
              EndTime: res.data.Json.Result.DisplayEndTime,
              StepNum: res.data.Json.Result.StepNum,
              DisplayChallengeTime: res.data.Json.Result.DisplayChallengeTime,
              ChallengeAmt: res.data.Json.Result.DisplayChallengeAmt,
              TotalChallengeAmt: res.data.Json.Result.TotalChallengeAmt,
              TotalPeopleNum: res.data.Json.Result.TotalPeopleNum,
              RankingNum: res.data.Json.Result.RankingNum,
              DisplayRewardHotCardNum: res.data.Json.Result.DisplayRewardHotCardNum,
              touxiang:arr,
              // first: res.data.Json.Result.BasicsWinUsers[0].SHeadimgurl,
              // second: res.data.Json.Result.BasicsWinUsers[1].SHeadimgurl,
              // third: res.data.Json.Result.BasicsWinUsers[2].SHeadimgurl,
              neirong: "恭喜您，您在本次比赛中排名" + res.data.Json.Result.RankingNum + "位,获得" + res.data.Json.Result.PersonalBonus+"热卡币"
            })
          }else{
            that.setData({
              StartTime: res.data.Json.Result.DisplayStartTime,
              EndTime: res.data.Json.Result.DisplayEndTime,
              StepNum: res.data.Json.Result.StepNum,
              DisplayChallengeTime: res.data.Json.Result.DisplayChallengeTime,
              ChallengeAmt: res.data.Json.Result.DisplayChallengeAmt,
              TotalChallengeAmt: res.data.Json.Result.TotalChallengeAmt,
              TotalPeopleNum: res.data.Json.Result.TotalPeopleNum,
              RankingNum: res.data.Json.Result.RankingNum,
              touxiang: arr1,
              DisplayRewardHotCardNum: res.data.Json.Result.DisplayRewardHotCardNum,
              // first: res.data.Json.Result.BasicsWinUsers[0].SHeadimgurl,
              // second: res.data.Json.Result.BasicsWinUsers[1].SHeadimgurl,
              // third: res.data.Json.Result.BasicsWinUsers[2].SHeadimgurl,
              neirong: "很遗憾您未能获得奖励，再接再厉。"
            })
          }

        }
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