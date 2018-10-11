// pages/pingtaijifen/pingtaijifen.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp() 
let canRoll = true, //加控制，防止用户点击两次
  num = 1, //用在动画上，让用户在第二次点击的时候可以接着上次转动的角度继续转
  lotteryArrLen = 0; //放奖品的数组的长度
   //放奖品
Page({
  data: {
    jiangpin:"",
    Remark:"",
    DisplayPrizeType:"",
    jieguo:true,
    shiwuyoujiang: true,
    youxiguize:"",
    TotalIntegralNum:"",
    lottery :[],
    SerialNum:0,
    phone:"",
    ID:"",
    status:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this
    var openId = wx.getStorageSync('openId');
    wx.setNavigationBarTitle({
      title: "积分抽奖",
      success: function (res) {
        // success
      }
    });
    //获取转盘信息
    var data = {
      openid: openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/GetBasicsPrizeDrawList", 'GET', data, '', header).then(res => {
      that.setData({
        lottery: res.data.Json.Result
      })
    })

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
        // console.log(res)
        that.setData({
          TotalIntegralNum: res.data.Json.Result.TotalIntegralNum
        })
      }
    })
   //抽奖规则
    wx.request({
      url: getApp().globalData.url + "/Basics/GetBasicsExplainDTOByType",
      method: "GET",
      data: {
        typeNum: 300,
        openid: openId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        var markdown = res.data.Json.Result.ExplainContent
        WxParse.wxParse('markdown', 'md', markdown, that, 5);  
      }
    })
    // 转盘
    this.setPlateData(); //执行设置转盘表面的文字
    // let that = this;
    if (this.data.status==false){
      let aniData = wx.createAnimation({ //创建动画对象
        duration: 2000,
        timingFunction: 'ease'
      });
      this.aniData = aniData; //将动画对象赋值给this的aniData属性
    }
  
  },
  // 转盘
  setPlateData() { //设置奖品数组]
  },
  //获取随机数
  aniDat: function () {
    console.log("fiuofh")
    let that = this;
    that.setData({
      status: true
    })
    let rightNum = that.data.SerialNum
    let lottery = that.data.lottery
    let DisplayPrizeType = that.data.DisplayPrizeType
    console.log(DisplayPrizeType)
    canRoll = false;
    let aniData = this.aniData; //获取this对象上的动画对象
    // let rightNum = ~~(Math.random() * lotteryArrLen); //生成随机数
    console.log(`随机数是${rightNum}`);
    console.log(lottery[rightNum])
    // console.log(`奖品是：${lottery[rightNum]}`);
    aniData.rotate(3600 * num - 360 / lotteryArrLen * rightNum).step(); //设置转动的圈数
    that.setData({
      aniData: aniData.export(),
      jiangpin: lottery[rightNum].ItemName,
      
    })
    num++;
    canRoll = true;
    console.log(that.data.jiangpin)
    // setTimeout(jiegu(),1000)

    if (DisplayPrizeType == "实物") {
      setTimeout((
        () => {
          that.setData({
            jieguo: true,
            shiwuyoujiang: false
          })
        }
      ), 2500)
    } else {
      setTimeout((
        () => {
          that.setData({
            jieguo: false,
            shiwuyoujiang: true
          })
        }
      ), 2500)
    }
  },
  kaishizhuan(){
    if (this.data.status == false){
      console.log(11111)
      this.startRollTap()
    }else{
      console.log(this.data.status)
      console.log(2222)
      wx.showToast({
        title: '操作频率过快，请等候',
        icon:"none"
      })
      // setTimeout((
      //   () => {
      //     this.setData({
      //       status: false
      //     })
      //   }
      // ), 500)
    }  
  },
  startRollTap() { //开始转盘
    this.setData({
      status:true
    })
    setTimeout((
        () => {
          this.setData({
            status: false
          })
        }
      ), 2000)
    console.log(this.data.status)
    var lottery = this.data.lottery
    console.log(lottery)
    lotteryArrLen = lottery.length;
    let that = this;
    if (canRoll) {
      //开始抽奖
      var openId = wx.getStorageSync('openId')
      var data={
        openid: openId
      }
      var header={
        'Content-Type': 'application/json',
      }
      app.getData(getApp().globalData.url + "/Basics/StartCreatePrizeWin", 'GET', data,
        '', header).then(res => {
          // this.setData({
          //   status: false
          // })
          console.log(res)
          if (res.data.Json.OperationDesc=="积分不足"){
            wx.showModal({
              title: '提示',
              content: '积分不足,可通过免费挑战获得积分',
            })
            //  this.setData({
            //   status: false
            // })
          }else{
            // this.setData({
            //   status: false
            // })
            if (res.data.Json.Result.ItemName !== "谢谢参与") {
              that.setData({
                SerialNum: res.data.Json.Result.SerialNum,
                DisplayPrizeType: res.data.Json.Result.DisplayPrizeType,
                Remark: res.data.Json.Result.Remark,
                ID: res.data.Json.Result.ID
              })
              console.log(that.data.status)
            } else {
              that.setData({
                SerialNum: res.data.Json.Result.SerialNum,
                DisplayPrizeType: res.data.Json.Result.DisplayPrizeType,
                Remark: "下次再来吧",
                ID: res.data.Json.Result.ID
              })
              console.log(that.data.status)
            }
            that.aniDat()
          }      
        })

    }
  },
 
  queding() { 
    let that = this;
    var openId = wx.getStorageSync('openId');
    that.setData({
      jieguo:true,
      shiwuyoujiang: true
    })
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
          TotalIntegralNum: res.data.Json.Result.TotalIntegralNum
        })
      }
    })
  },
  inputChange1: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
    console.log(that.data.phone)
  },
  shiwuqueding() {
    let that = this;
    if (that.data.phone == undefined) {
      wx.showToast({
        title: "请输入电话号码",
        icon: "none"
      })
      return
    }
    if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(that.data.phone))) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        showCancel: false,
        success: function (res) {
      
        }
      })
      return
    }
    var openId = wx.getStorageSync('openId');
    that.setData({
      jieguo: true,
      shiwuyoujiang: true
    })
    console.log(that.data.phone)   
    //传信息
    var data = {
      openid: openId
    }
    var header = {
      'Content-Type': 'application/json',
    }
    app.getData(getApp().globalData.url + "/Basics/UpdatePrizeWinPhoneById" + "?userPhone=" + that.data.phone + "&winId=" + that.data.ID, 'POST', data,
      '正在加载数据', header).then(res => {
        console.log(res)
          wx.showModal({
            title: '提示',
            content: res.data.OperationDesc,
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })  
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
        console.log(res)
        that.setData({
          TotalIntegralNum: res.data.Json.Result.TotalIntegralNum
        })
      }
    })
  }
})