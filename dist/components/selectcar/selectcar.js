'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../brand/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../carlist/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global fetch */
var SelectCar = function (_Component) {
  _inherits(SelectCar, _Component);

  function SelectCar(props) {
    _classCallCheck(this, SelectCar);

    /* eslint-disable react/no-unused-state */
    var _this = _possibleConstructorReturn(this, (SelectCar.__proto__ || Object.getPrototypeOf(SelectCar)).call(this, props));

    _this.state = {
      carBrandShow: true, // 是否显示车辆品牌
      carTypeShow: false, // 是否显示车辆型号
      carColorShow: undefined, // 是否显示颜色
      selectBrand: null, // 已选择的车辆品牌
      selectCarType: null, // 已选择的车辆型号
      selectColor: null // 已选择的车辆颜色
    };
    /* esline-enable react/no-unused-state */
    _this.brandClick = _this.brandClick.bind(_this);
    _this.carTypeClick = _this.carTypeClick.bind(_this);
    _this.carColorClick = _this.carColorClick.bind(_this);
    _this.brandTouchmove = _this.brandTouchmove.bind(_this);
    _this.carTypeTouchmove = _this.carTypeTouchmove.bind(_this);
    return _this;
  }

  _createClass(SelectCar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        carBrandShow: props.show
      });
    }
  }, {
    key: 'brandClick',
    value: function brandClick(obj) {
      var self = this;
      var carColorShow = this.state.carColorShow;
      var _props = this.props,
          brandClick = _props.brandClick,
          brandDataURL = _props.brandDataURL;


      fetch(brandDataURL + 'seriesprice-pm1-b' + obj.id + '-t16-v8.2.0.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        var list = data.result.fctlist;
        var otherlist = data.result.otherfctlist;
        var arr = [];
        list.forEach(function (ele) {
          arr = arr.concat(ele.serieslist);
        });
        // 其他车型 （海外、停售）
        otherlist.forEach(function (ele) {
          arr = arr.concat(ele.serieslist);
        });
        self.setState({
          carTypeShow: true,
          carColorShow: carColorShow ? false : undefined,
          selectBrand: obj,
          carTypeArr: arr
        });
      });
      brandClick && brandClick(obj);
    }
  }, {
    key: 'carTypeClick',
    value: function carTypeClick(obj) {
      var selectBrand = this.state.selectBrand;
      var carTypeClick = this.props.carTypeClick;

      this.setState({
        carColorShow: true,
        selectCarType: obj
      });
      carTypeClick && carTypeClick([selectBrand, obj]);
    }
  }, {
    key: 'carColorClick',
    value: function carColorClick(obj) {
      var _state = this.state,
          selectBrand = _state.selectBrand,
          selectCarType = _state.selectCarType;
      var carColorClick = this.props.carColorClick;

      this.setState({
        carBrandShow: false,
        carTypeShow: false,
        carColorShow: false,
        selectColor: obj
      });

      carColorClick && carColorClick([selectBrand, selectCarType, obj]);
    }
  }, {
    key: 'brandTouchmove',
    value: function brandTouchmove() {
      var carColorShow = this.state.carColorShow;

      this.setState({
        carTypeShow: false,
        carColorShow: carColorShow ? false : undefined
      });
    }
  }, {
    key: 'carTypeTouchmove',
    value: function carTypeTouchmove() {
      this.setState({
        carColorShow: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          carTypeShow = _state2.carTypeShow,
          carColorShow = _state2.carColorShow,
          carTypeArr = _state2.carTypeArr,
          carBrandShow = _state2.carBrandShow;
      var _props2 = this.props,
          show = _props2.show,
          brandArr = _props2.brandArr,
          showWrap = _props2.showWrap,
          colorArr = _props2.colorArr,
          hotCarBrand = _props2.hotCarBrand,
          carBrandDataAttrName = _props2.carBrandDataAttrName,
          carTypeDataAttrName = _props2.carTypeDataAttrName,
          carColorDataAttrName = _props2.carColorDataAttrName;

      if (!show) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_index2.default, {
          staticImgURL: this.props.staticImgURL,
          carArr: brandArr,
          show: carBrandShow,
          hotCarBrandData: hotCarBrand,
          onTouchMove: carTypeShow && !showWrap ? this.brandTouchmove : null,
          dataAttrName: carBrandDataAttrName,
          callBack: this.brandClick
        }),
        _react2.default.createElement(_index4.default, {
          show: carTypeShow,
          listData: carTypeArr,
          showWrap: showWrap,
          onTouchMove: carColorShow && !showWrap ? this.carTypeTouchmove : null,
          dataAttrName: carTypeDataAttrName,
          width: '70',
          onClick: this.carTypeClick
        }),
        _react2.default.createElement(_index4.default, {
          width: '30',
          show: carColorShow,
          showWrap: showWrap,
          colorData: colorArr,
          dataAttrName: carColorDataAttrName,
          onClick: this.carColorClick
        })
      );
    }
  }]);

  return SelectCar;
}(_react.Component);

