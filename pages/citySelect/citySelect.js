var cityData = require('./cityData')

var app = getApp()

//数据
const city={
  provinceState:{
    data: null,
    selectedId: null,
    index: 0
  },
  cityState:{
    data: null,
    selectedId: null,
    index: 0
  },
  areaState:{
    data: null,
    selectedId: null,
    index: 0,
    latitude: null,
    longitude: null
  }
};

const citySelect = {
  init: function( that ){

    var _this = this;
    city.provinceState.data = cityData.province
    //设置默认省市区
    city.provinceState.selectedId = 53000; //San Francisco  省
    city.cityState.selectedId = 53700;     //San Mateo  市
    city.areaState.selectedId = 53701;     //San Francisco  区
    city.areaState.latitude = "+43.069560";
    city.areaState.longitude = "-89.423861";
    that.setData({
      'city': city
    })
    app.globalData.city = that.data.city;

    //过滤对应的数据
    _this.filterCity( that )
    _this.filterArea( that )

    let bindProvinceChange = function( e ){
      var pIndex = e.detail.value
      var pSelectedId = that.data.city.provinceState.data[pIndex].code
      console.log( pIndex )
      console.log( pSelectedId )
      that.setData({
        'city.provinceState.index':e.detail.value,
        'city.provinceState.selectedId': pSelectedId,
        'city.cityState.index': 0,
        'city.areaState.index': 0
      })
      _this.filterCity( that )
      _this.filterArea( that )
      //global city update
      // app.setCity(this.city);
      app.globalData.city = that.data.city;
    }

    let bindCityChange = function(e){
      var pIndex = e.detail.value
      var pSelectedId = that.data.city.cityState.data[pIndex].code
      console.log( pIndex )
      console.log( pSelectedId )
      that.setData({
        'city.cityState.index':e.detail.value,
        'city.cityState.selectedId': pSelectedId,
        'city.areaState.index': 0
      })
      _this.filterArea( that )
      //global city update
      // app.setCity(this.city);
      app.globalData.city = that.data.city;
    }

    let bindAreaChange = function(e){
      var pIndex = e.detail.value
      var pSelectedId = that.data.city.areaState.data[pIndex].code
      console.log( pIndex )
      console.log( pSelectedId )
      that.setData({
        'city.areaState.index':e.detail.value,
        'city.areaState.selectedId': pSelectedId,
        'city.areaState.latitude': that.data.city.areaState.data[pIndex].latitude,
        'city.areaState.longitude': that.data.city.areaState.data[pIndex].longitude
      })
      that.getroom(that.data.city.areaState.data[pIndex].latitude, that.data.city.areaState.data[pIndex].longitude);
      //global city update
      // app.setCity(this.city);
      app.globalData.city = that.data.city;
    }
    //初始化 change 事件
    that['bindProvinceChange'] = bindProvinceChange;
    that['bindCityChange'] = bindCityChange;
    that['bindAreaChange'] = bindAreaChange;
  },

  filterCity: function( that ){

    console.log('过滤市数据')
    var _this = this;
    var _city = that.data.city
    console.log(_city)

    // es6 过滤器
    console.log( cityData.city )
    console.log( _city.provinceState.selectedId )
    _city.cityState.data = cityData.city.filter( ( item, index ) => {
      return item.parentId === _city.provinceState.selectedId
    })
    console.log(_city.cityState.data)

    _city.cityState.selectedId = _city.cityState.data[0] && _city.cityState.data[0].code

    that.setData({
      'city': _city
    })
    //global city update
    // app.setCity(this.city);
    app.globalData.city = that.data.city;

  },
  filterArea: function(that){

    var _this = this;
    var _city = that.data.city
    console.log('过滤县级数据')

    // es6 过滤器
    _city.areaState.data = cityData.area.filter( ( item, index ) => {
      return item.parentId === _city.cityState.selectedId
    })
    _city.areaState.selectedId = _city.areaState.data[0] && _city.areaState.data[0].code

    that.setData({
      'city': _city
    })
    //global city update
    //app.setCity(this.city);
    app.globalData.city = that.data.city;
  },
 
}


module.exports =  citySelect
