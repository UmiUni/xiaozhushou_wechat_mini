//index.js
//获取应用实例
var app = getApp()
var citySelect = require('../citySelect/citySelect.js')

Page({

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用citySelect
    
    citySelect.init(that)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '北美加群小助手jogchat.com',
      path: '/pages/city/city',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
/*
  getCurLocation: function () {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude);
        console.log(longitude);
        //var speed = res.speed
        //var accuracy = res.accuracy
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          //logs: res.data.result
          latitude: latitude,
          longitude: longitude
        })
        
      },
      complete:function(){
        console.log(that.data.latitude);
        console.log(that.data.longitude);
        that.getroom();
      }
    })
    //this.getroom();
  }*/


})
