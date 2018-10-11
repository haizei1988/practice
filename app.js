//app.js
import wux from 'components/wux'
var network = require("./components/network.js")
App({
  getOpenId: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: getApp().globalData.url + "/Basics/OnLogin",
              data: {
                code: res.code
              },
              dataType: 'json',
              success: function (rs) {
                wx.setStorageSync('openId', rs.data.SparefieldOne);
                wx.setStorageSync('sessionkey', rs.data.SparefieldTwo);
                resolve();
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    })
  },
  getData: function(url, types, data, msg, header) {
    return new Promise((resolve, reject) => {
      network.requestLoading(url, types, data, msg, header, function(res)       {
        //res就是我们请求接口返回的数据
        resolve(res)
      }, function() {
        // wx.showToast({
        //   title: '加载数据失败',
        //   icon:"none"
        // })
        reject()
      })
    })

  },
  
  globalData: {
    // url: 'http://k2uxun.natappfree.cc', //接口地址
    url: 'https://www.ttljs.vip', //接口地址
    openid:'',
    setInterval: false,
    appid:'wx97f7a465705664bd'
  },
  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');
    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');
    return returnText;
  },
  wux: (scope) => new wux(scope)
})