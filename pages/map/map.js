// map.js
//获取应用实例
var app = getApp()

Page({
  data: {
    city:{}
  },
  onLoad: function(option){
    this.setData({
      city : app.globalData.city
    });
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()
  },
  // getCenterLocation: function () {
  //   this.mapCtx.getCenterLocation({
  //     success: function (res) {
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //     }
  //   })
  // },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  // translateMarker: function () {
  //   var that = this;
  //   console.log('latitude:' + app.globalData.city.areaState.latitude);
  //   console.log('longitude:' + app.globalData.city.areaState.longitude);
  //   this.mapCtx.translateMarker({
  //     markerId: 0,
  //     autoRotate: true,
  //     duration: 1000,
  //     destination: {
  //       latitude: 23.10229,
  //       longitude: 113.3345211,
  //     },
  //     animationEnd() {
  //       //console.log('animation end:' + app.globalData.city)
  //     }
  //   })
  // },
  translateMarker: function () {
    console.log(app.globalData.city);
    // this.mapCtx.translateMarker({
    //   markerId: 0,
    //   autoRotate: true,
    //   duration: 1000,
    //   destination: {
    //     latitude: 23.10229,
    //     longitude: 113.3345211,
    //   },
    //   animationEnd() {
    //     console.log('animation end')
    //   }
    // })
  },
  // includePoints: function () {
  //   this.mapCtx.includePoints({
  //     padding: [10],
  //     points: [{
  //       latitude: 23.10229,
  //       longitude: 113.3345211,
  //     }, {
  //       latitude: 23.00229,
  //       longitude: 113.3345211,
  //     }]
  //   })
  // }
})