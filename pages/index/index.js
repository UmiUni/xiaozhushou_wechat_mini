//index.js
//获取应用实例
var app = getApp()
var citySelect = require('../citySelect/citySelect.js')

Page({
  // data: {
  //   motto: 'Hello World',
  //   userInfo: {}
  // },
  // data: {
  //   logs: []
  // },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },

  data:{
    rooms:{},
    photoids:[],
    moveInOutDates:[],
    addresses:[],
    randoms:[],
    latitude: 37.7749295,
    longitude: -122.41941550000001
  },

  /*滑动到顶部触发*/
  scrollYToUpper: function () {
    console.log('scrollYToUpper')
  },
  /*滑动到左边触发 */
  scrollYToLower: function () {
    console.log('scrollYToLower')
  },
  /*滑动触发 */
  scroll: function () {
    console.log("scroll")
  },
  getroom: function (lat,lng) {//定
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://www.letsublease.com/search?',//请求地址
      data: {//发送给后台的数据
        //address: "San Francisco, CA, United States",
        // lat: 37.7749295,
        // lng: -122.41941550000001,
        //lat: that.data.latitude,
        //lng: that.data.longitude,
        lat:lat,
        lng:lng,
        moveindate: "2017/07/21",
        moveoutdate: "2017/07/31",
        type: "room"
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          //logs: res.data.result
          rooms: res.data
        })
      },
      fail: function (err) { },//请求失败
      complete: function () {
        let i, photoids = [], moveInOutDates = [], addresses = [], randoms = [];
        if (that.data.rooms.content==undefined)return;
        for (i = 0; i < that.data.rooms.content.length; i++) {
          photoids.push(that.data.rooms.content[i].photo.photoid);
          let room = that.data.rooms.content[i].room;
          moveInOutDates.push([room.moveindate.substring(0, 10), room.moveoutdate.substring(0, 10)]);
          let address = that.data.rooms.content[i].address;
          addresses.push(address.streetno + " " +
            address.streetname + ", " +
            address.city + ", " +
            address.state + ", " +
            address.country + ", " +
            address.postcode
          )
          randoms.push(Math.floor((Math.random() * 10) + 10));
        };
        that.setData({
          photoids: photoids,
          moveInOutDates: moveInOutDates,
          addresses: addresses,
          randoms: randoms
        })
      }//请求完成后执行的函数
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用citySelect
    
    citySelect.init(that)
    this.getroom(this.data.city.areaState.latitude, this.data.city.areaState.longitude);
    //console.log(city.areaState.latitude)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'letsublease.com',
      path: '/pages/index/index',
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