SelectCar.defaultProps = {
  brandDataURL: '//es-static.xiaojukeji.com/static/web/activity/jimu-mobile/cartypedata/json/',
  staticImgURL: '//es-static.xiaojukeji.com/static/web/activity/jimu-mobile/cartypedata/brands/',
  carBrandDataAttrName: {
    id: 'id',
    name: 'name',
    firstChar: 'firstChar'
  },
  carTypeDataAttrName: {
    id: 'id',
    name: 'name'
  },
  carColorDataAttrName: {
    id: 'id',
    name: 'name'
  },
  hotCarBrand: [{
    id: 1,
    name: '大众',
    sort: 1
  }, {
    id: 12,
    name: '现代',
    sort: 16
  }, {
    id: 3,
    name: '丰田',
    sort: 3
  }, {
    id: 8,
    name: '福特',
    sort: 8
  }, {
    id: 38,
    name: '别克',
    sort: 4
  }, {
    id: 14,
    name: '本田',
    sort: 2
  }, {
    id: 33,
    name: '奥迪',
    sort: 5
  }, {
    id: 63,
    name: '日产',
    sort: 7
  }],
  showWrap: false,
  colorArr: [{
    name: '白色',
    id: 1,
    color: '#fff'
  }, {
    name: '红色',
    id: 1,
    color: '#ff7878'
  }, {
    name: '黑色',
    id: 1,
    color: '#7c7c7c'
  }, {
    name: '银色',
    id: 1,
    color: '#ccc'
  }, {
    name: '金色',
    id: 1,
    color: '#fed02e'
  }, {
    name: '灰色',
    id: 1,
    color: '#C3C3C5'
  }, {
    name: '蓝色',
    id: 1,
    color: '#507cb7'
  }, {
    name: '黄色',
    color: '#feee34'
  }, {
    name: '绿色',
    color: '#60a470'
  }, {
    name: '其它',
    color: '#f7f7f7'
  }],
  brandArr: {
    A: [{
      id: 33,
      name: '奥迪',
      sort: 5
    }, {
      id: 34,
      name: '阿尔法·罗密欧',
      sort: 45
    }, {
      id: 35,
      name: '阿斯顿·马丁',
      sort: 77
    }, {
      id: 276,
      name: 'ALPINA',
      sort: 106
    }, {
      id: 117,
      name: 'AC Schnitzer',
      sort: 114
    }, {
      id: 221,
      name: '安凯客车',
      sort: 130
    }],
    B: [{
      id: 14,
      name: '本田',
      sort: 2
    }, {
      id: 38,
      name: '别克',
      sort: 4
    }, {
      id: 36,
      name: '奔驰',
      sort: 10
    }, {
      id: 15,
      name: '宝马',
      sort: 11
    }, {
      id: 120,
      name: '宝骏',
      sort: 12
    }, {
      id: 13,
      name: '标致',
      sort: 19
    }, {
      id: 40,
      name: '保时捷',
      sort: 27
    }, {
      id: 75,
      name: '比亚迪',
      sort: 29
    }, {
      id: 95,
      name: '奔腾',
      sort: 44
    }, {
      id: 203,
      name: '北汽幻速',
      sort: 53
    }, {
      id: 27,
      name: '北京',
      sort: 55
    }, {
      id: 231,
      name: '宝沃',
      sort: 59
    }, {
      id: 173,
      name: '北汽绅宝',
      sort: 65
    }, {
      id: 271,
      name: '比速汽车',
      sort: 66
    }, {
      id: 39,
      name: '宾利',
      sort: 72
    }, {
      id: 154,
      name: '北汽制造',
      sort: 81
    }, {
      id: 208,
      name: '北汽新能源',
      sort: 84
    }, {
      id: 143,
      name: '北汽威旺',
      sort: 88
    }, {
      id: 140,
      name: '巴博斯',
      sort: 97
    }, {
      id: 37,
      name: '布加迪',
      sort: 104
    }],
    C: [{
      id: 76,
      name: '长安',
      sort: 13
    }, {
      id: 163,
      name: '长安欧尚',
      sort: 32
    }, {
      id: 77,
      name: '长城',
      sort: 62
    }, {
      id: 294,
      name: '长安轻型车',
      sort: 91
    }, {
      id: 79,
      name: '昌河',
      sort: 95
    }, {
      id: 196,
      name: '成功汽车',
      sort: 153
    }],
    D: [{
      id: 1,
      name: '大众',
      sort: 1
    }, {
      id: 81,
      name: '东南',
      sort: 30
    }, {
      id: 259,
      name: '东风风光',
      sort: 46
    }, {
      id: 165,
      name: '东风风行',
      sort: 51
    }, {
      id: 113,
      name: '东风风神',
      sort: 57
    }, {
      id: 169,
      name: 'DS',
      sort: 63
    }, {
      id: 41,
      name: '道奇',
      sort: 79
    }, {
      id: 142,
      name: '东风小康',
      sort: 100
    }, {
      id: 187,
      name: '东风风度',
      sort: 102
    }, {
      id: 32,
      name: '东风',
      sort: 103
    }],
    F: [{
      id: 3,
      name: '丰田',
      sort: 3
    }, {
      id: 8,
      name: '福特',
      sort: 8
    }, {
      id: 42,
      name: '法拉利',
      sort: 67
    }, {
      id: 11,
      name: '菲亚特',
      sort: 82
    }, {
      id: 282,
      name: '福田乘用车',
      sort: 96
    }, {
      id: 141,
      name: '福迪',
      sort: 99
    }, {
      id: 96,
      name: '福田',
      sort: 105
    }, {
      id: 197,
      name: '福汽启腾',
      sort: 152
    }],
    G: [{
      id: 82,
      name: '广汽传祺',
      sort: 21
    }, {
      id: 152,
      name: '观致',
      sort: 70
    }, {
      id: 112,
      name: 'GMC',
      sort: 111
    }, {
      id: 108,
      name: '广汽吉奥',
      sort: 116
    }, {
      id: 116,
      name: '光冈',
      sort: 133
    }],
    H: [{
      id: 181,
      name: '哈弗',
      sort: 9
    }, {
      id: 86,
      name: '海马',
      sort: 49
    }, {
      id: 267,
      name: '汉腾汽车',
      sort: 68
    }, {
      id: 91,
      name: '红旗',
      sort: 85
    }, {
      id: 87,
      name: '华泰',
      sort: 107
    }, {
      id: 97,
      name: '黄海',
      sort: 109
    }, {
      id: 43,
      name: '悍马',
      sort: 119
    }, {
      id: 260,
      name: '华泰新能源',
      sort: 144
    }, {
      id: 220,
      name: '华颂',
      sort: 145
    }, {
      id: 24,
      name: '哈飞',
      sort: 150
    }, {
      id: 150,
      name: '海格',
      sort: 158
    }, {
      id: 85,
      name: '华普',
      sort: 170
    }, {
      id: 164,
      name: '恒天',
      sort: 171
    }, {
      id: 237,
      name: '华利',
      sort: 177
    }, {
      id: 245,
      name: '华凯',
      sort: 178
    }],
    J: [{
      id: 25,
      name: '吉利汽车',
      sort: 6
    }, {
      id: 46,
      name: 'Jeep',
      sort: 20
    }, {
      id: 84,
      name: '江淮',
      sort: 31
    }, {
      id: 44,
      name: '捷豹',
      sort: 37
    }, {
      id: 83,
      name: '金杯',
      sort: 76
    }, {
      id: 119,
      name: '江铃',
      sort: 93
    }, {
      id: 151,
      name: '九龙',
      sort: 121
    }, {
      id: 210,
      name: '江铃集团轻汽',
      sort: 124
    }, {
      id: 145,
      name: '金龙',
      sort: 143
    }, {
      id: 270,
      name: '江铃集团新能源',
      sort: 149
    }, {
      id: 175,
      name: '金旅',
      sort: 156
    }],
    K: [{
      id: 47,
      name: '凯迪拉克',
      sort: 23
    }, {
      id: 101,
      name: '开瑞',
      sort: 90
    }, {
      id: 214,
      name: '凯翼',
      sort: 92
    }, {
      id: 9,
      name: '克莱斯勒',
      sort: 98
    }, {
      id: 100,
      name: '科尼赛克',
      sort: 122
    }, {
      id: 199,
      name: '卡威',
      sort: 126
    }, {
      id: 109,
      name: 'KTM',
      sort: 142
    }, {
      id: 219,
      name: '康迪全球鹰',
      sort: 147
    }, {
      id: 156,
      name: '卡尔森',
      sort: 154
    }, {
      id: 224,
      name: '卡升',
      sort: 159
    }],
    L: [{
      id: 49,
      name: '路虎',
      sort: 22
    }, {
      id: 52,
      name: '雷克萨斯',
      sort: 35
    }, {
      id: 51,
      name: '林肯',
      sort: 39
    }, {
      id: 53,
      name: '铃木',
      sort: 40
    }, {
      id: 78,
      name: '猎豹汽车',
      sort: 41
    }, {
      id: 10,
      name: '雷诺',
      sort: 48
    }, {
      id: 80,
      name: '力帆汽车',
      sort: 50
    }, {
      id: 88,
      name: '陆风',
      sort: 60
    }, {
      id: 48,
      name: '兰博基尼',
      sort: 74
    }, {
      id: 54,
      name: '劳斯莱斯',
      sort: 86
    }, {
      id: 50,
      name: '路特斯',
      sort: 112
    }, {
      id: 124,
      name: '理念',
      sort: 128
    }, {
      id: 89,
      name: '莲花汽车',
      sort: 136
    }, {
      id: 241,
      name: 'LOCAL MOTORS',
      sort: 137
    }, {
      id: 118,
      name: 'Lorinser',
      sort: 139
    }, {
      id: 204,
      name: '陆地方舟',
      sort: 160
    }],
    M: [{
      id: 58,
      name: '马自达',
      sort: 15
    }, {
      id: 20,
      name: '名爵',
      sort: 43
    }, {
      id: 57,
      name: '玛莎拉蒂',
      sort: 52
    }, {
      id: 56,
      name: 'MINI',
      sort: 64
    }, {
      id: 129,
      name: '迈凯伦',
      sort: 89
    }, {
      id: 55,
      name: '迈巴赫',
      sort: 115
    }, {
      id: 168,
      name: '摩根',
      sort: 127
    }],
    N: [{
      id: 130,
      name: '纳智捷',
      sort: 71
    }, {
      id: 213,
      name: '南京金龙',
      sort: 167
    }],
    O: [{
      id: 60,
      name: '讴歌',
      sort: 61
    }, {
      id: 59,
      name: '欧宝',
      sort: 123
    }, {
      id: 146,
      name: '欧朗',
      sort: 174
    }],
    P: [{
      id: 61,
      name: '帕加尼',
      sort: 101
    }],
    Q: [{
      id: 62,
      name: '起亚',
      sort: 24
    }, {
      id: 26,
      name: '奇瑞',
      sort: 25
    }, {
      id: 122,
      name: '启辰',
      sort: 42
    }, {
      id: 235,
      name: '前途',
      sort: 138
    }],
    R: [{
      id: 63,
      name: '日产',
      sort: 7
    }, {
      id: 19,
      name: '荣威',
      sort: 18
    }, {
      id: 174,
      name: '如虎',
      sort: 140
    }, {
      id: 103,
      name: '瑞麒',
      sort: 148
    }, {
      id: 296,
      name: '瑞驰新能源',
      sort: 155
    }],
    S: [{
      id: 67,
      name: '斯柯达',
      sort: 26
    }, {
      id: 68,
      name: '三菱',
      sort: 33
    }, {
      id: 65,
      name: '斯巴鲁',
      sort: 56
    }, {
      id: 155,
      name: '上汽大通',
      sort: 73
    }, {
      id: 269,
      name: 'SWM斯威汽车',
      sort: 78
    }, {
      id: 45,
      name: 'smart',
      sort: 87
    }, {
      id: 69,
      name: '双龙',
      sort: 108
    }, {
      id: 162,
      name: '思铭',
      sort: 120
    }, {
      id: 205,
      name: '赛麟',
      sort: 132
    }, {
      id: 238,
      name: '斯达泰克',
      sort: 134
    }, {
      id: 149,
      name: '陕汽通家',
      sort: 164
    }, {
      id: 66,
      name: '世爵',
      sort: 165
    }, {
      id: 90,
      name: '双环',
      sort: 169
    }],
    T: [{
      id: 133,
      name: '特斯拉',
      sort: 75
    }, {
      id: 161,
      name: '腾势',
      sort: 125
    }, {
      id: 202,
      name: '泰卡特',
      sort: 141
    }],
    W: [{
      id: 283,
      name: 'WEY',
      sort: 28
    }, {
      id: 70,
      name: '沃尔沃',
      sort: 34
    }, {
      id: 114,
      name: '五菱汽车',
      sort: 38
    }, {
      id: 167,
      name: '五十铃',
      sort: 83
    }, {
      id: 192,
      name: '潍柴英致',
      sort: 113
    }, {
      id: 284,
      name: '蔚来',
      sort: 129
    }, {
      id: 99,
      name: '威兹曼',
      sort: 151
    }, {
      id: 102,
      name: '威麟',
      sort: 166
    }],
    X: [{
      id: 71,
      name: '雪佛兰',
      sort: 14
    }, {
      id: 12,
      name: '现代',
      sort: 16
    }, {
      id: 72,
      name: '雪铁龙',
      sort: 36
    }, {
      id: 98,
      name: '西雅特',
      sort: 131
    }, {
      id: 185,
      name: '新凯',
      sort: 157
    }],
    Y: [{
      id: 73,
      name: '英菲尼迪',
      sort: 47
    }, {
      id: 263,
      name: '驭胜',
      sort: 54
    }, {
      id: 110,
      name: '一汽',
      sort: 58
    }, {
      id: 111,
      name: '野马汽车',
      sort: 80
    }, {
      id: 144,
      name: '依维柯',
      sort: 117
    }, {
      id: 93,
      name: '永源',
      sort: 173
    }, {
      id: 298,
      name: '宇通客车',
      sort: 10000
    }],
    Z: [{
      id: 94,
      name: '众泰',
      sort: 17
    }, {
      id: 22,
      name: '中华',
      sort: 69
    }, {
      id: 74,
      name: '中兴',
      sort: 94
    }, {
      id: 206,
      name: '知豆',
      sort: 110
    }, {
      id: 182,
      name: '之诺',
      sort: 135
    }]
  }
};

exports.default = SelectCar;