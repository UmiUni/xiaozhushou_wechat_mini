Page({
  onLoad: function () {
    wx.requestPayment(
      {
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { },
        'fail': function (res) { },
        'complete': function (res) { }
      })
  }
})