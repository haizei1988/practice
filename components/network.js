function request(url, params, success, fail) {
  this.requestLoading(url, types, params, message, header, success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, types, params, message, header, success, fail) {
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    data: params,
    header,
    method: types,
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res)
      } else {
        if (res.statusCode === 401) {
          // wx.navigateTo({
          //   url: '../login/login',
          // })
          return
        }
        if (res.statusCode === 403) {
          return
        }
        if (typeof res.data.message === 'object') {
          wx.showToast({
            title: Object.values(res.data.message)[0][0],
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
        fail(res);
      }

    },
    complete: function (res) {

    },
  })
}
module.exports = {
  request: request,
  requestLoading: requestLoading
}
